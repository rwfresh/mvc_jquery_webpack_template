const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env = {}, argv = {}) => {

    const isProd = argv.mode === 'production';

    const config = {
        mode: argv.mode || 'development', // we default to development when no 'mode' arg is passed

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
                template: '_LayoutTemplate.cshtml',
                filename: '../../Views/Shared/_Layout.cshtml', //the output root here is /wwwroot/dist so we ../../      
                inject: false
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