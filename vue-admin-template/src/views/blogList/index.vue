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
      <el-table-column label="文章编号" width="95">
        <template slot-scope="scope">
          {{ scope.row.blog_id }}
        </template>
      </el-table-column>
      <el-table-column label="文章标题"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="文章内容" align="center">
        <template slot-scope="scope">
          {{ scope.row.content }}
        </template>
      </el-table-column>
      
      <el-table-column label="发表时间"  align="center">
        <template slot-scope="scope">
          {{ scope.row.post_time }}
        </template>
      </el-table-column>
       <el-table-column label="文章管理"  align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <!-- <el-button size="mini" type="primary" >编辑</el-button> -->
         <el-button size="mini" type="danger" @click="delpro(scope.row.blog_id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

export default {

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
      .get("http://localhost:3000/blogs/list")
      .then((res) => {
          this.List = res.data.results;
      });
    },
    delpro(id){
      this.listLoading = true;
      this.axios
      .get("http://localhost:3000/blogs/changelist",{
         params: {
            blog_id: id,
          },
      })
      .then((res) => {
        if(res.data.state=="success"){
          this.fetchData()
        }
      });
    }
  }
}
</script>
