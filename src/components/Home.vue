<template>
  <div id="home">
    <m2svis-toolbar></m2svis-toolbar>
    <m2svis-database></m2svis-database>
  </div>
</template>

<script>
import Toolbar from "./Toolbar"
import Database from "./Database"

export default {
  name: 'home',
  components: {
    'm2svis-toolbar': Toolbar,
    'm2svis-database': Database,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
