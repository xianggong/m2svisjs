<template>
<div id="m2svis-trace-data" class="container">
  <el-row class="topbar">
    <div class="topbar-logo">
      <h2>M2S-VIS</h2>
    </div>
    <el-col :span="20" class="topbar-main">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
        <el-breadcrumb-item v-model="tracename" :to="{ path: '/' + tracename }">{{tracename}}</el-breadcrumb-item>
        <el-breadcrumb-item>rawdata</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <el-col :span="4" class="topbar-setting">
      <el-button type="primary" @click="setting.isVisible = true">Setting</el-button>
    </el-col>
  </el-row>

  <el-dialog title="Settings" v-model="setting.isVisible">
    <el-tabs v-model="setting.activeName">
      <el-tab-pane label="Columns" name="columns">
        <el-select v-model="table.checkedCols" multiple placeholder="Select" style="width: 100%">
          <el-option v-for="col in table.cols" :label="col" :value="col">
          </el-option>
        </el-select>
      </el-tab-pane>
      <el-tab-pane label="SQL filter" name="sqlFilter">
        <el-input type="textarea" :rows="6" v-model="setting.filters"></el-input>
        <div style="margin: 20px 0;"></div>
        <el-button type="primary" @click="handleSQLFilterChange">Submit</el-button>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>

  <el-table :data="table.data" height="960" border>
    <el-table-column v-for="col in table.checkedCols" v-if="col != 'Asm'" :prop="col" :label="col"></el-table-column>
    <el-table-column v-else :prop="col" label="[WG-WF] instruction" show-overflow-tooltip width="300px" fixed="left"></el-table-column>
  </el-table>

  <el-row>
    <el-col :span="24" class="pagination ">
      <el-pagination @size-change="handleSizeChange" @current-change="handlePageChange" :current-page="pagination.page " :page-sizes="pagination.sizes " :page-size="pagination.size " layout="sizes, prev, pager, next, jumper " :total="pagination.total ">
      </el-pagination>
    </el-col>
  </el-row>

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
      table: {
        once: false,
        cols: [],
        checkedCols: [],
        data: [],
      },
      pagination: {
        total: 0,
        page: 1,
        size: 30,
        sizes: [30, 60, 120, 240]
      },
      setting: {
        activeName: 'columns',
        isVisible: false,
        filters: ''
      },
    }
  },
  methods: {
    getParams() {
      return {
        page: this.pagination.page,
        size: this.pagination.size,
        filters: this.setting.filters
      };
    },
    getCount(params) {
      var app = this;
      var url = "/api/v1/traces/" + app.tracename + "/count";
      axios.get(url, {
          params: params
        })
        .then(function(response) {
          app.pagination.total = response.data.count;
        })
        .catch(function(response) {
          console.log(err);
        })
    },
    getData(params) {
      var app = this;
      var url = "/api/v1/traces/" + app.tracename + "/data";
      axios.get(url, {
          params: params
        })
        .then(function(response) {
          // Get cols
          if (!app.table.once) {
            for (var k in response.data[0]) {
              app.table.cols.push(k);
              app.table.checkedCols.push(k);
            };
            app.table.once = true;
          }
          // Get data
          app.table.data = response.data;
        })
        .catch(function(err) {
          console.log(err);
        })
    },
    handleSizeChange(newSize) {
      this.pagination.size = newSize;
      this.getCount(this.getParams());
      this.getData(this.getParams());
    },
    handlePageChange(newPage) {
      this.pagination.page = newPage;
      this.getCount(this.getParams());
      this.getData(this.getParams());
    },
    handleSQLFilterChange() {
      this.getCount(this.getParams());
      this.getData(this.getParams());
    }
  },
  created: function() {
    this.tracename = this.$route.params.tracename;
    this.pagination.page = 1;
    this.pagination.size = 30;
    this.getCount(this.getParams());
    this.getData(this.getParams());
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  flex: 1;
}

.topbar {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  flex-shrink: 0;
  height: 48px;
  background: #324057;
}

.topbar-logo {
  padding-left: 10px;
  color: white
}

.topbar-main {
  flex: 1;
  flex-flow: column nowrap;
  margin-left: 10px;
}

.topbar-setting {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  margin-right: 6px;
}

.pagination {
  display: flex;
  flex: 1;
  justify-content: flex-end;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
