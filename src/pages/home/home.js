/**
 * @file home入口文件
 * @author windwithfo(windwithfo@yeah.net)
 */

// core js
import Vue from 'vue';

// global css
import '../../assets/css/common.less';

// pages
import Home from './Home.vue';

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

Vue.component(Select.name, Select);
Vue.component(Radio.name, Radio);
Vue.component(RadioGroup.name, RadioGroup);
Vue.component(Checkbox.name, Checkbox);
Vue.component(CheckboxGroup.name, CheckboxGroup);

// Vue.component(select.name, select);
// Vue.component(option.name, option);
// Vue.component(tabs.name, tabs);
// Vue.component(tabPane.name, tabPane);
// Vue.component(breadcrumb.name, breadcrumb);
// Vue.component(breadcrumbItem.name, breadcrumbItem);
// Vue.component(table.name, table);
// Vue.component(tableColumn.name, tableColumn);
// Vue.component(pagination.name, pagination);
// Vue.component(tree.name, tree);
// Vue.component(menu.name, menu);
// Vue.component(submenu.name, submenu);
// Vue.component(menuItem.name, menuItem);
// Vue.component(Popover.name, Popover);

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
