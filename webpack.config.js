const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = () => {
    return {
        entry: {
           path: path.join(__dirname, 'src', 'index.js')
        },
        output: {
            path: path.join(__dirname, 'production', 'dist'),
            filename: '[name].js'
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['react', 'es2015'],
                            plugins: ['transform-object-rest-spread']
                        }
                    }
                },
                {
                    test: /\.sass$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'style-loader'
                        },
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ]
                },
                {
                    test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                    use: {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: "[name].[ext]"
                        }
                    }
                }
            ]
        },

        devServer: {
            historyApiFallback: true
        },

        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html'
            })
        ]

    }
};

module.exports = config;