const { merge } = require('webpack-merge');
const WebpackModuleFederation = require('webpack/lib/container/ModuleFederationPlugin');

const packageJson = require("../package.json");
const commonConfig = require("./webpack.common");

const prodConfig = {
    mode: "production",
    output: {
        filename: '[name].[contenthash].js',
        publicPath: '/auth/latest/' // call between files in marketing
    },
    plugins: [
        new WebpackModuleFederation({
            name: 'auth',
            filename: 'remoteEntry.js',
            exposes: {
                './AuthApp': './src/bootstrap.js'
            },
            shared: packageJson.dependencies
        })
    ]
}

module.exports = merge(commonConfig, prodConfig);