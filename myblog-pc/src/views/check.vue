<template>
  <!-- <div class="note" :style="note"> -->
  <div class="container">
    <CommonHeader />
    <div class="check">
      <input type="text" v-model="title" placeholder="输入一个文章标题" />搜索🔍
    </div>
    <div class="blog-list">
      <div class="blog" v-for="item in blogList" :key="item.blog_id">
        <h3 class="blog-title">
          <router-link class="rout"  :to="{ path: '/blog/Detail/' + item.blog_id }">{{
            item.title
          }}</router-link>
        </h3>
        <span class="post-time">yan / {{ item.post_time }}</span>
      </div>
      <p> {{warn}} </p>
    </div>
    <div class="footer">
      <div>
        <p>The Blog Website</p>
        <p>———————— 💻 ————————</p>
        <p>0455-123-4567</p>
      </div>
    </div>
  </div>
</template>
<script>
import CommonHeader from "../components/CommonHeader.vue";
export default {
  data() {
    return {
      blogList: [],
      title: "",
      warn:''
    };
  },

  created() {},
  watch: {
    title: function checkUser() {
      this.$http
        .get("/blogs/checkBlogList", {
          params: {
            title: this.title,
          },
        })
        .then((res) => {
          let { state } = res.data;
          if (state == "success") {
            let { results} = res.data;
            this.blogList = results;
          } else  {
            this.blogList=''
            this.warn='没有相关文章'
          }
        });
    },
  },
  components: {
    CommonHeader,
  },
  methods: {},
};
</script>

<style scoped>
.blog-title,
.blog-content,
.post-time {
  margin: 20px 0;
}
.check {
  margin: 30px;

}
input {
  padding: 10px 10px;
  border-radius: 0.5rem;
  border: 1px solid #b8baba;
  background: #ffffff;
  width: 500px;
 
}
.footer {
  color: #afaeae;
  position: absolute;
  bottom: 150px;
  left: 600px;
}
.rout{
  color: #000;
}
.rout:hover{
  color: rgb(144, 141, 233);
}
</style>