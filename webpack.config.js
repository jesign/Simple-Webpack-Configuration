var webpack = require('webpack');
var path = require('path');
let ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	entry: {
		app: [
			'./src/js/app.js',
		 	'./src/scss/app.scss'
		]
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: '[name].js'
	},
	module: {
		rules: [
			/* Sass Compiler */
			{
				test: /\.s[ac]ss$/,
				use: ExtractTextPlugin.extract({
		          	use : ['css-loader', 'sass-loader'],
		          	fallback: "style-loader",
		        })
				
			},
			/* Images Url*/
			{
				test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
				loader : 'file-loader',
				options : {
					name: 'images/[name].[hash].[ext]' 
				}
			},
			/* ES5*/
			{ 
				test: /\.js$/,  
				exclude: /node_modules/, 
				loader: "babel-loader" 
			},
		]
	},
	plugins: [
	  	new ExtractTextPlugin("[name].css"),
	]
}

if(process.env.NODE_ENV === 'production'){
	module.exports.plugins.push(
		new webpack.optimize.UglifyJsPlugin()
	);
}