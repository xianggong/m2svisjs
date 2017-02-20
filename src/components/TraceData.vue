<template>
  <div id="m2svis-trace-data" class="trace-data">

    <md-toolbar class="md-dense">
      <h2 class="md-title" style="flex: 1">Raw Data: {{ tracename }}</h2>
      <md-button class="md-icon-button">
        <md-icon>filter_list</md-icon>
      </md-button>
    </md-toolbar>

    <md-table-card class="table-body">
      <md-table>
        <md-table-header>
          <md-table-row>
            <md-table-head v-model="cols" v-for="col in cols">
              {{ col }}
            </md-table-head>
          </md-table-row>
        </md-table-header>
        <md-table-body>
          <md-table-row v-model="rows" v-for="db in rows">
            <md-table-cell v-for="val in db">
              {{ val }}
            </md-table-cell>
          </md-table-row>
        </md-table-body>
      </md-table>
    </md-table-card>

    <span class="pagination-padding-area"></span>
    <md-table-card class="pagination">
      <md-table-pagination md-size="30"
        md-page="1"
        md-label="Instruction per page"
        :md-page-options="[30, 60, 90, 120]"
        @pagination="getData">
      </md-table-pagination>
    </md-table-card>
    </div>
</template>

<script>
import Toolbar from "./Toolbar"
import axios from 'axios'

export default {
  name: 'm2svis-trace-data',
  components: {
    'm2svis-toolbar': Toolbar,
  },
  data: function() {
    return {
      tracename: "",
      cols:[],
      rows:[],
      pagination: {
        page: 1,
        size: 30,
      }
    }
  },
  methods: {
    getData: function(info) {
      this.pagination.page = info.page;
      this.pagination.size = info.size;
      var app = this;
      var tracename = this.$route.params.tracename;

      var url = ""
      if (process.env.NODE_ENV !== 'production') {
        url = "https://api.myjson.com/bins/kxqtd"
      } else {
        url = "/api/v1/traces/" + tracename + "/json?page=" + this.pagination.page + "&pagesize=" + this.pagination.size
      }
      axios.get(url)
        .then(function(response) {
          // Get cols
          var keys = [];
          for(var k in response.data[0]) keys.push(k);
          app.cols = keys;
          // Get rows
          app.rows = response.data;
        })
        .catch(function (err) {
          console.log(err)
        })
    }
  },
  created: function() {
    this.tracename = this.$route.params.tracename;
    this.getData({page:1, size:30})
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.trace-data {
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  flex: 1;
}
.pagination-padding-area {
  padding-bottom: 56px
}
.pagination {
  position:absolute;
  bottom:0;
  width:100%;
}
</style>
