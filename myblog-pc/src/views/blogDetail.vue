<template>
  <div class="container">
    <CommonHeader />
    <div class="blog-list">
      <div class="blog">
        <div class="text">
          <div class="blog-title">
            <h2>{{ blog && blog.title }}</h2>
            <span>{{ blog && postBlogTime }}</span>
          </div>
          <div class="blog-content">{{ blog && blog.content }}</div>
        </div>
        <div class="comments">
          <h4>评论区<i class="el-icon-chat-dot-round"></i></h4>
          <div v-if="commentsList != ''">
            <div
              class="comment"
              v-for="item in commentsList"
              :key="item.comm_id">
              <div class="comment-content">{{ item.comm_content }}</div>
              <div class="comment-info">
                <span class="userinfo">{{ item.username }}</span> /
                <!-- <span v-if="item.username!=null">/</span> -->
                <span class="comm_post_time">{{ item.comm_post_time }}</span>
                <div
                  class="post-time"
                  v-for="item in commentsList"
                  :key="item.id"
                >
                  <span>{{ item.time }}</span>
                </div>
                <div v-if="user != null">
                  <el-button
                    class="btn"
                    type="text"
                    v-if="item.username == user.username"
                    @click="delComment(item.comm_id)"
                    >删除</el-button
                  >
                </div>
              </div>
            </div>
          </div>
          <div v-else class="no-comment">暂无相关评论</div>
          <div class="add-comment">
            <el-button @click="show = !show"
              ><i class="el-icon-edit"></i>写评论</el-button
            >
            <transition name="el-zoom-in-center">
              <div v-show="show" class="transition-box">
                <div class="input">
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 1, maxRows: 4 }"
                    placeholder="请输入内容"
                    v-model="content"
                  >
                  </el-input>
                </div>
                <el-button
                  type="success"
                  icon="el-icon-check"
                  circle
                  @click="postComment"
                  size="small"
                ></el-button>
              </div>
            </transition>
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
      commentsList: [],
      content: "",
      postBlogTime: "",
      commTimeList: [],
      user: "",
      show: false,
    };
  },
  components: {
    CommonHeader,
  },

  created() {
    this.getBlogDetail();
    var user = JSON.parse(localStorage.getItem("my"));
    this.user = user;
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
          let { state, blog, postTime, times } = res.data;
          if (state == "success") {
            this.blog = blog;
            this.commentsList = blog.comments;
            this.postBlogTime = postTime;
            this.commTimeList = times;
          }
        })
        .catch(() => {
          this.$router.push("/index");
        });
    },
    delComment(id) {
      // this.user = JSON.parse(localStorage.getItem("my"));
      let blog_id = this.$route.params.blog_id;
      let loginUser = this.user;
      console.log(this.user);
      if (loginUser) {
        this.$http
          .get("/blogs/delComment", {
            params: {
              blog_id: blog_id,
              user_id: this.user.user_id,
              comm_id: id,
            },
          })
          .then((res) => {
            let { state } = res.data;
            if (state == "success") {
              this.$message({
                message: "评论删除成功！",
                type: "success",
              });
              this.getBlogDetail();
            }
          });
      } else {
        this.$message("没登录呢！");
        this.$router.push("/login");
      }
    },
    postComment() {
      //this.user = JSON.parse(localStorage.getItem("my"));
      let blogId = this.$route.params.blog_id;
      let loginUser = this.user;
      if (loginUser) {
        this.$http
          .post("/blogs/postComment", {
            blog_id: blogId,
            content: this.content,
            user_id: this.user.user_id,
          })
          .then((res) => {
            let { state } = res.data;
            if (state == "success") {
              // alert("发表评论成功!");
              this.$message({
                message: "发表评论成功!",
                type: "success",
              });
              this.getBlogDetail();
              this.content = "";
            } else {
              // alert("发表评论失败!");
              this.$message({
                showClose: true,
                message: "发表评论失败!",
                type: "error",
              });
            }
          });
      } else {
        // alert("没登录呢");
        this.$message("没登录呢！");
        this.getBlogDetail();
      }
    },
  },
};
</script>

<style scoped>
.text {
  background: #faeee7;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  font-size: 17px;
}
.blog-title {
  padding: 10px;
}
.blog-content {
  padding: 10px;
}
h4 {
  margin: 2rem 1rem 1rem;
  display: flex;
  font-size: 20px;
}
.comment {
  padding: 1rem 0.5rem 0.3rem;
  border-bottom: solid 1px #ffffff;
  display: flex;
  justify-content: space-between;
}
.comment-info {
  display: flex;
}
.add-comment {
  margin-top: 2rem;
}
.transition-box {
  display: flex;
}
.input {
  width: 45rem;
  margin-left: 12%;
  margin-right: 1rem;
}
.btn {
  padding: 0 0.3rem;
}
.userinfo {
  padding-right: 0.2rem;
}
.comm_post_time {
  padding-left: 0.2rem;
}
.no-comment{
  /* color:#8c8888; */
  color:#9b9a9a;
}
</style>
