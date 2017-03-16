<template>
<div id="m2svis-trace-stats" class="container">
  <m2svis-header pageName="statistics"></m2svis-header>

  <div class="content">
    <el-col :span="4" class="left-nav">
      <el-menu default-active="overview" router>
        <el-menu-item index="overview">Overview</el-menu-item>
        <el-menu-item index="stall">Stall</el-menu-item>
        <el-menu-item index="instructions">Instructions</el-menu-item>
      </el-menu>
    </el-col>

    <el-col :span="20" class="chart-area">
      <transition name="move" mode="out-in">
        <router-view></router-view>
      </transition>
    </el-col>
  </div>

</div>
</template>

<script>
import Header from '../common/Header'

export default {
  name: 'm2svis-trace-stats',
  components: {
    'm2svis-header': Header,
  },
  computed: {
    onRoutes() {
      return this.$route.path
    }
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

.content {
  display: flex;
  flex-flow: row wrap;
  flex-grow: 1;
}

.left-nav {
  background: #E5E9F2;
}

.chart-area {
  display: flex;
  flex-flow: row wrap;
  background: #F9FAFC;
}
</style>
