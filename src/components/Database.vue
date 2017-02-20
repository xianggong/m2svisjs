<template>
  <div id="m2svis-database">
    <md-card>
      <md-table>
        <!--Columns-->
        <md-table-header>
          <md-table-row>
            <md-table-head v-for="col in cols">{{col}}</md-table-head>
          </md-table-row>
        </md-table-header>
        <!--Rows-->
        <md-table-body>
          <md-table-row v-for="db in rows">
            <md-table-cell>
              {{db.table_name}}
              <router-link :to="db.table_name + '/rawdata'">raw data</router-link>
              <router-link :to="db.table_name + '/statistics'">statistics</router-link>
              <router-link :to="db.table_name + '/timeline'">timeline</router-link>
            </md-table-cell>
            <md-table-cell> {{db.table_rows}} </md-table-cell>
            <md-table-cell> {{db.create_time}} </md-table-cell>
          </md-table-row>
        </md-table-body>
      </md-table>
    </md-card>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'm2svis-database',
  data: function() {
    return {
      cols: ["Trace Name", "# of Instructions", "Create Time"],
      rows: [],

    }
  },
  created: function() {
    var app = this;
    axios.get("/api/v1/traces/json")
      .then(function(response) {
        // Get rows
        app.rows = response.data;
      })
      .catch(function (err) {
        console.log(err)
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
