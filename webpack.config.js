const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: "./src/index.html",
    filename: "index.html",
    inject: "body"
});

module.exports = {
    mode: "development",
    entry: "./src/index.jsx", // specifies where the bundle starts the bundling process
    output: {  // specifies where the javascript code is to be stored
        path: path.resolve("dist"),
        filename: "index_bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: "babel-loader"
            },
            {
                test: /\.(css|scss)$/,
                use: [ 'style-loader', 'css-loader', 'sass-loader' ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|woff|woff2|eot|ttf)(\?v=\d+\.\d+\.\d+)?$/,
                use: "file-loader"
            },
            {
                test: /\.(svg)(\?v=\d+\.\d+\.\d+)?$/,
                exclude: /src/,
                use: "file-loader"
            },
            {
                test: /\.svg$/,
                exclude: /node_modules/,
                use: ['babel-loader', {loader: 'react-svg-loader', options: {jsx: true}}]
            }
        ]
    },
    resolve: {
        extensions: [".jsx", ".js"]
    },
    plugins: [
        HtmlWebpackPluginConfig
    ],
    devServer: {
        port: 3000,
        historyApiFallback: true
    }
};