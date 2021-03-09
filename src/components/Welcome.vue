<template>
  <div class="welcome">
    <div class="container">
      <h2>欢迎使用博客文章后台管理系统</h2>
      <el-row :gutter="24">
        <el-col :span="6">
          <router-link to="/users">
            <div class="grid-content bg-purple">
              <img src="../assets/img/user.png" alt="" srcset="">
              <p>用户管理</p>
            </div>
          </router-link>
        </el-col>
        <el-col :span="6">
          <router-link to="/articles">
            <div class="grid-content bg-green">
              <img src="../assets/img/article.png" alt="" srcset="">
              <p>文章列表</p></div>
          </router-link>
        </el-col>
        <el-col :span="6">
          <router-link to="/category">
            <div class="grid-content bg-blue">
              <img src="../assets/img/category.png" alt="" srcset="">
              <p>分类管理</p>
            </div>
          </router-link>
        </el-col>
        <el-col :span="6">
          <router-link to="/tag">
            <div class="grid-content bg-yellow">
              <img src="../assets/img/tag.png" alt="" srcset="">
              <p>文章标签</p>
            </div>
          </router-link>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "Welcome",
  data() {
    return {};
  },
  components: {},
  methods: {},
};
</script>

<style scoped>
.welcome {
  height: 100%;
  background-color: #fff;
}
.container {
  width: 80%;
  margin: 0 auto;
  padding-top: 100px;
}
.container h2 {
  font-size: 24px;
}
.grid-content {
  width: 100%;
  margin-top: 40px;
  text-align: center;
  padding-bottom: 5%;
}
.grid-content img {
  width: 50%;
  margin: 15% auto 5%;
}
.grid-content p {
  font-size: 18px;
  margin-bottom: 10%;
}
.bg-purple {
  background-color: #a491ec;
}
.bg-green {
  background-color: #59d984;
}
.bg-blue {
  background-color: #40d3da;
}
.bg-yellow {
  background-color: #f8b529;
}
</style>