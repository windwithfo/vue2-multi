<style lang="less">
  @import '../../assets/css/mixin';
  @import './css/index';

  #app {
    font-family: 'Avenir', 'Helvetica', 'Arial', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    margin-top: 60px;

    .nav-a {
      color: #c0ccda;
      text-decoration: none;
    }

    .subnav-a {
      color: #666;
      text-decoration: none;
    }

    .el-submenu__icon-arrow {
      display: none;
    }
  }
</style>

<template>
  <div id="app">
    <el-menu theme="dark" class="el-menu-demo" mode="horizontal">
      <template v-for="(item, index) in pageData.nav">
        <el-menu-item v-if="!item.subNav" :index="item.index">
          <a class="nav-a" target="_blank" :href="item.link">{{item.title}}</a>
        </el-menu-item>
        <template v-else>
          <el-submenu :index="item.index">
            <template slot="title">{{item.title}}</template>
            <el-menu-item v-for="subitem in item.subNav" :index="subitem.index" :key="subitem.index">
              <a class="subnav-a" target="_blank" :href="subitem.link">{{subitem.title}}</a>
            </el-menu-item>
          </el-submenu>
        </template>
      </template>
    </el-menu>

    <el-table :data="pageData.table" style="width: 100%">
      <el-table-column align="center" prop="date" label="日期" width="180"></el-table-column>
      <el-table-column align="center" prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column align="center" prop="address" label="地址"></el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      :total="pageData.list.totalNum"
      :page-size="pageData.list.pageSize"
      @current-change="pageChagen">
    </el-pagination>
    <el-tree :data="pageData.tree" @node-click="handleNodeClick"></el-tree>
    <el-radio-group v-model="sendData.radio">
      <el-radio
        v-for="(item, index) in pageData.radio"
        :label="item.value"
        :key="index">
        {{item.text}}
      </el-radio>
    </el-radio-group>
    <el-checkbox-group v-model="sendData.checkbox">
      <el-checkbox
        v-for="(item, index) in pageData.checkbox"
        :label="item.value"
        :key="index">
        {{item.text}}
      </el-checkbox>
    </el-checkbox-group>
    <el-select v-model="sendData.select" placeholder="请选择">
      <el-option
        v-for="(item, index) in pageData.select"
        :label="item.text"
        :value="item.value"
        :key="index">
      </el-option>
    </el-select>
    <el-tabs type="border-card" :active-name="sendData.tab" @tab-click="handleClick">
      <el-tab-pane
        v-for="(item, index) in pageData.tab"
        :label="item.text"
        :name="item.value"
        :key="index">
        {{item.text}}
      </el-tab-pane>
    </el-tabs>
    <br>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item v-for="(item, index) in pageData.bread" :key="index">
        <template v-if="index == (pageData.bread.length - 1)">
          {{item.text}}
        </template>
        <template v-else>
          <a :href="item.url">
            {{item.text}}
          </a>
        </template>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
  import fetch from 'isomorphic-fetch';

  export default {
    name: 'home',
    data() {
      return {
        pageData: {
          list: {}
        },
        sendData: {
          radio: '',
          checkbox: '',
          select: '',
          tab: '0'
        }
      };
    },
    mounted() {
      fetch('/mock/temp.json').then((response) => {
        if (response.status >= 400) {
          throw new Error('Bad response from server');
        }
        // body to json
        return response.json();
      }).then((json) => {
        // success callback
        console.log(json);
        this.pageData = json;
        this.sendData.radio = this.pageData.radioDefaul;
        this.sendData.checkbox = this.pageData.checkboxDefaul;
        this.sendData.select = this.pageData.selectDefault;
        this.sendData.tab = this.pageData.tabDefault;
      }, (error) => {
        // error callback
        console.log(error);
      });
    },
    methods: {
      handleClick(tab) {
        console.log(tab.index);
      },
      pageChagen(pageNum) {
        console.log(pageNum);
      },
      handleNodeClick(data) {
        console.log(data.value);
      }
    }
  };
</script>
