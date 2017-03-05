<template>
<div id="app" class="container">
  <router-view></router-view>
</div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", Arial, sans-serif;
  transform: translateZ(0);
}

h2 {
  font-family: "Whitney Cond A", "Whitney Cond B", "Lato", "Lucida Grande", "Lucida Sans Unicode", Tahoma, Sans-Serif;
}

.container {
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  flex: 1;
}
</style>
