/**
 * @file build file
 * @author windwithfo(windwithfo@yeah.net)
 */

import path           from 'path';
import glob           from 'glob';
import webpack        from 'webpack';
import config         from './config';
import merge          from 'webpack-merge';
import base           from './webpack.base.conf';
import UglifyJs       from 'uglifyjs-webpack-plugin';
import Extract        from 'mini-css-extract-plugin';
import Compress       from 'compression-webpack-plugin';
import CSSAssets      from 'optimize-css-assets-webpack-plugin';
import BundleAnalyzer from 'webpack-bundle-analyzer/lib/BundleAnalyzerPlugin';

const projectRoot = path.resolve(__dirname, '../');

let useMap = false;

function assetsPath(_path) {
  let assetsSubDirectory = config.build.assetsSubDirectory;
  return path.posix.join(assetsSubDirectory, _path);
}

let webpackConfig = merge(base, {
  mode: 'production',
  performance: {
    hints: false
  },
  devtool: useMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    publicPath: '',
    filename: assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    new Extract({
      filename: 'css/app.[name].css',
      chunkFilename: 'css/app.[contenthash:12].css'
    }),
    // new BundleAnalyzer({
    //   analyzerMode: 'static'
    // })
  ]
})

if (config.build.productionGzip) {
  webpackConfig.plugins.push(
    new Compress({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp('\\.(' + config.build.productionGzipExtensions.join('|') + ')$' ),
      threshold: 10240,
      minRatio: 0.8
    })
  );
}

export default {
  ...webpackConfig
};
