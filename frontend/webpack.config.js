const path = require('path')
const {version} = require('./package.json')
const loaders = require('./webpack/loaders')
const webpack = require('webpack')
const cloneDeep = require('lodash/cloneDeep')
const concat = require('lodash/concat')
const set = require('lodash/set')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const WriteFilePlugin = require('write-file-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const buildModule = {
    rules: [
        set(cloneDeep(loaders.babel), 'options.plugins', concat(loaders.babel.options.plugins, 'react-hot-loader/babel')),
        loaders.css,
        loaders.less,
        loaders.image,
        loaders.font,
        loaders.mjs,
        loaders.worker,
        {
            test: /\.(js|jsx)$/, // Match JavaScript and JSX files
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader', // Use Babel for transpiling JSX and ES6
            },
        }
    ]
}

module.exports = {
    mode: 'development',
    context: __dirname,
    entry: [
        'react-hot-loader/patch',
        './src/development.jsx'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        chunkFilename: `[name].chunk.${version}.js`,
        publicPath: '/dist/',
        hotUpdateChunkFilename: 'hot/[id].[hash].hot-update.js',
        hotUpdateMainFilename: 'hot/[hash].hot-update.json'
    },
    module: buildModule,
    plugins: [
        // Generates an HTML file with a script tag to include the bundle
        new CleanWebpackPlugin(),
        new webpack.LoaderOptionsPlugin({options: {}}),
        new webpack.NamedModulesPlugin(),
        new WriteFilePlugin(),
        new CopyPlugin([{from: 'src/public', to: '.'}]),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.EnvironmentPlugin({NODE_ENV: 'development'}),
        new webpack.HashedModuleIdsPlugin(),
        new HtmlWebpackPlugin({template: './index.html', hash: true})
    ],
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.jsx', '.json', '.less', '.css', '.mjs'],
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    devtool: 'inline-source-map',
    devServer: {
        hot: true,
        writeToDisk: true,
        port: 8080,
        historyApiFallback: {
            index: 'index.html'
        },
        publicPath: '/dist/'
    },
    node: {fs: 'empty'}
}
