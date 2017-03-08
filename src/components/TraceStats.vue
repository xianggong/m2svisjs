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
      <el-button icon="setting">Setting</el-button>
    </div>
  </el-row>

  <div class="chart-area">
    <chartStall :traceName="tracename"></chartStall>
  </div>

</div>
</template>

<script>
import axios from 'axios'
import chartTraceStall from './Chart/TraceStall'

export default {
  name: 'm2svis-trace-stats',
  components: {
    'chartStall': chartTraceStall
  },
  data() {
    return {
      tracename: "",
      meta: {
        countInsts: 0,
        countStall: 0,
        countWF: 0,
        countWG: 0,
        countCU: 0,
        range: [0, 100],
        min: 0,
        max: 100,
      }
    }
  },
  methods: {
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
          app.meta.min = data.MinCycle;
          app.meta.range[1] = data.MaxCycle;
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

.chart-area {
  display: flex;
  flex-grow: 1;
  /* Expand to remaining screen */
}
</style>
