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
import Extract from 'mini-css-extract-plugin';

const projectRoot = path.resolve(__dirname, '../');

const plugins = [];
const entries = Object.assign({}, entry.pages, entry.vendors);

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
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        default: {
          minChunks: 1,
          priority: -20,
          reuseExistingChunk: true
        },
        vendor1: {
          name: 'vue',
          test: /node_modules\/vue/,
          priority: 10,
          enforce: true
        },
        vendor2: {
          name: 'mint',
          test: /node_modules\/mint-ui/,
          priority: 10,
          enforce: true
        },
        style: {
          name: 'style',
          test: /\.css/,
          chunks: 'all',
          minChunks: 1,
          enforce: true
        }
      }
    }
  },
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
        use: [Extract.loader, 'css']
      },
      {
        test: /\.less$/,
        use: [Extract.loader, 'css', 'less']
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
