<template>
  <div class="container">
    <div class="login-form">
      <div class="img"><img src="../assets/img/8.jpg" alt="" /></div>
      <h1>用户注册</h1>
      <p>
        用户名：<input
          type="text"
          name="username"
          id="username"
          v-model="username"
        />
        {{ message }}
      </p>
      <p>密码：<input type="password" name="password" v-model="password" /></p>
      <p>昵称：<input type="text" name="nickname" v-model="nickname" /></p>
      <p>
        <button type="submit" class="btn" @click="regist">注册</button>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      nickname: "",
      message: "",
    };
  },
  created() {},
  watch: {
    username: function checkUser() {
      this.$http
        .get("/users/checkUser", {
          params: {
            username: this.username,
          },
        })
        .then((response) => {
          let { state } = response.data;
          if (state == "success") {
            this.message = "√";
          } else {
            this.message = "×用户名已存在!";
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  methods: {
    regist() {
      this.$http
        .post("/users/regist", {
          username: this.username,
          password: this.password,
          nickname: this.nickname,
        })
        .then((res) => {
          let { state } = res.data;
          if (state == "success") {
            alert("注册成功，请去登录");
            this.$router.push("/login");
          } else {
            alert("注册失败,填写的信息不能为空！");
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