<template>
<div name="m2svis-chart-pie">
  <chart :options="options" class="chart"></chart>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'm2svis-chart-pie',
  props: {
    path: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      tracename: '',
      options: {
        title: {
          text: '', // Init in created hook
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          top: '6%',
          data: [] // Init in methods hook
        },
        series: [{
          name: 'Count',
          type: 'pie',
          radius: '60%',
          center: ['50%', '55%'],
          data: [], // Init in methods
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      }
    }
  },
  methods: {
    getData() {
      var app = this;
      var url = "/api/v1/traces/" + app.tracename + app.path;
      axios.get(url)
        .then(function(response) {
          let data = response.data;

          // legend and series
          let legend = [];
          let series = [];
          for (var k in data) {
            if (data[k] != 0) {
              legend.push(k)
              series.push({
                value: data[k],
                name: k
              })
            }
          }

          app.options.legend.data = legend;
          app.options.series[0].data = series;
        })
        .catch(function(response) {
          console.log(response);
        })
    }
  },
  created() {
    this.tracename = this.$route.params.tracename;
    this.options.title.text = this.title;
    this.getData();
  }
}
</script>

<style scoped>
.chart {
  width: 100%;
  height: 100%;
  margin: auto;
}
</style>
