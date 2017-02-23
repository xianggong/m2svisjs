<template>
<div id="m2svis-toolbar">
  <md-toolbar class="md-dense">
    <h2 class="md-title">{{ pageName }}</h2>
  </md-toolbar>
</div>
</template>

<script>
export default {
  name: 'm2svis-toolbar',
  props: {
    pageName: {
      type: String,
      default: "Mult2Sim Visualization Tool"
    }
  }
}
</script>

<style scoped>

</style>
