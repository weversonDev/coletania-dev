const modoDev = process.env.NODE_ENV !== 'production'
// const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const terser_webpack_plugin = require('terser-webpack-plugin')
const css_minimizer_webpack_plugin = require('css-minimizer-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

/* 
    Uglify-js-plugin -> terser-webpack-plugin 
    optimize-css-assets-webpack-plugin -> css-minimizer-webpack-plugin
*/

module.exports = {
    mode: modoDev ? 'development' : 'production',
    entry: './src/index.js',
    devServer: {
        static: './build',
        port: 9000,
    },
    optimization: {
        minimize: true,
        minimizer: [
            new terser_webpack_plugin(),
            new css_minimizer_webpack_plugin({})
        ]
    },
    output: {
        filename: 'app.js',
        path: __dirname + '/build'
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: 'estilo.css' }),
        new CopyWebpackPlugin({
            patterns: [
                { from: '**/*.html', context: 'src/' },
                { from: 'imgs/**/*', context: 'src/' },
            ],
        }),
    ],
    module: {
        rules: [{
            test: /\.s?[ac]ss$/,
            use: [
                MiniCssExtractPlugin.loader,
                //'style-loader', // Adiciona CSS a DOM injetando a tag <style>
                'css-loader', // interpreta @import, url()...
                'sass-loader',
            ],
            
            
        }, {
            test: /\.(png|svg|jpg|gif)$/,
        }, {
            test: /.(ttf|otf|eot|svg|woff(2)?)$/,
        },
        {
            test: /\.m?js$/,
            enforce: 'pre',
            use: ['source-map-loader'],
          }
        ],
    }
}