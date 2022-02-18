<template>
  <a-config-provider :locale="zh_CN">
    <div id="app">
      <router-view />
    </div>
  </a-config-provider>
</template>

<script>
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');
export default {
  name: 'App',
  data() {
    return {
      zh_CN
    };
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  /* -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
  height: 100%;
}
body {
  /* font-family: Artiely !important; */
}
::-webkit-scrollbar {
  width: 0.5rem;
  height: 0.5rem;
}
::-webkit-scrollbar-thumb {
  height: 3.125rem;
  background-color: #a3a3a3;
  -webkit-border-radius: 0.3125rem;
  outline: 0.0625rem solid #f0f2f5;
  outline-offset: -0.0625rem;
  border: 0.0625rem solid #f0f2f5;
}
::-webkit-scrollbar-track-piece {
  background-color: #f0f2f5;
  -webkit-border-radius: 0;
}
</style>
