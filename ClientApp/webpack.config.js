const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const rootDir = path.resolve(__dirname, '../');
module.exports = (env = {}, argv = {}) => {

    const isProd = argv.mode === 'production';

    const config = {
        mode: argv.mode || 'development', // we default to development when no 'mode' arg is passed
        devServer: {
            compress: isProd,
            overlay: {
                warnings: true,
                errors: true
            }
            //  , historyApiFallback: true
            , noInfo: true
        },
        cache: isProd,
        // generate source map
        devtool: !isProd ? 'cheap-module-source-map' : false,
        optimization: {
            minimize: true
        },
        entry: {
            main: './src/main.js'
        },
        output: {
            filename: isProd ? 'bundle-[chunkHash].js' : '[name].js',
            path: path.resolve(__dirname, '../wwwroot/dist'),
            publicPath: "/dist/"
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: isProd ? 'style-[contenthash].css' : 'style.css'
            }),
            new CompressionPlugin({
                filename: '[path].gz[query]',
                algorithm: 'gzip',
                test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
                threshold: 10240,
                minRatio: 0.8
            }),
            new HtmlWebpackPlugin({
                    filename: path.resolve(rootDir, 'Views/Shared/_Layout.cshtml'),
                    template: path.resolve(rootDir, 'Views/Shared/_LayoutTemplate.cshtml'),
                    inject: true
            })
        ],
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        'style-loader',
                        MiniCssExtractPlugin.loader,
                        'css-loader',                                                
                        'sass-loader'
                    ]
                },
                {
                    test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg)$/,
                    loader: 'file-loader',
                    options: {
                        name: '[name].[hash].[ext]',
                        outputPath: 'assets/'
                    }
                }
            ]
        }
    };
    return config;
};