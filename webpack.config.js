const webpack = require("webpack");
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
		{
			test: /\.scss$/,
			use: [
				'style-loader',
				'css-loader',
				{
					loader: 'postcss-loader',
					options: {
						postcssOptions: {
							plugins: [require('autoprefixer')],
						},
					},
				},
				'sass-loader',
			],
		},
		{
        test: /\.(png|jpe?g|gif|svg)$/i, // Match image file types
        type: 'asset', // Use Webpack 5's built-in asset module
        parser: {
            dataUrlCondition: {
                maxSize: 8 * 1024, // Inline files smaller than 8 KB
            },
        },
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: [".*", ".js", ".jsx", ".ts", ".tsx"],
	  alias: {
		  '@styles': path.resolve(__dirname, 'src/styles'), // Create alias for styles folder
	  },
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    hot: true,
    historyApiFallback: true,
    port: 9500
  }
};
