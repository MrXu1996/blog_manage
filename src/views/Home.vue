<template>
  <div>
    <el-container class="home-container">
      <!-- 头部区域 -->
      <el-header>
        <div class="title">
          <img src="../assets/img/touxiang.png" alt="" />
          <span>个人博客后台管理系统</span>
        </div>
        <div class="userinfo">
          <span>{{ user.name }}</span>
          <el-button type="info" @click="logout">退出</el-button>
        </div>
      </el-header>
      <!-- 页面主体区域 -->
      <el-container>
        <!-- 侧边栏 -->
        <el-aside :width="isCollapse? '64px' : '200px'">
          <div class="toggle-button" @click="toggleCollapse">|||</div>
          <!-- 侧边栏菜单区域 -->
          <el-menu
            class="el-menu-vertical-demo"
            background-color="#333744"
            text-color="#fff"
            active-text-color="#409eff"
            :collapse="isCollapse"
            :collapse-transition="false"
            :router="true"
            :default-active="activePath"
            @select="handleSelect"
          >
            <!-- 一级菜单 -->
            <el-submenu index="1">
              <!-- 一级菜单的模板区域 -->
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-user-solid"></i>
                <!-- 文本 -->
                <span>用户管理</span>
              </template>

              <!-- 二级菜单 -->
              <el-menu-item index="/users">
                <template slot="title">
                  <!-- 图标 -->
                  <i class="el-icon-menu"></i>
                  <!-- 文本 -->
                  <span>用户列表</span>
                </template>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <!-- 一级菜单的模板区域 -->
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-document"></i>
                <!-- 文本 -->
                <span>文章管理</span>
              </template>

              <!-- 二级菜单 -->
              <el-menu-item index="/articles">
                <template slot="title">
                  <!-- 图标 -->
                  <i class="el-icon-menu"></i>
                  <!-- 文本 -->
                  <span>文章列表</span>
                </template>
              </el-menu-item>
              <el-menu-item index="/category">
                <template slot="title">
                  <!-- 图标 -->
                  <i class="el-icon-menu"></i>
                  <!-- 文本 -->
                  <span>分类管理</span>
                </template>
              </el-menu-item>
            </el-submenu>
            <el-menu-item index="/admin">
              <i class="el-icon-setting"></i>
              <span slot="title">个人信息</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <!-- 右侧主体区域 -->
        <el-main>
          <router-view />
        </el-main>
      </el-container>
      <!-- 底部区域 -->
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      isCollapse: false,
      // 被激活的链接地址
      activePath: ''
    };
  },
  components: {},
  methods: {
    logout() {
      window.sessionStorage.clear(), this.$router.push("/login");
    },
    // 点击按钮切换菜单的折叠和展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    // 点击菜单项保存被选菜单到sessionStorage
    handleSelect(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  },
  created() {
    this.handleSelect(window.sessionStorage.getItem('activePath'))
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
};
</script>

<style scoped>
.home-container {
  height: 100vh;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
}
.el-header .title {
  display: flex;
  align-items: center;
}
.el-header .title img {
  width: 56px;
  height: 56px;
  border-radius: 28px;
}
.el-header .title span {
  margin-left: 10px;
}
.userinfo span {
  margin-right: 10px;
}
.el-aside {
  background-color: #333744;
}
.toggle-button {
  background-color: #4a5064;
  color: #fff;
  font-size: 10px;
  line-height: 24px;
  text-align: center;
  letter-spacing: .2em;
  cursor: pointer;
}
.el-menu {
  border-right: 0;
}
.el-main {
  background-color: #eaedf1;
}
.el-footer {
  background-color: #373d41;
}
</style>