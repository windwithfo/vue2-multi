/**
 * @file home入口文件
 * @author windwithfo(windwithfo@yeah.net)
 */

// core js
import Vue from 'vue';
import VueResource from 'vue-resource';

// global css
import '../../assets/css/common.less';

// pages
import Home from './Home.vue';

// add reference
Vue.use(VueResource);

// components
import {
  Select,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  select,
  option,
  tabs,
  tabPane,
  breadcrumb,
  breadcrumbItem,
  table,
  tableColumn,
  pagination,
  tree,
  menu,
  submenu,
  menuItem,
  Popover
} from 'element-ui';

Vue.use(Select);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(select);
Vue.use(option);
Vue.use(tabs);
Vue.use(tabPane);
Vue.use(breadcrumb);
Vue.use(breadcrumbItem);
Vue.use(table);
Vue.use(tableColumn);
Vue.use(pagination);
Vue.use(tree);
Vue.use(menu);
Vue.use(submenu);
Vue.use(menuItem);
Vue.use(Popover);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<Home/>',
  components: {
    Home
  }
});
