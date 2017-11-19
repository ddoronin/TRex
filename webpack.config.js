const path = require('path');
const webpack = require('webpack');
const TransferWebpackPlugin = require('transfer-webpack-plugin');
const package = require('./package.json');

module.exports = {
	entry: [
		'./src/index.tsx'
		// the entry point of our app
	],

	output: {
		path: path.resolve(__dirname, 'public'),
		// the output bundle

		filename: `${package.name}.js`,

		publicPath: '/'
		// necessary for HMR to know where to load the hot update chunks
	},

	// Enable sourcemaps for debugging webpack's output.
	devtool: "source-map",

	resolve: {
		// Add '.ts' and '.tsx' as resolvable extensions.
		extensions: [".ts", ".tsx", ".js", ".json"]
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
	]
};