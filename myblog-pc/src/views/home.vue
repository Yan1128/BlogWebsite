<template>
  <div>
    <div class="container">
      <div class="img"><img src="../assets/img/3.jpg" alt="" /></div>
      <div class="text">
        <h1>欢迎来到我的个人博客网站</h1>
        <p>这里有一些我平时发表的博客，进来看看吧</p>
        <router-link to="/login">起步→</router-link>
        <!-- <router-link to="/regist">注册</router-link> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
.container {
  background: #f4f5f7;
  background-size: cover;
  height: 100%;
  position: fixed;
  width: 100%;
}
img {
  width: 100%;
  height: 600px;
}
</style>