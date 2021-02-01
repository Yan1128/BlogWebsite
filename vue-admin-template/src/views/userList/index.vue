<template>
  <div class="app-container">
    <el-table
      :data="List"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column label="用户ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.user_id }}
        </template>
      </el-table-column>
      <el-table-column label="用户姓名" align="center">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column label="用户昵称"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.nickname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户密码"  align="center">
        <template slot-scope="scope">
          {{ scope.row.password }}
        </template>
      </el-table-column>
      <el-table-column label="注册时间"  align="center">
        <template slot-scope="scope">
          {{ scope.row.create_date }}
        </template>
      </el-table-column>
       <!-- <el-table-column label="删除文章"  align="center">
        <template slot-scope="scope">
         <el-butten size="mini" >删除</el-butten>
        </template>
      </el-table-column> -->
    </el-table>
  </div>
</template>

<script>
// import { getList } from '@/api/table'

export default {
//   filters: {
//     statusFilter(status) {
//       const statusMap = {
//         published: 'success',
//         draft: 'gray',
//         deleted: 'danger'
//       }
//       return statusMap[status]
//     }
//   },
  data() {
    return {
      List:[],
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      this.axios
      .get("http://localhost:3000/users/list")
      .then((res) => {
          this.List = res.data.results;
      });
    }
  }
}
</script>
