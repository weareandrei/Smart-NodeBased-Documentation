const tsLoader = {
    test: /\.(ts|tsx)$/,
    loader: 'ts-loader',
    exclude: /node_modules/
}

const babel = {
    test: /.jsx?$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
    options: {
        presets: ['@babel/preset-env', '@babel/preset-react'],
        plugins: [
            '@babel/plugin-transform-runtime',
            ["@babel/plugin-proposal-decorators", { "legacy": true }],
            ['babel-plugin-webpack-alias-7', {config: './webpack.development.config.js'}],
            // eslint-disable-next-line detect-bad-words/in-code
            '@babel/plugin-proposal-object-rest-spread',
            '@babel/plugin-syntax-dynamic-import',
            // 'babel-plugin-module-resolver',
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-proposal-export-default-from'
        ]
    }
}

const css = {
    test: /\.css$/,
    use: ['style-loader', 'css-loader']
}

const less = {
    test: /\.less$/,
    use: [{loader: 'style-loader'},
        {loader: 'css-loader'},
        {loader: 'less-loader'}]
}

const image = {
    test: /\.(jpe?g|png|gif|svg|cur)$/i,
    use:
        [
            {
                loader: 'file-loader',
                options: {
                    query: {
                        name: '[name].[ext]'
                    }
                }
            },
            {
                loader: 'image-webpack-loader',
                options: {
                    query: {
                        bypassOnDebug: true,
                        progressive: true,
                        optimizationLevel: 3,
                        interlaced: false,
                        pngquant: {
                            quality: '65-90',
                            speed: 4
                        },
                        mozjpeg: {
                            progressive: true
                        },
                        gifsicle: {
                            interlaced: true
                        },
                        optipng: {
                            optimizationLevel: 7
                        }
                    }
                }
            }
        ]
}

const font = {
    test: /\.(eot|ttf|woff|woff2)$/,
    loader:
        'file-loader?name=[name].[ext]'
}

const mjs = {
    test: /\.mjs$/,
    include: /node_modules/,
    type: 'javascript/auto'
}

const worker = {
    test: /\.worker\.js$/,
    use: {loader: 'worker-loader'}
}

module.exports = {
    babel,
    css,
    less,
    image,
    font,
    mjs,
    worker,
    tsLoader
}
