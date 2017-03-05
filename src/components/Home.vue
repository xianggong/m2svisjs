<template>
<div id="home" class="container">
  <el-row class="topbar">
    <el-col :span="24" class="topbar-main">
      <h2>M2S-VIS</h2>
    </el-col>
  </el-row>

  <el-table :data="table.data" height="960" border>
    <el-table-column prop="table_name" label="Table Name"></el-table-column>
    <el-table-column label="Visualization Options">
      <template scope="scope">
        <router-link :to="scope.row.table_name + '/rawdata'">Rawdata</router-link>
        <router-link :to="scope.row.table_name + '/statistics'">Statistics</router-link>
        <router-link :to="scope.row.table_name + '/timeline'">Timeline</router-link>
</template>
    </el-table-column>
    <el-table-column prop="table_rows" label="# of instructions"></el-table-column>
    <el-table-column prop="create_time" label="Create Time"></el-table-column>
  </el-table>

  <el-row>
    <el-col :span="24" class="pagination">
      <el-pagination @size-change="handleSizeChange"
        @current-change="handlePageChange"
        :current-page="pagination.page "
        :page-sizes="pagination.sizes "
        :page-size="pagination.size "
        layout="sizes, prev, pager, next, jumper "
        :total="pagination.total ">
      </el-pagination>
    </el-col>
  </el-row>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'home',
  data() {
    return {
      table: {
        data: [],
      },
      pagination: {
        total: 0,
        page: 1,
        size: 30,
        sizes: [30, 60, 120, 240]
      },
    }
  },
  methods: {
    getData() {

    },
    handleSizeChange() {

    },
    handlePageChange() {

    },
  },
  created() {
    var app = this;
    axios.get("/api/v1/traces/data")
      .then(function(response) {
        app.table.data = response.data;
      })
      .catch(function(err) {
        console.log(err)
      })
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

.topbar-main {
  flex: 1;
  margin-left: 10px;
  color: white;
}

.pagination {
  display: flex;
  flex: 1;
  justify-content: flex-end;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
