const path = require('path');
const webpack = require('webpack');
const TransferWebpackPlugin = require('transfer-webpack-plugin');
const package = require('./package.json');
const HOST_NAME = 'localhost';
const PORT_NUMBER = 3000;

module.exports = {
	entry: [
		'react-hot-loader/patch',

		`webpack-dev-server/client?http://${HOST_NAME}:${PORT_NUMBER}`,
		// bundle the client for webpack-dev-server
		// and connect to the provided endpoint

		'webpack/hot/only-dev-server',
		// bundle the client for hot reloading
		// only- means to only hot reload for successful updates

		'./src/index.tsx'
		// the entry point of our app
	],
	devtool: 'source-map',
	resolve: {
		// Add '.ts' and '.tsx' as resolvable extensions.
		extensions: [".ts", ".tsx", ".js", ".json"]
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		// the output bundle

		filename: `${package.name}.js`,

		publicPath: '/'
		// necessary for HMR to know where to load the hot update chunks
	},
	module: {
		rules: [
			{
				test: /\.(png|jpg|gif|ttf|woff|svg|woff2|eot)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192
						}
					}
				]
			},
			{
				// All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
				test: /\.tsx?$/,
				loader: "awesome-typescript-loader"
			},

			{
				// All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
				enforce: "pre",
				test: /\.js$/,
				loader: "source-map-loader"
			},
			{
				test: /\.scss$/,
				use: [{
					loader: "style-loader" // creates style nodes from JS strings
				}, {
					loader: "css-loader" // translates CSS into CommonJS
				}, {
					loader: "resolve-url-loader",
					options: {
						keepQuery: true
					}
				}, {
					loader: "sass-loader", // compiles Sass to CSS
					options: {
						sourceMap: true
					}
				}]
			}]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		// enable HMR globally

		new webpack.NamedModulesPlugin(),
		// prints more readable module names in the browser console on HMR updates

		new webpack.NoEmitOnErrorsPlugin(),
		// do not emit compiled assets that include errors

		new TransferWebpackPlugin([
			{from: 'www'},
		], path.resolve(__dirname)),

		new webpack.LoaderOptionsPlugin({
			options: {
				context: '/'
			}
		})
	],
	devServer: {
		contentBase: 'src/www',
		// relative directory for base of server

		host: HOST_NAME,

		port: PORT_NUMBER,

		historyApiFallback: true,
		// respond to 404s with index.html

		hot: true
		// enable HMR on the server
	}
};
