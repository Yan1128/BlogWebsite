<template>
    <div class="container">
      <CommonHeader />
      <div class="blog-list">
        <div class="blog" v-for="item in blogList" :key="item.blog_id">
          <h3 class="blog-title">
            <router-link class="rout" :to="{ path: '/blog/Detail/' + item.blog_id }">{{
              item.title
            }}</router-link>
          </h3>
          <span class="post-time">{{ postBlogTime }}</span>
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
      postBlogTime: "",
       user:''
    };
  },

  created() {
    let user =JSON.parse(localStorage.getItem("my"))
    this.user=user ;
    this.getData();
  },
  components: {
    CommonHeader,
  },
  methods: {
    getData() {
      this.$http.get("/blogs/myBlogList",{
          params: {
            userId: this.user.user_id,
          },
      }).then((res) => {
        let { state } = res.data;
        if (state == "auth-fail") {
          alert("请求未授权-then!");
        } else if (state == "success") {
          let { results, postTime } = res.data;
          this.blogList = results;
          this.postBlogTime = postTime;
        }
      });
    },
  },
};
</script>

<style scoped>
.container {
  background:#f4f5f7;
  
}
.blog-title,
.blog-content,
.post-time {
  margin: 20px 0;
}
img {
  width: 90px;
  height: 80px;
}
.container-header{
  height: 100px;
  background: #ffffff;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.1), 0 1px 2px 0 rgba(0,0,0,.06);
}
  
.container-content{
  display: flex;
  justify-items: flex-start;
  padding: 10px 20px;
  margin: 0 125px;
  line-height: 80px;
  
}
p{
  margin:0 30px;
  font-size: 1.5rem;
  color: #000;
}
.rout{
  color: #000;
}
.rout:hover{
  color: rgb(144, 141, 233);
}
</style>