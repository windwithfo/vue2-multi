<template lang="pug">
  #app
    .txt list
    img(src="../imgs/bg.jpg" alt="img")
    br
    i.icon.iconfont &#xe660;
    el-button 默认按钮
</template>

<script lang="ts">
  import { name } from '../js';
  import fetch    from 'isomorphic-fetch';

  import {
    Vue,
    Component
  } from 'vue-property-decorator';

  @Component
  export default class extends Vue {
    mounted() {
      console.log(name);
      fetch('static/mock/errorCode.json').then((response) => {
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
  }
</script>
