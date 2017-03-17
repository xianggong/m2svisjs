<template>
<div id="m2svis-trace-stats" class="container">
  <m2svis-header pageName="statistics"></m2svis-header>

  <div class="content">
    <el-col :span="4" class="left-nav">
      <el-menu default-active="ocycle" router>
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-menu"></i>Overview
</template>
          <el-menu-item index="ocycle">Cycle</el-menu-item>
          <el-menu-item index="ostall">Stall</el-menu-item>
          <el-menu-item index="oinsts">Instructions</el-menu-item>
        </el-submenu>
        <el-submenu index="1">
          <template slot="title">
<i class="el-icon-menu"></i>
Details
</template>
          <el-menu-item index="dinsts">Instructions by cycle</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-col>
      </el-menu>
    </el-col>

    <el-col :span="20" class="chart-area">
      <router-view></router-view>
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
