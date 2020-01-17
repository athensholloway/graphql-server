const path = require("path");
const webpack = require("webpack");
const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: "development",
    devtool: 'inline-source-map',
    entry: ["./src/index.ts"],
    target: "node",
    externals: [nodeExternals()],
    plugins: [
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
        {
            test: /\.(js|ts)$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env", "@babel/preset-typescript"],
                    "plugins": ["@babel/plugin-proposal-class-properties", "@babel/plugin-transform-runtime"]
                }
            }
        }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.json']
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "server.js",
    }
}