<template>
<div id="m2svis-trace-timeline" class="container">
  <el-row class="topbar">
    <div class="topbar-logo">
      <h2>M2S-VIS</h2>
    </div>
    <el-col :span="20" class="topbar-main">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
        <el-breadcrumb-item v-model="tracename" :to="{ path: '/' + tracename }">{{tracename}}</el-breadcrumb-item>
        <el-breadcrumb-item>timeline</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
  </el-row>

</div>
</template>

<script>
export default {
  name: 'm2svis-trace-timeline',
  data: function() {
    return {
      tracename: "",
    }
  },
  created: function() {
    this.tracename = this.$route.params.tracename;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  flex: 1;
}

.topbar {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  flex-shrink: 0;
  height: 48px;
  background: #324057;
}

.topbar-logo {
  padding-left: 10px;
  color: white
}

.topbar-main {
  flex: 1;
  flex-flow: column nowrap;
  margin-left: 10px;
}
</style>
