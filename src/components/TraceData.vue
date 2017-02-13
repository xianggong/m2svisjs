<template>
  <div id="m2svis-trace-data">
    <m2svis-toolbar></m2svis-toolbar>

    <md-card>
      <md-table>
        <!--Columns-->
        <md-table-header>
          <md-table-row>
            <md-table-head v-for="col in cols">{{ col }}</md-table-head>
          </md-table-row>
        </md-table-header>
        <!--Rows-->
        <md-table-body>
          <md-table-row v-for="db in rows">
            <md-table-cell v-for="val in db"> {{val}} </md-table-cell>
          </md-table-row>
        </md-table-body>
      </md-table>
    </md-card>
    
  </div>
</template>

<script>
import Toolbar from "./Toolbar"

export default {
  name: 'm2svis-trace-data',
  components: {
    'm2svis-toolbar': Toolbar,
  },
  data: function() {
    return {
      cols:[],
      rows:[],
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
filter {
  margin-left: 20px
}
</style>
