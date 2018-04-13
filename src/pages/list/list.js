/**
 * @file list 入口文件
 * @author windwithfo(windwithfo@yeah.net)
 */

// core js
import Vue from 'vue';

// global css
import '../../assets/css/common.less';

// pages
import List from './List.vue';

// components
import {
  Button,
  Select
} from 'element-ui';

Vue.use(Button);
Vue.use(Select);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<List/>',
  components: {
    List
  }
});
