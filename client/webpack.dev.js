const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

console.log('NODE_ENV =', process.env.NODE_ENV);

module.exports = {
    entry: './src/index.js',
    mode: 'development',
    target: 'web',
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'app.bundle.js',
        publicPath: '/'
    },
    plugins: [
        new HtmlWebpackPlugin({
            minify: {
                collapseWhitespace: false
            },
            hash: true,
            template: './src/index.html'
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        historyApiFallback: true,
        stats: 'errors-only',
        hot: true,
        port: 3000,
        proxy: {
            '/api': {
                target: 'http://localhost:4000',
                secure: false
            }
        }
    },
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
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[name]__[local]___[hash:base64:5]',
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
