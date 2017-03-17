<template>
<div class="container">
  <chartPie path="/insts/count/insttype" title="Instruction count" class="chart-cell"></chartPie>
  <chartPie path="/insts/count/execunit" title="Instruction count" class="chart-cell"></chartPie>
  <chartPie path="/cycle/count/insttype" title="Cycle count" class="chart-cell"></chartPie>
  <chartPie path="/cycle/count/execunit" title="Cycle count" class="chart-cell"></chartPie>
</div>
</template>

<script>
import chartPie from '../charts/Pie'
export default {
  components: {
    'chartPie': chartPie,
  },
}
</script>

<style scoped>
.container {
  display: flex;
  flex-flow: row wrap;
  background: #F9FAFC;
  margin: 20px;
}

.chart-cell {
  width: 50%;
  height: 50%;
}
</style>
