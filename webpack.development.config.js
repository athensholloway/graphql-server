const path = require("path");
const webpack = require("webpack");
const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: "development",
    devtool: 'inline-source-map',
    entry: ['webpack/hot/poll?1000', "./src/index.ts"],
    target: "node",
    externals: [nodeExternals({
        whitelist: ['webpack/hot/poll?1000']
      })],
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin()
    ],
    watch: true,
    module: {
        rules: [
        {
            test: /\.(js|ts)$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env", "@babel/preset-typescript"],
                    "plugins": ["@babel/plugin-proposal-class-properties"]
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