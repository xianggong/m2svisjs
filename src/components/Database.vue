<template>
  <div id="m2svis-database">
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
export default {
  name: 'm2svis-database',
  data: function() {
    return {
      cols: ["Trace Id", "Trace Name", "Time"],
      rows: [
        {Id:0, Name:"trace0", Time: "Sep 1"},
        {Id:1, Name:"trace1", Time: "Sep 2"},
        {Id:2, Name:"trace2", Time: "Sep 3"},
      ],
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
