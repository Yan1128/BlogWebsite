<template>
    <div class="container">
      <CommonHeader />
      <div class="blog-list">
        <div class="blog" v-for="item in List" :key="item.blog_id">
          <h3 class="blog-title">
            <router-link class="rout" :to="{ path: '/blog/Detail/' + item.blog_id }">{{
              item.title
            }}</router-link>
          </h3>
          <p> yan / {{ item.post_time }}</p>
        </div>
      </div>
    </div>
</template>
<script>
import CommonHeader from "../components/CommonHeader.vue";
export default {
  data() {
    return {
      List: [],
    };
  },

  created() {
    this.getData();
  },
  components: {
    CommonHeader,
  },
  methods: {
    getData() {
      this.$http.get("/blogs/list").then((res) => {
        let { state } = res.data;
        if (state == "auth-fail") {
          alert("请求未授权-then!");
        } else if (state == "success") {
          let { results} = res.data;
          this.List = results;

        }
      });
    },
  },
};
</script>

<style scoped>
.blog-list {
  width: 1000px;
  margin: auto;
}
.blog {
  width: 40%;
  height: 130px;
  background: rgb(247, 216, 220);
  padding: 20px 0;
  margin: 10px 50px;
  border-radius: .5rem;
  float: left;
}
.blog-title,
.blog-content,
.post-time {
  margin: 20px 0;
}
.rout{
  color: #000;
}
.rout:hover{
  color: rgb(144, 141, 233);
}
</style>