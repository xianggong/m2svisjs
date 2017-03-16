<template>
<div name="m2svis-header" class="header">
  <div class="logo">
    <h2>M2S-VIS</h2>
  </div>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/' + tracename }">{{tracename}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{pageName}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</div>
</template>

<script>
export default {
  name: 'm2svis-header',
  props: {
    pageName: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      tracename: ''
    }
  },
  created() {
    this.tracename = this.$route.params.tracename;
  },
}
</script>

<style scoped>
.header {
  display: flex;
  flex-flow: row nowrap;
  flex-shrink: 0;
  align-items: center;
  height: 48px;
  background: #324057;
}

.logo {
  padding-left: 10px;
  padding-right: 10px;
  color: white
}

h2 {
  font-family: "Whitney Cond A", "Whitney Cond B", "Lato", "Lucida Grande", "Lucida Sans Unicode", Tahoma, Sans-Serif;
}
</style>
