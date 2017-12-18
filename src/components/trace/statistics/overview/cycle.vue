<template>
<div id="m2s-chart-exec-len" class="container">
  <chart :options="options" auto-resize class="chart"></chart>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'm2s-chart-exec-len',
  // Options / Data
  data() {
    return {
      tracename: "",
      // Chart options
      options: {
        title: {
          text: 'Execution cycle',
          x: 'center'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '2%',
          right: '8%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'value'
        }],
        yAxis: [{
          type: 'category',
          data: [],
        }],
        series: [{
          name: 'Cycle',
          type: 'bar',
          data: [],
          markPoint: {
            symbol: 'diamond',
            symbolOffset: [50, 0],
            data: [{
                type: 'max',
                name: 'Max'
              },
              {
                type: 'min',
                name: 'Min'
              }
            ]
          },
          label: {
            normal: {
              show: true,
            }
          },
        }]
      }
    }
  },
  methods: {
    getData() {
      var app = this;
      var url = "/api/v1/traces/" + app.tracename + "/cycle/count/cu";
      axios.get(url)
        .then(function(response) {
          var data = response.data;
          var keys = [];
          var vals = [];
          for (var key in data) {
            keys.push("cu_" + key);
            vals.push(data[key])
          }
          app.options.yAxis[0].data = keys;
          app.options.series[0].data = vals;
        })
        .catch(function(response) {
          console.log(response);
        })
    }
  },
  created() {
    this.tracename = this.$route.params.tracename;
    this.getData()
  },
}
</script>

<style scoped>
.container {
  flex: 1 1 auto;
  width: 100%;
  height: 100%;
}

.chart {
  flex: 1 1 auto;
  width: 100%;
  height: 100%;
  margin: 20px;
}
</style>
