var path = require('path')
const {
	merge
} = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf')
const WebpackShellPluginNext = require('webpack-shell-plugin-next');
const BeautifyHtmlWebpackPlugin = require('beautify-html-webpack-plugin');
var FtpDeploy = require("ftp-deploy");

const remoteLocation = '/www/front.nopreset.net/' + __dirname.split('/').reverse()[1] + '/';
var siteUrl = 'front.nopreset.net/' + __dirname.split('/').reverse()[1] + '/'


var ftpDeploy = new FtpDeploy();
var ftpConfig = {
	host: "front.nopreset.net",
	
	user: "front.nopreset.net",
	
	password: "J8a1I4i3",
	
	port: 21,
	localRoot: process.cwd() + '/dist',
	remoteRoot: remoteLocation,
	// include: ["*", "**/*"],      // this would upload everything except dot files
	include: ["*.php", "*", ".*"],
	// e.g. exclude sourcemaps, and ALL files in node_modules (including dot files)
	exclude: ["dist/**/*.map", "node_modules/**", "node_modules/**/.*", ".git/**"],
	// delete ALL existing files at destination before uploading, if true
	deleteRemote: true,
	// Passive mode is forced (EPSV command is not sent)
	forcePasv: true,
	// use sftp or ftp
	sftp: false,
	
	
};


const buildWebpackConfig = merge(baseWebpackConfig, {
	// BUILD config
	mode: 'production',
	output: {
		clean: true,
	},
	plugins: [
		new BeautifyHtmlWebpackPlugin(),
		new WebpackShellPluginNext({
			parallel: true,
			onBuildStart: {
				scripts: ['echo "Webpack Start"'],
				blocking: true,
				
			},
			onBuildEnd: {
				scripts: [() => {
					ftpDeploy
						.deploy(ftpConfig)
						.catch(err => console.log(err));
					console.log(siteUrl)
				},],
				blocking: false,
				
			}
		})
	],
	
})


module.exports = new Promise((resolve, reject) => {
	resolve(buildWebpackConfig)
	
})


ftpDeploy.on("uploading", function (data) {
	console.log(data.totalFilesCount); // total file count being transferred
	console.log(data.transferredFileCount); // number of files transferred
	console.log(data.filename); // partial path with filename being uploaded
});
// ftpDeploy.on("uploaded", function(data) {
//   console.log(data); // same data as uploading event
// });
// ftpDeploy.on("log", function(data) {
//   console.log(data); // same data as uploading event
// });
// ftpDeploy.on("upload-error", function(data) {
//   console.log(data.err); // data will also include filename, relativePath, and other goodies
// });