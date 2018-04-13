<style lang="less">
  @import '../../assets/css/common';
  @import './css/index';

  #app {
    font-family: 'Avenir', 'Helvetica', 'Arial', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    background: url('imgs/bg.jpg') 0 0 no-repeat;

    a {
      color: #ff0;
    }
  }
</style>

<template>
  <div id="app">
    <div class="txt">
      list
    </div>
    <img src="./imgs/bg.jpg" alt="img"></img></br>
    <i class="icon iconfont">&#xe660;</i>
    <el-button>默认按钮</el-button>
  </div>
</template>

<script>
  import js    from './js/index';
  import fetch from 'isomorphic-fetch';

  console.log(js.name);

  export default {
    name: 'list',
    mounted: function () {
      fetch('/mock/errorCode.json').then((response) => {
        if (response.status >= 400) {
          throw new Error('Bad response from server');
        }
        // body to json
        return response.json();
      }).then((json) => {
        // success callback
        console.log(json);
      }, (error) => {
        // error callback
        console.log(error);
      });
    }
  };
</script>
