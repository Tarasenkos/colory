const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
  entry: '/app.js',
  output: {
    filename: 'build.[chunkhash].js',
    path: path.resolve(__dirname, 'public')
  },
  devServer: {
    port: 1234,
  },
  plugins: [
    new HTMLPlugin ({
      template: 'index.html'
    }),
    new CleanWebpackPlugin()
  ], 
  module: {
        rules: [{
            test: /\.(j|t)sx?$/,
            exclude: [/node_modules/],
            use: [{
                loader: "babel-loader",
                options: {
                    presets: ['babel-preset-expo'],
                    env: {
                      development: {
                        plugins: [
                          '@babel/plugin-syntax-class-properties',
                        ],
                      },
                    },
                }
            }]
        },
        {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      }],
}  

}