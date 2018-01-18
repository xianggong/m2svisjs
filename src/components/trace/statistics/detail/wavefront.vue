<template>
<div class="container">
  <chart :options="charts.options" auto-resize class="chart"></chart>
</div>
</template>

<script>
import axios from 'axios'
import {
  graphic
} from 'echarts/lib/export'

export default {
  data() {
    return {
      setting: {},
      charts: {
        options: {
          title: {
            text: 'Wavefront Timeline',
            x: 'center'
          },
          tooltip: {
            formatter: function(params) {
              var duration = params.value[3] - params.value[2];
              return 'WF ' + params.value[1] + ': ' + duration + ' clk';
            }
          },
          legend: {
            data: ['bar', 'error']
          },
          dataZoom: [{
            type: 'slider',
            filterMode: 'weakFilter',
            showDataShadow: false,
            top: 850,
            height: 10,
            borderColor: 'transparent',
            backgroundColor: '#e2e2e2',
            handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z', // jshint ignore:line
            handleSize: 20,
            handleStyle: {
              shadowBlur: 6,
              shadowOffsetX: 1,
              shadowOffsetY: 2,
              shadowColor: '#aaa'
            },
            labelFormatter: ''
          }, {
            type: 'inside',
            filterMode: 'weakFilter'
          }],
          grid: {
            height: 750
          },
          xAxis: {
            min: 0,
            scale: true,
            axisLabel: {
              formatter: function(val) {
                return Math.max(0, val - 0) + ' clk';
              }
            }
          },
          yAxis: {
            data: []
          },
          series: [{
            type: 'custom',
            renderItem: function renderItem(params, api) {
              var categoryIndex = api.value(0);
              var start = api.coord([api.value(2), categoryIndex]);
              var end = api.coord([api.value(3), categoryIndex]);
              var height = api.size([0, 1])[1] * 0.6;

              return {
                type: 'rect',
                shape: graphic.clipRectByRect({
                  x: start[0],
                  y: start[1] - height / 2,
                  width: end[0] - start[0],
                  height: height
                }, {
                  x: params.coordSys.x,
                  y: params.coordSys.y,
                  width: params.coordSys.width,
                  height: params.coordSys.height
                }),
                style: api.style()
              };
            },
            itemStyle: {
              normal: {
                opacity: 0.8
              }
            },
            encode: {
              x: [2, 3],
              y: 0
            },
            data: []
          }]
        },
      }
    }
  },
  methods: {
    getData() {
      this.charts.options.yAxis.data = ['cu0', 'cu1', 'cu2', 'cu3', 'cu4', 'cu5', 'cu6', 'cu7', 'cu8', 'cu9']
      this.charts.options.series[0].data = [
        [0, 0, 1950, 6131],
        [0, 10, 1950, 6143],
        [0, 20, 6132, 9947],
        [0, 21, 6144, 9961],
        [0, 49, 9948, 13667],
        [0, 50, 9962, 13704],
        [1, 1, 1950, 6157],
        [1, 11, 1950, 6158],
        [1, 22, 6158, 10004],
        [1, 23, 6159, 10021],
        [1, 53, 10005, 13731],
        [1, 56, 10022, 13812],
        [2, 2, 1950, 6158],
        [2, 12, 1950, 6173],
        [2, 24, 6159, 9878],
        [2, 28, 6174, 10023],
        [2, 41, 9879, 13642],
        [2, 57, 10024, 13787],
        [3, 3, 1950, 6177],
        [3, 13, 1950, 6184],
        [3, 31, 6178, 9934],
        [3, 34, 6185, 10002],
        [3, 46, 9935, 13648],
        [3, 52, 10003, 13755],
        [4, 4, 1950, 6183],
        [4, 14, 1950, 6192],
        [4, 32, 6184, 9906],
        [4, 38, 6193, 10009],
        [4, 45, 9907, 13585],
        [4, 55, 10010, 13733],
        [4, 61, 13586, 17268],
        [5, 5, 1950, 6169],
        [5, 15, 1950, 6175],
        [5, 26, 6170, 9898],
        [5, 29, 6176, 10030],
        [5, 43, 9899, 13595],
        [5, 58, 10031, 13849],
        [5, 63, 13596, 17415],
        [6, 6, 1950, 6162],
        [6, 16, 1950, 6176],
        [6, 25, 6163, 9882],
        [6, 30, 6177, 9943],
        [6, 42, 9883, 13586],
        [6, 48, 9944, 13692],
        [6, 62, 13587, 17410],
        [7, 7, 1950, 6185],
        [7, 17, 1950, 6191],
        [7, 35, 6186, 9979],
        [7, 37, 6192, 10032],
        [7, 51, 9980, 13697],
        [7, 59, 10033, 13843],
        [8, 8, 1950, 6172],
        [8, 18, 1950, 6183],
        [8, 27, 6173, 9905],
        [8, 33, 6184, 9942],
        [8, 44, 9906, 13578],
        [8, 47, 9943, 13669],
        [8, 60, 13579, 17262],
        [9, 9, 1950, 6187],
        [9, 19, 1950, 6202],
        [9, 36, 6188, 9855],
        [9, 39, 6203, 10004],
        [9, 40, 9856, 13649],
        [9, 54, 10005, 13750],
      ]
    },
  },
  created() {
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
