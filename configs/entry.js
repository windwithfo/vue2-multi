/**
 * @file entry
 * @author dongkunshan(windwithfo@yeah.net)
 */

import fs   from 'fs';
import path from 'path';

function resolve(dir) {
  return path.join(__dirname, '../src/views', dir);
}

let pages = {
  home: {
    show: true,
    path: resolve('index/index'),
    title: 'home',
    meta: {
      keywords: 'home',
      description: 'home',
      viewport: 'initial-scale=1, maximum-scale=1',
      'format-detection': 'telephone=no',
      'format-detection': 'email=no',
    }
  },
  list: {
    show: true,
    path: resolve('list/list'),
    title: 'list',
    meta: {
      keywords: 'list',
      description: 'list'
    }
  }
};

// auto get entry
function getEntry() {
  const entry = {};
  const root = path.resolve(__dirname, '../src/views');
  const js = readDirSync(root);
  js.forEach((element) => {
    entry[path.parse(element).name] = element.replace('.html', '.ts');
  });
  return entry;
}

// find .html in folder
function readDirSync(root) {
  const files = fs.readdirSync(root);
  let js = [];
  files.forEach(function(ele, index) {
      const info = fs.statSync(root + '/' + ele);
      if(info.isDirectory()) {
        js = js.concat(readDirSync(root + '/' + ele));
      }
      else {
        if (path.extname(ele) === '.html') {
          js.push(path.resolve(root, ele));
        }
      }
  });
  return js;
}

// pages = getEntry();

export default pages;