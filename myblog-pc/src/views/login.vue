<template>
  <div class="container">
    <div class="login-form">
      <div class="img"><img src="../assets/img/8.jpg" alt="" /></div>
      <h3>留下你的脚步吧！</h3>
      <div class="input">
        <p>用户名：</p>
        <el-input
          placeholder="请输入用户名"
          v-model="username"
          maxlength="10"
          show-word-limit
          size="medium"
        ></el-input>
      </div>

      <div class="input">
        <p>密码：</p>
        <el-input
          placeholder="请输入密码"
          v-model="password"
          show-password
          size="medium"
        ></el-input>
      </div>

      <div class="btn">
        <!-- <button @click="doLogin" class="btn">登录</button> -->
        <el-button @click="doLogin" class="btn" size="small" round
          >登录</el-button
        >
      </div>
      <div class="regist">
        <router-link to="/Regist">没有账号？去注册</router-link>
      </div>
    </div>
    <!-- </div>
      </transition>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      // show: false,
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
            this.$message({
              showClose: true,
              message: "恭喜你，登陆成功！",
              type: "success",
            });
            this.$store.commit("storeLoginUser", user);
            this.$store.dispatch("setToken", token);
            this.$router.push("/index");
          } else {
            //   登录失败
            // alert("用户名或密码不正确!");
            this.$message({
              showClose: true,
              message: "用户名或密码不正确哦!",
              type: "error",
            });
          }
        });
    },
  },
};
</script>

<style scoped>
.container {
  background-image: url(../assets/img/9.jpg);
  background-size: cover;
  height: 100%;
  position: fixed;
  width: 100%;
}
.login-form {
  width: 25rem;
  margin: 0 auto;
  position: relative;
  top: 10%;
  border: solid 1px #cccccc;
  border-radius: 4px;
  background-color: #faeee7;
}

h3 {
  margin: 1rem 0 0.5rem;
}
.input {
  padding: 10px 20px;
  display: flex;
}
.input p {
  width: 30%;
  padding: 0.4rem 0;
}
img {
  width: 100%;
}
el-input {
  width: 20%;
}
.btn {
  margin: 0.4rem 0 0.6rem;
}
.regist {
  margin: 1rem 0;
}
</style>