const path = require('path')
const fs = require('fs')
const webpack = require("webpack");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const magicImporter = require('node-sass-magic-importer');


const {
	VueLoaderPlugin
} = require('vue-loader')


// Main const
// see more: https://github.com/vedees/webpack-template/blob/master/README.md#main-const
const PATHS = {
	src: path.join(__dirname, '../src'),
	dist: path.join(__dirname, '../dist'),
	tpl: 'tpl/'
}

// Pages const for HtmlWebpackPlugin
// see more: https://github.com/vedees/webpack-template/blob/master/README.md#html-dir-folder
// const PAGES_DIR = PATHS.src
const PAGES_DIR = `${PATHS.src}/view/pages/`
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'))

module.exports = {
	
	// BASE config
	externals: {
		paths: PATHS
	},
	entry: {
		app: PATHS.src,

	},
	output: {
		filename: `${PATHS.tpl}js/[name].js?[contenthash]`,
		path: PATHS.dist,
		publicPath: '',
		
	},
	target: "web",
	optimization: {
		
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /node_modules/,
					chunks: "initial",
					name: "vendor",
					enforce: true,
				}
			}
		}
	},
	module: {
		rules: [{
			test: /\.pug$/,
			oneOf: [
				// this applies to pug imports inside JavaScript
				{
					exclude: /\.vue$/,
					use: ['raw-loader', 'pug-plain-loader']
				},
				// this applies to <template lang="pug"> in Vue components
				{
					use: ['pug-plain-loader'],
					
				}
			],
			
		}, {
			test: /\.js$/,
			exclude: /node_modules/,
			use: {
				loader: "babel-loader",
				options: {
					presets: [
						["@babel/preset-env", {
							modules: false
						}]
					]
				}
			}
		}, {
			test: /\.vue$/,
			loader: 'vue-loader',
			options: {
				loader: {
					scss: 'vue-style-loader!css-loader!sass-loader'
				}
			}
		}, {
			test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
			loader: 'file-loader',
			options: {
				name: '[name].[ext]'
			}
		}, {
			test: /\.(png|jpg|gif|svg)$/,
			loader: 'file-loader',
			options: {
				name: '[name].[ext]'
			}
		},
			{
				test: /\.scss$/,
				
				use: [
					'style-loader',
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							esModule: false,
						},
					},
					{
						loader: 'css-loader',
						options: {
							url: false
						}
					}, {
						loader: require.resolve('postcss-loader'),
					}, {
						loader: 'sass-loader',
						options: {
							sassOptions: {
								importer: magicImporter()
							}
						}
					}
				]
				
			}, {
				test: /\.css$/,
				use: [
					'style-loader',
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						
					}, {
						loader: 'postcss-loader',
					}
				]
			},]
	},
	resolve: {
		alias: {
			'~': PATHS.src,
			'vue$': 'vue/dist/vue.js',
		}
	},
	
	stats: {
		children: true
	},
	
	plugins: [
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			"window.jQuery": "jquery",
		}),
		new VueLoaderPlugin(),
		new MiniCssExtractPlugin({
			filename: `${PATHS.tpl}css/[name].css?[contenthash]`,
		}),
		new SVGSpritemapPlugin('src/assets/svg/*.svg', {
			output: {
				filename: '/tpl/sprites/sprite.svg',
				svg: {
					sizes: false,
				},
			},
			sprite: {
				prefix: false,
				generate: {
					title: false,
				}
			},
			
		}),
		
		new FaviconsWebpackPlugin({
			
			logo: `${PATHS.src}/favicons/favicon.png`,
			cache: true,
			outputPath: `${PATHS.tpl}favicons`,
			prefix: 'tpl/favicons/',
			inject: true,
			favicons: {
				appName: 'my-app',
				appDescription: 'My  App',
				developerURL: null,
				icons: {
					appleStartup: false,
					windows: false
				}
			}
			
		}),
		
		new CopyWebpackPlugin({
			
			patterns: [
				
				{
					from: `${PATHS.src}/assets/img`,
					to: `${PATHS.tpl}img`
				},
				{
					from: `${PATHS.src}/assets/fonts`,
					to: `${PATHS.tpl}fonts`
				},
				{
					from: `${PATHS.src}/static`,
					to: ''
				},
			]
		}),
		
		
		...PAGES.map(page => new HtmlWebpackPlugin({
			template: `${PAGES_DIR}/${page}`,
			minify: false,
			filename: `./${page.replace(/\.pug/, '.html')}`
		}))
	],
}
