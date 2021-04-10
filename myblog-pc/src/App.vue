<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

</script>


<style lang="scss">
body{
   min-width: 1000px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  // background-image: url(assets/img/9.jpg);
  // background-position: 100%;
  // width: 100%; 
}
.blog-list {
  width: 1000px;
  margin: auto;
}
.blog {
  background: rgb(247, 216, 220);
  padding: 20px;
  margin: 10px 0;
  border-radius: .5rem;
}
#nav {
  //padding: 30px;

  a {
    font-weight: bold;
    color: #f8f003;

    &.router-link-exact-active {
      color: #3ed390;
    }
  }
}
/* css reset 样式重置 */
* {
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
}
ul,
ol {
  list-style: none;
}

/* 通用样式 */
// .container {
//   height: 100%;
//   width: 100%;
//   margin: 0 auto;
// }
// header {
//   height: 25px;
//   background: #cccccc;
//   width: 100%;
//   display: flex;
//   justify-content: space-between;
//   align-items: right;
// }
</style>
