<template>
<div id="m2svis-trace-data" class="trace-data">
  <el-row>
    <el-menu theme="dark" mode="horizontal">
      <el-col :span="22">
        <el-menu-item index="1">
          <router-link to="/">Home</router-link>
        </el-menu-item>
      </el-col>
      <el-col :span="2">
        <el-menu-item index="2">
          <el-button type="primary" @click="setting.isVisible = true">Setting</el-button>
          <el-dialog title="Settings" v-model="setting.isVisible">
            <el-tabs v-model="setting.activeName">
              <el-tab-pane label="Columns" name="1">
                <el-select v-model="table.checkedCols" multiple placeholder="Select" style="width: 100%">
                  <el-option v-for="col in table.cols" :label="col" :value="col">
                  </el-option>
                </el-select>
              </el-tab-pane>
              <el-tab-pane label="Other" name="2">Other</el-tab-pane>
            </el-tabs>

          </el-dialog>
        </el-menu-item>
      </el-col>
    </el-menu>
  </el-row>

  <el-table :data="table.data" height="960">
    <el-table-column v-for="col in table.checkedCols" :prop="col" :label="col">
    </el-table-column>
  </el-table>

  <el-row>
    <el-col :span="24">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.page" :page-sizes="pagination.sizes" :page-size="pagination.size" layout="sizes, prev, pager, next, jumper" :total="pagination.total">
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
        total: 400,
        page: 1,
        size: 30,
        sizes: [30, 60, 120, 240]
      },
      setting: {
        activeName: '1',
        isVisible: false,
      }
    }
  },
  methods: {
    getData(params) {
      var app = this;
      var url = "/api/v1/traces/" + app.tracename + "/data"
      axios.get(url, {
          params: params
        })
        .then(function(response) {
          // Get cols
          app.table.cols.length = 0;
          if (!app.table.once) {
            for (var k in response.data[0]) {
              app.table.cols.push(k)
              app.table.checkedCols.push(k);
            };
            app.table.once = true;
          }
          // Get data
          app.table.data.length = 0;
          app.table.data = response.data;
        })
        .catch(function(err) {
          console.log(err)
        })
    },
    handleSizeChange(newSize) {
      this.pagination.size = newSize;
      this.getData(this.pagination)
    },
    handleCurrentChange(newCurrentPage) {
      this.pagination.page = newCurrentPage;
      this.getData(this.pagination)
    }
  },
  created: function() {
    var app = this;
    var tracename = app.$route.params.tracename;
    app.tracename = tracename;
    var url = '/api/v1/traces/' + tracename + '/meta'
    axios.get(url)
      .then(function(response) {
        app.pagination.total = response.data.total;
        app.pagination.page = 1;
        app.pagination.size = 30;
        app.getData(app.pagination)
      })
      .catch(function(err) {
        console.log(err)
      });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.trace-data {
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  flex: 1;
}
</style>
