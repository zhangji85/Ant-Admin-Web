<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
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
