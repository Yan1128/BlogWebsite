<template>
  <div class="container">
    <CommonHeader />
    <div class="blog-list">
      <div class="blog">
        <h1>发表文章</h1>
        <div class="post">
          <div class="post-blog">
            <p>
              标题：<input
                type="text"
                name="title"
                v-model="title"
                class="put1"
              />
            </p>
          </div>

          <div class="post-blog">
            <textarea
              rows="20"
              cols="200"
              type="text"
              name="content"
              v-model="content"
            ></textarea>
          </div>
        </div>
        <button>发表</button>
      </div>
    </div>
  </div>
</template>
<script>
import CommonHeader from "../components/CommonHeader.vue";
export default {
  data() {
    return {
      title: "",
      content: "",
    };
  },
  created() {
    let user = JSON.parse(localStorage.getItem("my"));
    this.user = user;
  },
  components: {
    CommonHeader,
  },
  methods: {
    postBlog() {
      let loginUser = this.user;
      if (loginUser != null && loginUser != "") {
        this.$http
          .post("/blogs/postBlog", {
            title: this.title,
            content: this.content,
            userId: loginUser.user_id,
          })
          .then((res) => {
            let { state } = res.data;
            if (state == "success") {
              alert("发表文章成功!");
              this.$router.push("/index");
            } else {
              alert("发表文章失败!");
            }
          });
      } else {
        alert("没登录呢");
        this.$router.push("/login");
      }
    },
  },
};
</script>

<style scoped>
.post-blog {
  display: flex;
  justify-items: self-start;
  align-content: flex-start;
  padding: 10px 20px;
}
.put1 {
  width: 300px;
}
p {
  float: left;
}
button {
  width: 75px;
}
</style>

