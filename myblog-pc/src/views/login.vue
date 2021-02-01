<template>
  <div class="container">
    <div class="login-form">
      <div class="img"><img src="../assets/img/8.jpg" alt="" /></div>
      <h3>个人博客，请登录账号密码</h3>
      <p>用户名：<input type="text" name="username" v-model="username" /></p>
      <p>密码：<input type="password" name="password" v-model="password" /></p>
      <p>
        <button @click="doLogin" class="btn">登录</button>
      </p>
      <div class="regist">
        <router-link to="/Regist">没有账号？去注册</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    doLogin() {
      this.$http
        .post("/users/login", {
          username: this.username,
          password: this.password,
        })
        .then((response) => {
          let { state, token, user } = response.data;
          if (state == "success") {
            //   登录成功
            // 存储token
            this.$store.commit("storeLoginUser", user);
            this.$store.dispatch("setToken", token);
            this.$router.push("/index");
          } else {
            //   登录失败
            alert("用户名或密码不正确!");
          }
        });
    },
  },
};
</script>

<style scoped>
.login-form {
  width: 500px;
  margin: auto;
  text-align: center;

  background-color: #faeee7;
}
.login-form p {
  padding: 20px 0;
}

.btn {
  width: 70px;
}
.img {
  margin-top: 50px;
}
img {
  width: 500px;
  height: 250px;
}
input {
  padding: 5px 10px;
  border-radius: 0.5rem;
  border: 1px solid #b8baba;
  background: #ffffff;
}
</style>