<template>
<div id="m2s-chart-exec-len" class="container">
  <chart :options="options" class="chart"></chart>
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
          text: 'Cycle: execution complete',
          x: 'center'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'value'
        }],
        yAxis: [{
          type: 'category',
          data: [],
          axisTick: {
            alignWithLabel: true
          }
        }],
        series: [{
          name: 'Cycle',
          type: 'bar',
          data: []
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
  width: inherit;
  height: inherit;
}

.chart {
  flex: 1 1 auto;
  width: 100%;
  height: 100%;
  margin: 20px;
}
</style>
