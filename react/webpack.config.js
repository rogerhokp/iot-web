
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
        })
    ]
};
