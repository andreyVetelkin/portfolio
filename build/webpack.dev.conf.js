const webpack = require('webpack')
const {
	merge
} = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf')


const devWebpackConfig = merge(baseWebpackConfig, {
	// DEV config
	mode: 'development',
	
	devServer: {
		watchFiles: ['src/'],
		static: {
			directory: baseWebpackConfig.externals.paths.dist,
			watch: true,
		},
		
		open: true,
		port: 'auto',
		client: {
			progress: true,
			overlay: {
				errors: true,
				warnings: false,
			},
		},
	},
	plugins: [
		
		new webpack.SourceMapDevToolPlugin({
			filename: '[file].map'
		})
	]
})

module.exports = new Promise((resolve, reject) => {
	resolve(devWebpackConfig)
})