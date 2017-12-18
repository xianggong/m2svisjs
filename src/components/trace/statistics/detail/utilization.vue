<template>
<div class="container">
  <el-form :model="setting" label-width="50px">
    <el-form-item label="Show">
      <el-col :span="2">
        <el-input v-model="setting.cuTop" placeholder="0">
          <a slot="prepend">cu</a>
        </el-input>
      </el-col>
      <el-col :span="1" style="text-align: center">and</el-col>
      <el-col :span="2">
        <el-input v-model="setting.cuBottom" placeholder="1">
          <a slot="prepend">cu</a>
        </el-input>
      </el-col>
      <el-col :span="5">
        <el-button type="primary" @click="refresh">Refresh</el-button>
      </el-col>
    </el-form-item>
  </el-form>
  <chart :options="charts.options" auto-resize class="chart"></chart>
</div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      setting: {
        cuTop: 0,
        cuBottom: 1
      },
      charts: {
        options: {
          title: {
            text: 'Utilization',
            x: 'center'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            right: "3%",
            // To be loaded
            data: ['Full Active', 'Full Stall', 'Active & Stall'],
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
              gridIndex: 0,
              type: 'category',
              data: ['SIMD0', 'SIMD1', 'SIMD2', 'SIMD3', 'VMem', 'LDS', 'Scalar', 'Branch']
            },
            {
              gridIndex: 1,
              type: 'category',
              data: ['SIMD0', 'SIMD1', 'SIMD2', 'SIMD3', 'VMem', 'LDS', 'Scalar', 'Branch']
            }
          ],
          yAxis: [{
              name: 'Utilization %',
              gridIndex: 0,
              type: 'value',
            },
            {
              name: 'Utilization %',
              gridIndex: 1,
              type: 'value',
            }
          ],
          series: [{
              name: 'Full Active',
              type: 'bar',
              stack: 'Util_top',
              xAxisIndex: 0,
              yAxisIndex: 0,
              data: [22, 5, 0.63, 0.28, 3.7, 92, 29, 20]
            },
            {
              name: 'Active & Stall',
              type: 'bar',
              stack: 'Util_top',
              xAxisIndex: 0,
              yAxisIndex: 0,
              data: [0, 0, 0, 0, 0.19, 0.0065, 0.93, 0]
            },
            {
              name: 'Full Stall',
              type: 'bar',
              stack: 'Util_top',
              xAxisIndex: 0,
              yAxisIndex: 0,
              data: [1.9, 0.69, 0.38, 0.51, 12, 0.12, 2.7, 0]
            },
            {
              name: 'Full Active',
              type: 'bar',
              stack: 'Util_bottom',
              xAxisIndex: 1,
              yAxisIndex: 1,
              data: [22, 5.2, 0.37, 0.46, 2.9, 93, 29, 21]
            },
            {
              name: 'Active & Stall',
              type: 'bar',
              stack: 'Util_bottom',
              xAxisIndex: 1,
              yAxisIndex: 1,
              data: [0, 0, 0, 0, 0.19, 0.0065, 0.93, 0]
            },
            {
              name: 'Full Stall',
              type: 'bar',
              stack: 'Util_bottom',
              xAxisIndex: 1,
              yAxisIndex: 1,
              data: [1.9, 0.69, 0.38, 0.51, 12, 0.12, 2.7, 0]
            },
          ]
        },
      }
    }
  },
  methods: {
    refresh() {

    }
  },
  created() {

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

.chart-top {
  width: 100%;
  height: 50%;
}

.chart-bottom {
  width: 100%;
  height: 50%;
}
</style>
