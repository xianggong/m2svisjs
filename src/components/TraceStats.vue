<template>
<div id="m2svis-trace-stats">
  <el-row class="topbar">
    <div class="topbar-logo">
      <h2>M2S-VIS</h2>
    </div>
    <el-col :span="24" class="topbar-main">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
        <el-breadcrumb-item v-model="tracename" :to="{ path: '/' + tracename }">{{tracename}}</el-breadcrumb-item>
        <el-breadcrumb-item>statistics</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
  </el-row>

  <vue-chart chart-type="" :chart-events="chartEvents" :columns="columns" :rows="rows" :options="options">
  </vue-chart>


</div>
</template>

<script>
export default {
  name: 'm2svis-trace-stats',
  data: function() {
    return {
      tracename: "",
      chartEvents: {},
      columns: [],
      rows: [],
      options: {}
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
  width: 100%;
  height: 100%;
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
  margin-left: 10px;
}
</style>
