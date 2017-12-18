<template>
<div class="container">
  <el-form :model="setting" label-width="50px">
    <el-form-item label="From">
      <el-col :span="3">
        <el-input v-model="setting.start" :disabled="setting.refresh.disabled">
          <a slot="prepend">cycle</a>
        </el-input>
      </el-col>
      <el-col :span="1" style="text-align: center">to</el-col>
      <el-col :span="3">
        <el-input v-model="setting.finish" :disabled="setting.refresh.disabled">
          <a slot="prepend">cycle</a>
        </el-input>
      </el-col>
      <el-col :span="1" style="text-align: center">with</el-col>
      <el-col :span="3">
        <el-input v-model="setting.windowSize" :disabled="setting.refresh.disabled" placeholder="1">
          <a slot="prepend">bin size</a>
        </el-input>
      </el-col>
      <el-col :span="2" style="text-align: center">display</el-col>
      <el-col :span="2">
        <el-input v-model="setting.cuTop" :disabled="setting.refresh.disabled" placeholder="0">
          <a slot="prepend">cu</a>
        </el-input>
      </el-col>
      <el-col :span="1" style="text-align: center">and</el-col>
      <el-col :span="2">
        <el-input v-model="setting.cuBottom" :disabled="setting.refresh.disabled" placeholder="1">
          <a slot="prepend">cu</a>
        </el-input>
      </el-col>
      <el-col :span="1" style="text-align: center">&nbsp</el-col>
      <el-col :span="5">
        <el-button-group>
          <el-button type="primary" @click="prevRange" :disabled="setting.refresh.disabled" icon="arrow-left"></el-button>
          <el-button type="primary" @click="nextRange" :disabled="setting.refresh.disabled" icon="arrow-right"></el-button>
          <el-button type="primary" @click="refresh" :disabled="setting.refresh.disabled">{{setting.refresh.text}}</el-button>
        </el-button-group>
      </el-col>
    </el-form-item>
  </el-form>
  <chart :options="options" auto-resize ref="bar" class="chart"></chart>
