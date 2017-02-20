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
  height: 100%;
  overflow: hidden;
}
.container {
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  flex: 1;
}
</style>
