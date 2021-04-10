<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="文章标题">
        <el-input
          v-model="title"
          type="text"
          name="title"
          :placeholder="list.title"
        />
      </el-form-item>

      <el-form-item label="正文">
        <el-input
          type="textarea"
          rows="15"
          cols="100"
          name="content"
          v-model="content"
          :placeholder="list.content"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="changeBlog">确认修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: {},
      listLoading: true,
      title: "",
      content: "",
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.listLoading = true;
      this.axios
        .get("http://localhost:3000/blogs/detail", {
          params: {
            blogId: this.$route.params.blog_id,
          },
        })
        .then((res) => {
          this.list = res.data.blog;
          this.title = this.list.title;
          this.content = this.list.content;
        });
    },
    changeBlog() {
      this.listLoading = true;
      this.axios
        .post("http://localhost:3000/blogs/changeBlog", {
          blog_id: this.$route.params.blog_id,
          title: this.title,
          content: this.content,
        })
        .then((res) => {
          if (res.data.state == "success") {
            this.$message({
              message: "修改操作成功！",
              type: "success",
            });
            this.$router.push("/example/blogList");
          }
        });
    },
  },
};
</script>
