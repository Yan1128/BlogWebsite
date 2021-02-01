<template>
  <div class="container">
    <CommonHeader />
    <div class="blog-list">
      
      <div class="blog">
      <div class="blog-title">
        <h3>{{ blog && blog.title }}</h3>
        <span>{{ blog &&  postBlogTime }}</span>
      </div>
      <div class="blog-content">{{ blog &&  blog.content }}</div>
      <div class="comments">
        <h4>-------------------------评论区-------------------------</h4>
        <p>
          <input type="text" name="content" v-model="content">
          <button @click="postComment">添加评论</button>
        </p>
        <div class="comment" v-for="item in contentList" :key="item.comm_id">
          <div class="comment-content">{{ item.comm_content }}</div>
          <div class="comment-info">
            <span class="userinfo">{{ item.username }}</span>/
            <span>{{ item. comm_post_time}}</span>
            <div class="post-time"  v-for="item in contentList" :key="item.id">
              <span>{{ item.time }}</span>
            </div> 
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>
<script>
import CommonHeader from "../components/CommonHeader.vue";
export default {
   data() {
    return {
      blog: null,
      contentList:[],
      content:'',
      postBlogTime:'',
      commTimeList:[],
      user:''
    };
  },
  components: {
    CommonHeader,
  },
  created() {
    let user =JSON.parse(localStorage.getItem("my"))
    this.user=user ;
    this.getBlogDetail();
    
  },
  methods: {
    getBlogDetail() {
      let blogId = this.$route.params.blog_id;
      this.$http
        .get("/blogs/detail", {
          params: {
            blogId: blogId,
          },
        })
        .then((res) => {
          let { state, blog ,postTime,times} = res.data;
          if (state == "success") {
            this.blog = blog;
            this.contentList = blog.comments;
            this.postBlogTime=postTime;
            this.commTimeList=times;
          }
        })
        .catch(() => {
          this.$router.push("/login");
        });
    },
    postComment(){
      let blogId = this.$route.params.blog_id;
      let loginUser = this.user;
      if (loginUser) {
        this.$http
          .post("/blogs/postComment", 
          {
            blog_id:blogId,
            content:this.content,
            user_id: this.user.user_id,
          })
          .then((res) => {
            let { state } = res.data;
            if (state == "success") {
              alert("发表评论成功!");
              this.getBlogDetail();
              this.content=''
            } else {
              alert("发表评论失败!");
            }
          });
      }else{
          alert('没登录呢');
          this.$router.push('/login');
      }
    }
  },
};
</script>

<style scoped>
.blog-title {
  padding: 10px;
}
.blog-content {
  padding: 10px;
}
.comment {
  padding: 20px;
}
.comment-info {
  float: right;
}
.comment-content{
  border: #000000 solid 1px;
}
</style>
