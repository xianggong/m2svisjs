<template>
<div id="m2svis-trace">
  <el-row class="topbar">
    <div class="topbar-logo">
      <h2>M2S-VIS</h2>
    </div>
    <el-col :span="24" class="topbar-main">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
        <el-breadcrumb-item v-model="tracename">{{tracename}}</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
  </el-row>

  <el-row class="content">
    <el-row>
      <el-col :span="24">
        <h3 v-model="tracename"> {{tracename}} </h3>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <router-link v-model="tracename" :to="'/' + tracename + '/rawdata'">Rawdata Table view</router-link>
      </el-col>
      <el-col :span="8">
        <router-link v-model="tracename" :to="'/' + tracename + '/statistics'">Statistics view</router-link>
      </el-col>
      <el-col :span="8">
        <router-link v-model="tracename" :to="'/' + tracename + '/timeline'">Timeline view</router-link>
      </el-col>
    </el-row>
  </el-row>

</div>
</template>

<script>
export default {
  name: 'm2svis-trace',
  data() {
    return {
      tracename: ""
    }
  },
  created() {
    this.tracename = this.$route.params.tracename;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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

.content {
  margin: 16px;
}
</style>
