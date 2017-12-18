<template>
<div class="container">
  <chart :options="options.top" auto-resize class="chart-top"></chart>
  <chart :options="options.bottom" auto-resize class="chart-bottom"></chart>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'instruction-overview',
  data() {
    return {
      tracename: '',
      options: {
        // Top chart
        top: {
          title: [{
            text: 'Instruction Count',
            x: '25%',
            textAlign: 'center'
          }, {
            text: 'Accumulative Cycle',
            x: '75%',
            textAlign: 'center'
          }],
          tooltip: [{
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          }],
          legend: {
            bottom: "2%",
            data: []
          },
          series: [{
            name: 'Instruction Count',
            type: 'pie',
            radius: '70%',
            center: ['25%', '50%'],
            data: []
          }, {
            name: 'Accumulative Cycle',
            type: 'pie',
            radius: '70%',
            center: ['75%', '50%'],
            data: []
          }]
        },
        bottom: {
          title: {
            text: 'Instruction length',
            x: '50%',
            textAlign: 'center'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            formatter: ""
          },
          legend: {
            right: '4%',
            data: []
          },
          grid: {
            left: '3%',
            right: '4%',
            top: '10%',
            bottom: '10%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: []
          },
          yAxis: {
            name: 'Cycles',
            type: 'value'
          },
          series: []
        }
      }
    }
  },
  methods: {
    getDataInstructionType() {
      let url = "/api/v1/traces/" + this.tracename + "/insts/type";
      return axios.get(url);
    },
    getDataInstructionCount() {
      let url = "/api/v1/traces/" + this.tracename + "/insts/count/insttype";
      return axios.get(url);
    },
    getDataInstructionCycle() {
      let url = "/api/v1/traces/" + this.tracename + "/cycle/count/insttype";
      return axios.get(url);
    },
    getDataInstructionLength() {
      let url = "/api/v1/traces/" + this.tracename + "/insts/length/insttype";
      return axios.get(url);
    },
    getData() {
      var app = this;
      axios.all([
          app.getDataInstructionType(),
          app.getDataInstructionCount(),
          app.getDataInstructionCycle(),
          app.getDataInstructionLength(),
        ])
        .then(axios.spread(function(type, count, cycle, length) {
          let dataCount = count.data;
          let dataCycle = cycle.data;

          // Top chart
          let legend = [];
          let seriesInsts = [];
          let seriesCycle = [];
          for (var k in dataCount) {
            if (dataCount[k] != 0) {
              legend.push(k);
              seriesInsts.push({
                value: dataCount[k],
                name: k
              });
              seriesCycle.push({
                value: dataCycle[k],
                name: k
              });
            }
          }
          app.options.top.legend.data = legend;
          app.options.top.series[0].data = seriesInsts;
          app.options.top.series[1].data = seriesCycle;

          // Bottom chart
          let dataType = type.data;
          let dataLength = length.data;

          app.options.bottom.legend.data = Object.keys(dataLength);
          app.options.bottom.xAxis.data = dataType;
          for (var key in dataLength) {
            app.options.bottom.series.push({
              name: key,
              type: 'bar',
              data: dataLength[key],
              label: {
                normal: {
                  show: true,
                  position: 'top'
                }
              }
            })
          }
        }))
        .catch(function(response) {
          console.log(response);
        });
    }
  },
  created() {
    this.tracename = this.$route.params.tracename;
    this.getData()
  }

}
</script>

<style scoped>
.container {
  display: flex;
  flex-flow: row wrap;
  background: #F9FAFC;
  margin: 20px;
}

.chart-top {
  width: 100%;
  height: 50%;
}

.chart-bottom {
  width: 100%;
  height: 50%;
}
</style>
