'use strict';

var path = require('path');
var webpack = require('webpack');


module.exports = {
    context: __dirname,
    entry: './src/browser',
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'build.js'
    },
    module: {
        preLoders: [{
            test: /\.(js|jsx)$/,
            loaders: ['eslint'],
            exclude: /node_modules/
        }],
        loaders: [{
            test: /\.(js|jsx)$/,
            loaders: ['babel'],
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            loader: "style-loader!css-loader"
        }, ]
    },  
    plugins: [
        
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};