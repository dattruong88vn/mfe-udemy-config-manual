const { merge } = require('webpack-merge');
const WebpackModuleFederation = require('webpack/lib/container/ModuleFederationPlugin');

const packageJson = require("../package.json");
const commonConfig = require("./webpack.common");

const devConfig = {
    mode: "development",
    output: {
        publicPath: "http://localhost:8080/",
    },
    devServer: {
        port: 8080,
        historyApiFallback: {
            index: '/index.html'
        }
    },
    plugins: [
        new WebpackModuleFederation({
            name: 'container',
            remotes: {
                marketing: 'marketing@http://localhost:8081/remoteEntry.js',
                auth: 'auth@http://localhost:8082/remoteEntry.js'
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