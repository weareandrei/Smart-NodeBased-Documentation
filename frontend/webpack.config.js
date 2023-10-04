const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: [
        'react-hot-loader/patch',
        './src/development.jsx'
    ],
    output: {
        publicPath: '/dist/',
        hotUpdateChunkFilename: 'hot/[id].[hash].hot-update.js',
        hotUpdateMainFilename: 'hot/[hash].hot-update.json'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/, // Match JavaScript and JSX files
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader', // Use Babel for transpiling JSX and ES6
                },
            },
        ],
    },
    plugins: [
        // Generates an HTML file with a script tag to include the bundle
        new HtmlWebpackPlugin({template: './index.html', hash: true})
    ],
    devServer: {
        contentBase: './dist', // Serve content from the "dist" directory
        hot: true, // Enable hot module replacement
        port: 3000, // Port for development server
    },
};
