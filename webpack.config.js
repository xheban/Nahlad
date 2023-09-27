const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');
const htmlPlugin = new HtmlWebPackPlugin({
    template: "./src/index.html",
    filename: "./index.html"
});
module.exports = {
    entry: ["regenerator-runtime/runtime.js", "./src/index.js"],
    output: { // NEW
        path: path.join(__dirname, 'dist'),
        filename: "[name].js"
    }, // NEW Ends
    plugins: [htmlPlugin],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "cache-loader",
                    {
                        loader: 'thread-loader',
                        // loaders with equal options will share worker pools
                        options: {
                            // number of jobs a worker processes in parallel
                            // defaults to 20
                            workerParallelJobs: 50,

                        },
                    },
                    "style-loader",
                    "css-loader",
                    "fast-sass-loader",
                ]
            },
        ]
    },
    optimization: {
        runtimeChunk: true,
    },
};