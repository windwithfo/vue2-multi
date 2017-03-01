/**
 * @file base file
 * @author windwithfo(windwithfo@yeah.net)
 */

import path    from 'path';
import webpack from 'webpack';
import config  from './config';
import entry   from '../src/entry';
import postcss from 'postcss-cssnext';
import Html    from 'html-webpack-plugin';
import Extract from 'extract-text-webpack-plugin';

const projectRoot = path.resolve(__dirname, '../');

let plugins = [];
let entries = Object.assign({}, entry.pages, entry.vendors);

plugins.push(new webpack.optimize.CommonsChunkPlugin({
    names: ['vue','manifest']
}));

let extractStyl = new Extract({
    filename: '[name].[contenthash].css',
    disable: false,
    allChunks: true
});

plugins.push(extractStyl);

initHtml();

function initHtml() {
    let pathname = './src/pages/';
    for (let page in entry.pages) {
        if (entry.pages.hasOwnProperty(page)) {
            plugins.push(new Html({
                filename: path.basename(page) + '.html',
                template: pathname + page + '/' + page + '.html',
                inject: true,
                excludeChunks: Object.keys(entry.pages).filter(function (item) {
                    return (item !== page);
                }),
                minify: {
                    removeComments: true,
                    collapseWhitespace: true
                }
            }));
        }
    }
}

function assetsPath(_path) {
    let assetsSubDirectory = config.build.assetsSubDirectory;
    return path.posix.join(assetsSubDirectory, _path);
}

let webpackConfig = {
    entry: entries,
    output: {
        path: config.build.assetsRoot,
        publicPath: '/',
        filename: assetsPath('js/[name].[hash].js'),
        chunkFilename: assetsPath('js/[id].[hash].js')
    },
    resolve: {
        modules: [
            path.resolve(__dirname, '../src'),
            'node_modules'
        ],
        extensions: ['.js', '.vue', 'less'],
        alias: {
            'vue': 'vue/dist/vue.js',
            'common': 'assets/js',
            'component': 'components',
            'plugin': 'plugins'
        }
    },
    resolveLoader: {
        moduleExtensions: ['-loader']
    },
    module: {
        rules: [
            {
                  test: /\.vue$/,
                  use: [{
                      loader: 'vue',
                      options: {
                          postcss: [
                              postcss()
                          ]
                      }
                  }],
                  include: projectRoot
            },
            {
                test: /\.css$/,
                loader: extractStyl.extract({
                    fallbackLoader: 'style',
                    loader: 'css'
                })
            },
            {
                test: /\.less$/,
                loader: extractStyl.extract({
                    fallbackLoader: 'vue-style',
                    loader: 'css!less'
                })
            },
            {
                test: /\.js$/,
                use: [{
                    loader: 'babel',
                    options: {
                        presets: ['es2015']
                    }
                }],
                include: projectRoot,
                exclude: /node_modules/
            },
            {
                test: /\.json$/,
                use: [{
                    loader: 'json'
                }]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [{
                    loader: 'url',
                    options: {
                        limit: 10000,
                        name: assetsPath('img/[name].[hash:7].[ext]')
                    }
                }]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [{
                    loader: 'url',
                    options: {
                        limit: 10000,
                        name: assetsPath('fonts/[name].[hash:7].[ext]')
                    }
                }]
            }
        ]
    },
    plugins
};

export default {
    ...webpackConfig
};
