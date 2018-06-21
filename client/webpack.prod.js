const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

console.log('NODE_ENV =', process.env.NODE_ENV);

module.exports = {
    entry: './src/index.js',
    mode: 'production',
    target: 'web',
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'app.bundle.js'
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                uglifyOptions: {
                    compress: {
                        warnings: false,
                        drop_console: true,
                        drop_debugger: true
                    }
                },
                sourceMap: true
            })
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            minify: {
                collapseWhitespace: true
            },
            hash: true,
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'styles.css',
            chunkFilename: '[id].css'
        }),
        new OptimizeCssAssetsPlugin({
            cssProcessorOptions: {
                discardDuplicates: { removeAll: true },
                discardComments: { removeAll: true },
                safe: true,
                autoprefixer: {
                    add: true,
                    browsers: [
                        'last 4 versions',
                        'android 4',
                        'opera 12',
                        'ie 9'
                    ]
                }
            }
        }),
        new webpack.optimize.OccurrenceOrderPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[hash:base64:10]',
                            sourceMap: true
                        }
                    },
                    { loader: 'sass-loader' }
                ]
            },
            {
                test: /\.(jpg|jpeg|png|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'assets/img/',
                        publicPath: ''
                    }
                }]
            },
            {
                test: /\.eot|ttf|woff|woff2|svg$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'assets/webfonts/',
                        publicPath: ''
                    }
                }]
            }
        ]
    }
};
