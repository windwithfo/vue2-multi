/**
 * @file entry
 * @author dongkunshan(windwithfo@yeah.net)
 */

import fs   from 'fs';
import path from 'path';

let pages = {
  home: 'view/home/home.js',
  list: 'view/list/list.js'
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

pages = getEntry();

export default pages;