'use strict';

const path = require('path');

const WebpackConfig = {
    entry: "./src/js/index.js",
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "index.js"
    },

    devtool: 'cheap-module-eval-source-map',

    devServer: {
        inline: true
    }
};

module.exports = WebpackConfig;
