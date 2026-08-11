const { merge } = require('webpack-merge');
const WebpackModuleFederation = require('webpack/lib/container/ModuleFederationPlugin');

const packageJson = require("../package.json");
const commonConfig = require("./webpack.common");

const DOMAIN = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
    mode: "production",
    output: {
        filename: '[name].[contenthash].js',
        // production: sync code to S3 in folder: /container/latest
        // call between files in container
        publicPath: '/container/latest/'
    },
    plugins: [
        new WebpackModuleFederation({
            name: 'container',
            remotes: {
                marketing: `marketing@${DOMAIN}/marketing/latest/remoteEntry.js`
            },
            shared: packageJson.dependencies
        })
    ]
}

module.exports = merge(commonConfig, prodConfig);