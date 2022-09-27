import path from 'path'
import webpack, { Configuration as WebpackConfiguration } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";
import TsConfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import CleanPlugin from 'clean-webpack-plugin'

interface Configuration extends WebpackConfiguration {
    devServer?: WebpackDevServerConfiguration;
}

const devMode = process.env.NODE_ENV !== "production";

const config: Configuration = {
    mode: 'production',
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, "build"),
        filename: 'js/pure.[chunkhash].bundle.js',
        publicPath: "/",
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/i,
                exclude: /node_modules/,
                loader: 'ts-loader'
            },
            {
                test: /\.(css|scss)$/i,
                exclude: /node_modules/,
                use: [
                    devMode ? "style-loader" : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        }
                    },
                    "sass-loader"]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource'
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        preferRelative: true,
        plugins: [new TsConfigPathsPlugin()]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: "styles/[name].css"
        })
    ],
    optimization: {
        // Once your build outputs multiple chunks, this option will ensure they share the webpack runtime
        // instead of having their own. This also helps with long-term caching, since the chunks will only
        // change when actual code changes, not the webpack runtime.
        minimize: true,
        minimizer: [new CssMinimizerPlugin()],
        runtimeChunk: {
            name: "runtime"
        },
        splitChunks: {
            chunks: "all"
        }
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, "build"),
        historyApiFallback: true,
        port: 4001,
        open: true,
        hot: true
    },
}

export default config;