var webpack = require('webpack');

module.exports = {
	entry: './js/app.js',
	output: {
		path: __dirname,
		filename: 'lib/bundle.js',
	},
	plugins: [
		// new webpack.optimize.UglifyJsPlugin({
  //   		compress: {
  //       		warnings: false
  //   		}
		// })
	],
	module: {
		loaders: [
			{
				test: /\.json$/,
				loader: 'json'
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			}
		]
	}
};
