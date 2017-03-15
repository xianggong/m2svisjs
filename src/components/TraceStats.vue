<template>
<div id="m2svis-trace-stats" class="container">
  <el-row class="topbar">
    <div class="topbar-logo">
      <h2>M2S-VIS</h2>
    </div>
    <el-col :span="12" class="topbar-main">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
        <el-breadcrumb-item v-model="tracename" :to="{ path: '/' + tracename }">{{tracename}}</el-breadcrumb-item>
        <el-breadcrumb-item>statistics</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <div class="setting">
      <el-popover ref="range" placement="bottom" width="400" trigger="hover" class="range">
        <el-slider v-model="meta.range" range :min="meta.min" :max="meta.max" class="range-slider"></el-slider>
      </el-popover>
      <el-button v-model="meta" v-popover:range type="primary">Range: {{meta.range[0]}} - {{meta.range[1]}}</el-button>
    </div>
  </el-row>

  <el-row class="content">
    <el-col :span="4" class="left-nav">
      <el-menu default-active="1">
        <el-menu-item index="1">Pie Charts</el-menu-item>
        <el-menu-item index="2">Bar Charts</el-menu-item>
        <el-menu-item index="3">Setting</el-menu-item>
      </el-menu>
    </el-col>

    <el-col :span="20" class="chart-area">
      <!-- <chartStall :traceName="tracename" style="width: 50%"></chartStall> -->
      <!-- <chartInstCount :traceName="tracename" :start="meta.range[0]" :finish="meta.range[1]" :cu=1></chartInstCount> -->
      <!-- <chartExecLen style="width: 50%"></chartExecLen> -->
      <chartPie path="/instruction/count/insttype" title="Count: instructions type" class="chart-cell"></chartPie>
      <chartPie path="/instruction/count/execunit" title="Count: execution unit" class="chart-cell"></chartPie>
      <chartPie path="/cycle/count/insttype" title="Cycle: instruction type" class="chart-cell"></chartPie>
      <chartPie path="/cycle/count/execunit" title="Cycle: execution unit" class="chart-cell"></chartPie>
    </el-col>
  </el-row>

</div>
</template>

<script>
import axios from 'axios'
import chartStatsStall from './Chart/StatsStall'
import chartInstCount from './Chart/InstructionCount'
import chartExecLen from './Chart/TraceExecLen'
import chartPie from './Chart/TracePie'

export default {
  name: 'm2svis-trace-stats',
  components: {
    'chartStall': chartStatsStall,
    'chartInstCount': chartInstCount,
    'chartExecLen': chartExecLen,
    'chartPie': chartPie,
  },
  data() {
    return {
      tracename: "",
      activeChart: "overview",
      meta: {
        countInsts: 0,
        countStall: 0,
        countWF: 0,
        countWG: 0,
        countCU: 0,
        range: [0, 10],
        min: 0,
        max: 10,
      }
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    getTraceMeta() {
      var app = this;
      var url = "/api/v1/traces/" + app.tracename + "/meta";
      axios.get(url)
        .then(function(response) {
          let data = response.data
          app.meta.countInsts = data.CountInsts;
          app.meta.countStall = data.CountStall;
          app.meta.countWF = data.CountWF;
          app.meta.countWG = data.CountWG;
          app.meta.countCU = data.CountCU;
          app.meta.range[0] = data.MinCycle;
          app.meta.range[1] = data.MaxCycle;
          app.meta.min = data.MinCycle;
          app.meta.max = data.MaxCycle;
        })
        .catch(function(response) {
          console.log(response);
        })
    },
  },
  created() {
    this.tracename = this.$route.params.tracename;
    this.getTraceMeta();
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

.setting {
  display: flex;
  flex-flow: row nowrap;
  flex: 1;
  justify-content: flex-end;
  margin-left: 4px;
  margin-right: 4px;
}

.range-slider {
  margin-left: 20px;
  margin-right: 20px;
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

.chart-cell {
  padding-top: 10px;
  width: 50%;
  height: 50%;
}
</style>
