<template>
<div id="m2svis-trace-data" class="trace-data">

  <md-toolbar class="md-dense">
    <h2 class="md-title" style="flex: 1">Raw Data: {{ tracename }}</h2>
    <md-button @click.native="toggleRightSidenav">Settings</md-button>
  </md-toolbar>

  <md-sidenav class="md-right" ref="rightSidenav">
    <md-toolbar class="md-dense">
      <div class="md-toolbar-container">
        <h3 class="md-title">Settings</h3>
      </div>
    </md-toolbar>

    <md-list>
      <!-- Column selector -->
      <md-list-item>
        <span>Column selector</span>
        <md-list-expand>
          <md-list-item v-for="col,idx in cols">
            <md-checkbox :id="col" :name="col" v-model="colsVisibility[idx]">
              {{col}}
            </md-checkbox>
          </md-list-item>
          <md-list-item>
            <md-button @click.native="setAllVisibility(false)">All clear</md-button>
            <md-button @click.native="setAllVisibility(true)">Reset</md-button>
          </md-list-item>
        </md-list-expand>
      </md-list-item>
      <!-- Advanced filter -->
      <md-list-item>
        <span>Advanced filter</span>
        <md-list-expand>
          <md-list-item>
            <md-input-container>
              <md-input v-model="filterText" placeholder="Enter to submit filter"></md-input>
            </md-input-container>
          </md-list-item>
        </md-list-expand>
      </md-list-item>
    </md-list>

  </md-sidenav>


  <md-table-card class="table-card">
    <md-table>
      <md-table-header>
        <md-table-row>
          <md-table-head v-model="cols" v-for="col in filteredCols()">
            {{ col }}
          </md-table-head>
        </md-table-row>
      </md-table-header>
      <md-table-body>
        <md-table-row v-model="rows" v-for="cells in rows">
          <md-table-cell v-for="cell in filteredCells(cells)">
            {{ cell }}
          </md-table-cell>
        </md-table-row>
      </md-table-body>
    </md-table>
  </md-table-card>

  <span class="pagination-padding-area"></span>
  <md-table-card class="pagination">
    <md-table-pagination md-size="30" md-page="1" md-label="Instruction per page" :md-page-options="[30, 60, 90, 120]" @pagination="getData">
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
      cols: [],
      colsVisibility: [],
      rows: [],
      pagination: {
        page: 1,
        size: 30,
      },
      filterText: "",
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
          app.cols.length = 0;
          for (var k in response.data[0]) {
            app.cols.push(k)
            app.colsVisibility.push(true)
          };
          // Get rows
          app.rows = response.data;
        })
        .catch(function(err) {
          console.log(err)
        })
    },
    toggleRightSidenav() {
      this.$refs.rightSidenav.toggle();
    },
    setAllVisibility: function(value) {
      this.colsVisibility = Array(this.colsVisibility.length).fill(value);
    },
    filteredCols: function() {
      var filteredCols = []
      for (var i = 0; i < this.cols.length; i++) {
        if (this.colsVisibility[i]) {
          filteredCols.push(this.cols[i])
        }
      }
      return filteredCols;
    },
    filteredCells: function(cells) {
      var clonedCells = JSON.parse(JSON.stringify(cells));
      var idx = 0;
      for (var prop in clonedCells) {
        if (!this.colsVisibility[idx]) {
          delete clonedCells[prop];
        }
        idx++;
      }
      return clonedCells
    }
  },
  created: function() {
    this.tracename = this.$route.params.tracename;
    this.getData({
      page: 1,
      size: 30
    })
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

.filter-input {
  width: 256px;
}

.pagination-padding-area {
  padding-bottom: 56px
}

.pagination {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
