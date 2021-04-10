<template>
  <header>
   <div class="header">
        <div class="content">
          <img src="../assets/img/6.png" alt="" />
          <p>The Blog Website</p>
          <a class="nav" href="/index">首页</a>
          <!-- <a class="nav" href="/blog/post">发表文章</a>
          <a class="nav" href="/myblog">我的文章</a> -->
          <a class="nav" href="/check">查询博客</a>
          <div class="exit rignt" v-if="this.user!=null">
            {{  this.user.username }} |
          <a href="" @click="exit">退出</a>
          </div>
          <div class="login rignt" v-else>
            <a href="/login" >登录</a> |
            <a href="/regist" >注册</a>
          </div>
        </div> 
    </div>

  </header>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {
     user:''
    };
  },
  computed: {
    ...mapState(["loginUser"]),
  },
  created() {
     let user =JSON.parse(localStorage.getItem("my"))
     this.user=user ;
  },
  methods: {
    ...mapMutations(["storeLoginUser"]),
    ...mapActions(["setToken"]),
    exit() {
      this.$router.push("/"), this.storeLoginUser(null), this.setToken(null);
    },
  },
};
</script>

<style lang="scss" scoped>
// header {
//   height: 1rem;
//   background: #ebbbf3;
//   line-height: 1rem;
//   text-align: center;
//   font-weight: bolder;
//   position: relative;

//   display: flex;
//   justify-content: space-between;
//   color: #000000;
//   font-size: 1.15rem;
//   position: relative;

// }

img {
  width: 90px;
  height: 80px;
}
.header{
   font-weight: bolder;
  font-size: 1.15rem;
  height: 100px;
  background: #ffffff;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.1), 0 1px 2px 0 rgba(0,0,0,.06);
  min-width: 1060px;
  
}
  
.content{
  display: flex;
  justify-items: flex-start;
  padding: 10px 20px;
  margin-left: 50px;
  margin-right: 100px;
  line-height: 80px;
  position: relative;
  
}
p{
  margin:0 30px;
  font-size: 1.5rem;
  color: #000;
 
}
.rignt{
  position: absolute;
  right: 20px;
  color: #000;
}
a{
  color: #000;
}
a:hover{
  color: rgb(240, 173, 183);
}
.nav{
  padding: 0 20px;
}


</style>
