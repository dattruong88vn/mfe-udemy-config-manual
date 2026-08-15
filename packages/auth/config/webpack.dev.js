const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackModuleFederation = require('webpack/lib/container/ModuleFederationPlugin');

const packageJson = require("../package.json");
const commonConfig = require("./webpack.common");

const devConfig = {
    mode: "development",
    output: {
        publicPath: "http://localhost:8082/"
    },
    devServer: {
        port: 8082,
        historyApiFallback: {
            index: '/index.html'
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new WebpackModuleFederation({
            name: 'auth',
            filename: 'remoteEntry.js',
            exposes: {
                './AuthApp': './src/bootstrap.js'
            },
            shared: {
                ...packageJson.dependencies,
                react: {
                    singleton: true,
                    requiredVersion: packageJson.dependencies['react'],
                },
                'react-dom': {
                    singleton: true,
                    requiredVersion: packageJson.dependencies['react-dom'],
                },
                'react-router-dom': {
                    singleton: true,
                    requiredVersion: packageJson.dependencies['react-router-dom'],
                },
            }
        })
    ]
}

module.exports = merge(commonConfig, devConfig);