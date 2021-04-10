<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="文章标题">
        <el-input v-model="title" type="text" name="title" />
      </el-form-item>

      <el-form-item label="正文">
        <el-input
          type="textarea"
          rows="15"
          cols="100"
          name="content"
          v-model="content"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="postBlog">发布</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      content: "",
    };
  },
  methods: {
    postBlog() {
      this.axios
        .post("http://localhost:3000/blogs/postBlog", {
          title: this.title,
          content: this.content,
        })
        .then((res) => {
          let { state } = res.data;
          if (state == "success") {
            this.$message({
              message: "发表文章成功!",
              type: "success",
            });
            this.$router.push("/example/blogList");
          }
        });
    },
  },
};
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

