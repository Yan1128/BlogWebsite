<template>
  <div class="container">
    <div class="login-form">
      <div class="img"><img src="../assets/img/8.jpg" alt="" /></div>
      <h3>创建一个你的账号吧！</h3>
      <div class="input">
        <p>用户名：</p>
        <el-input
          placeholder="请输入用户名"
          v-model="username"
          maxlength="10"
          show-word-limit
          size="medium"
        ></el-input
        >{{ message }}
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
      <div class="input">
        <p>昵称：</p>
        <el-input
          placeholder="请输入昵称"
          v-model="nickname"
          show-word-limit
          size="medium"
        ></el-input>
      </div>
      <div class="btn">
        <el-button @click="regist" class="btn" size="small" round
          >登录</el-button
        >
      </div>
      <!-- <p>
        <button type="submit" class="btn" @click="regist">注册</button>
      </p> -->
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
            // alert("注册成功，请去登录");
            this.$message({
              showClose: true,
              message: "恭喜你，注册成功，请去登录吧！",
              type: "success",
            });
            this.$router.push("/login");
          } else {
            // alert("注册失败,填写的信息不能为空！");
            this.$message({
              showClose: true,
              message: "注册失败,填写的信息不能为空！",
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
  /* padding: 0.5rem 0; */
  background-color: #faeee7;
}
h3 {
   margin: 1rem 0 0.5rem;
}
img{
  width: 100%;
}
.input {
  padding: 10px 20px;
  display: flex;
}
.input p {
  width: 30%;
  padding: 0.4rem 0;
}
el-input {
  width: 20%;
}
.btn {
  margin: 0.4rem 0 0.6rem;
}
/* .login-form {
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
} */
</style>