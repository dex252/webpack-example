'use strict';

const path = require("path");
const entryConfig = require('./webpack.config.bundles');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin }  = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpackNotifier = require('webpack-notifier');
const uglifyJSPlugin = require('uglifyjs-webpack-plugin');

/**
 * @type {import('webpack').Configuration}
 */
let config = {
    entry: entryConfig,
    output: {
        path: path.resolve(__dirname, "wwwroot/bundles"),
        filename: './[name].js',
        sourceMapFilename: './[name].map',
        library: 'Healbe'
    },
    resolve: {
        extensions: ['.js', 'css'],
        alias: {
            libs: path.resolve(__dirname, 'wwwroot/lib'),
            scripts: path.resolve(__dirname, 'Scripts/src'),
            Scripts: path.resolve(__dirname, 'Scripts/'),
            libs: path.resolve(__dirname, 'node_modules'),
            styles: path.resolve(__dirname, 'Content'),
            shared: path.resolve(__dirname, 'Scripts/Custom/Shared'),
            shared: path.resolve(__dirname, 'ViewModels')
        }
    },
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]|[\\/]Content[\\/]Site\.css/,
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new webpackNotifier()
    ],
    module: {
        rules: [
            {
                test: /\/.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: 'wwwroot/bundles',
                            hmr: process.env.NODE_ENV === 'production'
                        },
                    },
                    'css-loader',
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css=loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [
                                    require('autoprefixer')
                                ];
                            }
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            }, {
                test: /\.(woff|woff2|ttf|eot|svg|gif|png)(\?[\s\S]+)?$/,
                loader: 'file-loader',
            },
            {
                test: require.resolve('jquery'),
                use: [
                    {
                        loader: 'expose-loader',
                        options: {
                            exposes: ['$', 'jQuery'],
                        }
                    }
                   
                ]
            }
        ]
    }
};

//Модифицируем результирующий JS код для поддержки ES5
if (!process.env.CHROME) {
    config.module.rules.push({
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
    });
}

if (process.env.NODE_ENV === 'production') {
    config.module.rules.push( new uglifyJSPlugin({
        sourceMap: true,
        uglifyOptions: {
            output: {
                comments: false
            },
            compress: false,
            mangle: false
        }
    }));
}

if (!process.env.NODE_ENV === 'development') {
    config.devtool = 'inline-source-map';
    config.devServer = { contentBase: './wwwroot/bundles/js' };
}

if (process.env.CHROME) {
    config.devtool = 'eval';
}

module.exports = config;