</div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      tracename: '',
      meta: {
        length: 0,
        cu: [],
      },
      setting: {
        visible: true,
        start: 1,
        finish: 1000,
        windowSize: 1,
        cuTop: 0,
        cuBottom: 1,
        prevRange: {
          disabled: false,
        },
        nextRange: {
          disabled: false,
        },
        immediate: false,
        refresh: {
          text: 'Refresh',
          disabled: false,
        }
      },
      options: {
        tooltip: {
          trigger: 'axis',
          confine: true,
          axisPointer: {
            type: 'shadow'
          }
        },
        title: {
          text: 'Active instructions',
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: {},
          }
        },
        legend: {
          data: [],
        },
        grid: [{
            left: 50,
            right: 50,
            height: '35%'
          },
          {
            left: 50,
            right: 50,
            top: '55%',
            height: '35%'
          }
        ],
        xAxis: [{
            name: 'Cycle',
            gridIndex: 0,
            type: 'category',
            data: [],
          },
          {
            name: 'Cycle',
            gridIndex: 1,
            type: 'category',
            data: []
          }
        ],
        yAxis: [{
            name: 'Count',
            gridIndex: 0,
            type: 'value',
          },
          {
            name: 'Count',
            gridIndex: 1,
            type: 'value',
          }
        ],
        dataZoom: [{
            type: 'inside',
            start: 0,
            end: 10,
            xAxisIndex: [0, 1]
          },
          {
            start: 0,
            end: 10,
            xAxisIndex: [0, 1]
          },
        ],
        series: []
      }
    }
  },
  methods: {
    getTraceMeta() {
      var app = this;
      var url = "/api/v1/traces/" + app.tracename + "/meta";
      axios.get(url)
        .then(function(response) {
          let data = response.data;
          app.meta.minCycle = data.MinCycle;
          app.meta.maxCycle = data.MaxCycle;
          app.meta.numCU = data.CountCU;
          app.setting.start = data.MinCycle;
          app.setting.finish = data.MinCycle + 1000;
        })
        .catch(function(response) {
          console.log(response);
        })
    },
    getTopData() {
      var app = this;
      var url = "/api/v1/traces/" + app.tracename + "/insts/active";

      let params = {
        start: app.setting.start,
        finish: app.setting.finish,
        windowSize: app.setting.windowSize,
        cu: app.setting.cuTop,
      };
      axios.get(url, {
          params
        })
        .then(function(response) {
          let data = response.data;

          // Setup xAxis
          app.options.xAxis[0].data = data.Cycle;

          // Setup series
          for (var key in data) {
            if (key != "Cycle") {
              app.options.legend.data.push(key);
              let obj = {
                name: key,
                type: 'bar',
                stack: 'top',
                animation: false,
                xAxisIndex: 0,
                yAxisIndex: 0,
                data: data[key],
              }
              app.options.series.push(obj);
            }
          }
        })
        .catch(function(response) {
          console.log(response);
        })
    },
    getBottomData() {
      var app = this;
      var url = "/api/v1/traces/" + app.tracename + "/insts/active";

      let params = {
        start: app.setting.start,
        finish: app.setting.finish,
        windowSize: app.setting.windowSize,
        cu: app.setting.cuBottom,
      };

      axios.get(url, {
          params
        })
        .then(function(response) {
          let data = response.data;

          // Setup xAxis
          app.options.xAxis[1].data = data.Cycle;

          // Setup series
          for (var key in data) {
            if (key != "Cycle") {
              let obj = {
                name: key,
                type: 'bar',
                stack: 'bottom',
                animation: false,
                xAxisIndex: 1,
                yAxisIndex: 1,
                data: data[key],
              }
              app.options.series.push(obj);
            }
          }

          app.setting.refresh.text = "Refresh";
          app.setting.refresh.disabled = false;

          let bar = app.$refs.bar;
          bar.hideLoading();
        })
        .catch(function(response) {
          console.log(response);
        })
    },
    getData() {
      let bar = this.$refs.bar
      bar.showLoading({
        text: 'Loading',
        color: '#4ea397',
        maskColor: 'rgba(255, 255, 255, 0.4)'
      })

      this.setting.refresh.disabled = true;
      this.setting.refresh.text = "Loading...";

      this.options.legend.data = [];
      this.options.series = [];
      this.getTopData();
      this.getBottomData();
    },
    refresh() {
      this.getData();
    },
    nextRange() {
      let start = this.setting.start;
      let finish = this.setting.finish;
      let maxCycle = this.meta.maxCycle;
      let rangeLen = finish * 1 - start * 1 + 1;

      let next_start = start * 1 + rangeLen;
      let next_finish = finish * 1 + rangeLen;

      next_start = next_start <= 0 ? 1 : next_start;
      next_start = next_start >= maxCycle ? start : next_start;
      next_finish = next_finish <= 0 ? finish : next_finish;
      next_finish = next_finish >= maxCycle ? maxCycle : next_finish;

      this.setting.start = next_start;
      this.setting.finish = next_finish;
    },
    prevRange() {
      let start = this.setting.start;
      let finish = this.setting.finish;
      let maxCycle = this.meta.maxCycle;
      let rangeLen = finish * 1 - start * 1 + 1;

      let next_start = start * 1 - rangeLen;
      let next_finish = finish * 1 - rangeLen;

      next_start = next_start <= 0 ? 1 : next_start;
      next_start = next_start >= maxCycle ? maxCycle : next_start;
      next_finish = next_finish <= 0 ? finish : next_finish;
      next_finish = next_finish >= maxCycle ? maxCycle : next_finish;

      this.setting.start = next_start;
      this.setting.finish = next_finish;
    }
  },
  created() {
    this.tracename = this.$route.params.tracename;
    this.getTraceMeta();
  }
}
</script>

<style scoped>
.container {
  flex: 1 1 auto;
  width: inherit;
  height: inherit;
  margin: 20px;
}

.chart {
  flex: 1 1 auto;
  width: 100%;
  height: 100%;
}
</style>
