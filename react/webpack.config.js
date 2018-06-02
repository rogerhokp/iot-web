
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
require('dotenv').config();

module.exports = {
    target: 'web',
    debug: true,
    stats: { children: false },
    entry: {
        main: './src/app.jsx',
    },
    output: {
        path: '../static',
        filename: '[name].js'
    },
    module: {
        loaders: [
            { test: /\.jsx$/, exclude: /node_modules/, loader: 'babel' }
        ]
    },
    // preLoaders: [{
    //     test: /\.jsx$/,
    //     loader: 'flow-bin',
    //     exclude: /node_modules/,
    // }],
    plugins: [
        new webpack.DefinePlugin({
            ENDPOINT: JSON.stringify(process.env.ENDPOINT)
        }),
        new HtmlWebpackPlugin({
            template: './src/index.ejs'
        }),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            sourceMap: true,
            mangle: false,
            removeRedundantAttributes: false,
            compress: {
                dead_code: true,
                drop_console: true
            },
            compressor: {
                warnings: false
            },
            output: {
                comments: false
            }
        })
    ]
};
