const CopyPlugin = require('copy-webpack-plugin');
const HandlebarsPlugin = require('handlebars-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

const paths = {
    src: {
        images: './src/img',
        js: './src/js',
        sass: './src/sass',
    },
    dist: {
        images: './assets/img',
        js: './assets/js',
        css: './assets/css',
    },
}

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: {
      'main': [
          paths.src.js + '/scripts.js',
          paths.src.sass + '/styles.scss',
      ],
    },
    module: {
        rules: [
            {
                test: /\.(sass|scss)$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin({
                extractComments: false,
                terserOptions: {
                    output: {
                        comments: true,
                    },
                },
            }),
        ],
    },
    output: {
        filename: paths.dist.js + '/[name].bundle.js',
        clean: true,
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: paths.src.images,
                    to: paths.dist.images,
                },
            ],
        }),
        new HandlebarsPlugin({
            entry: path.join(process.cwd(), 'src', 'html', '**', '*.html'),
            output: path.join(process.cwd(), 'dist', '[path]', '[name].html'),
        }),
        new MiniCssExtractPlugin({
            filename: paths.dist.css + '/[name].bundle.css',
        }),
    ],
}