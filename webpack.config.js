//We'll use this to add plugins so that our front end can access our API keys
const webpack = require('webpack')

const isDev = process.env.NODE_ENV === 'development'

if (process.env.NODE_ENV !== 'production') require('./secrets')

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: [
    '@babel/polyfill', // enables async-await
    './client/index.js'
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: 'source-map',
  watchOptions: {
    ignored: /node_modules/
  },
  module: {
    rules: [
      // {
      //   test: /\.js/,
      //   exclude: /scripts/,
      // },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
    ]
  },
  //allows our front end to access API keys.
  plugins: [
    new webpack.DefinePlugin({
      'process.env.IEX_API_ENDPOINT': JSON.stringify(
        process.env.IEX_API_ENDPOINT
      )
    }),
    new webpack.DefinePlugin({
      'process.env.IEX_API_KEY': JSON.stringify(
        process.env.IEX_API_KEY
      )
    })
  ]
}
