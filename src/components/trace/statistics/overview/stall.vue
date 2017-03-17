<template>
<div id="m2svis-chart-stall" class="container">
  <chart :options="options" class="chart"></chart>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'm2svis-chart-stall',
  data() {
    return {
      tracename: '',
      options: {
        title: {
          text: 'Stall count',
          x: 'center'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          top: "3%",
          // To be loaded
          data: [],
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
          axisTick: {
            show: false
          },
          // To be loaded
          data: []
        }],
        // To be loaded
        series: []
      }

    }
  },
  methods: {
    getData() {
      var app = this;
      var url = "/api/v1/traces/" + app.tracename + "/stats/stall/column";
      axios.get(url)
        .then(function(response) {
          let data = response.data;

          // legend and series
          let legend = [];
          let series = [];
          for (var k in data) {
            legend.push(k)
            series.push({
              name: k,
              type: 'bar',
              stack: 'total',
              data: data[k]
            })
          }

          // yAxis
          let yAxis = [];
          for (var i = 0; i < data[legend[0]].length; i++) {
            yAxis.push('cu_' + i.toString());
          }

          // Update chart data
          app.options.yAxis[0].data = yAxis;
          app.options.legend.data = legend;
          app.options.series = series;
        })
        .catch(function(response) {
          console.log(response);
        })
    }
  },
  created() {
    this.tracename = this.$route.params.tracename
    this.getData();
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
