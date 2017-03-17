<template>
<div class="container">
  <chart :options="options" class="chart"></chart>
</div>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    start: {
      type: Number,
      default: 1,
    },
    finish: {
      type: Number,
      default: 1000,
    },
    windowSize: {
      type: Number,
      default: 0
    },
    cu: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      tracename: '',
      options: {
        tooltip: {
          trigger: 'axis',
          confine: true,
          position: function(pt) {
            return [pt[0], '10%'];
          }
        },
        title: {
          text: 'Number of unfinished instructions',
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: {},
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: []
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%']
        },
        dataZoom: [{
          type: 'inside',
          start: 0,
          end: 10
        }, {
          start: 0,
          end: 10,
        }],
        series: [{
          name: 'Count of instructions',
          type: 'line',
          smooth: true,
          symbol: 'none',
          sampling: 'average',
          itemStyle: {
            normal: {
              color: 'rgb(255, 70, 131)'
            }
          },
          data: []
        }]
      }
    }
  },
  methods: {
    getParams() {
      var params = {
        start: this.start,
        finish: this.finish,
        windowSize: this.windowSize,
        cu: this.cu
      }

      return params;
    },
    getData() {
      var app = this;
      var url = "/api/v1/traces/" + app.tracename + "/instruction/active";

      var params = this.getParams();

      axios.get(url, {
          params
        })
        .then(function(response) {
          let data = response.data;
          app.options.xAxis.data = data.cycle
          app.options.series[0].data = data.count;
        })
        .catch(function(response) {
          console.log(response);
        })
    }
  },
  created() {
    this.tracename = this.$route.params.tracename;
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
