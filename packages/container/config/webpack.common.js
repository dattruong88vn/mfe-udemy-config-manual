const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react', '@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-runtime']
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
}

/**
 *                   Webpack
                        │
                        ▼
              Có file .js / .mjs ?
                        │
                       YES
                        │
                        ▼
                   babel-loader
                        │
                        ▼
                     Babel
                   /       \
                  /         \
       preset-react       preset-env
           │                  │
           ▼                  ▼
          JSX            Modern JS
           │                  │
           └────────┬─────────┘
                    ▼
              JavaScript
              tương thích
 */