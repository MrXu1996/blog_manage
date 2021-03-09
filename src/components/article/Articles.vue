<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>文章列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-card class="box-card">
      <!-- 搜索与添加区域 -->
      <el-row type="flex" justify="space-between">
        <el-col :span="8">
          <el-input
            placeholder="请输入文章标题"
            v-model="title"
            clearable
            @clear="getArticlesList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getArticles"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <router-link to="/articles/edit">
            <el-button type="primary">添加文章 </el-button>
          </router-link>
        </el-col>
      </el-row>

      <!-- 文章列表区域 -->
      <el-table :data="articles" border stripe="">
        <el-table-column type="index" />
        <el-table-column label="文章标题" prop="title" />
        <el-table-column label="发布时间" prop="publishDate"> </el-table-column>
        <el-table-column label="作者" prop="author.username" />
        <el-table-column label="文章分类" prop="category.name" />
        <el-table-column label="操作" width="150px">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="$router.push({name: 'Edit',params: {articleId: scope.row._id}})"
            ></el-button>
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click="deleteArticle(scope.row._id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.page"
        :page-sizes="[3, 5, 10, 20]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
const dateFormat = require("dateformat");
export default {
  name: "Articles",
  data() {
    return {
      queryInfo: {
        title: "",
        // 当前页数
        page: 1,
        // 每页展示的条数
        pagesize: 5,
      },
      articles: [],
      // 总数据条数
      total: 0,
      // 总页数
      count: 0,
      // 搜索文章标题
      title: ''
    };
  },
  components: {},
  created() {
    this.getArticlesList();
  },
  methods: {
    async getArticlesList() {
      const data = await this.$http.get("/articles", {
        params: this.queryInfo,
      });
      this.articles = data.data.articles;
      this.total = data.data.total;
      this.count = data.data.count;
      this.articles.forEach((item, index) => {
        this.articles[index].publishDate = dateFormat(
          item.publishDate,
          "yyyy-mm-dd"
        );
      });
    },

    // 搜索文章
    async getArticles() {
      const title = this.title;
      if (!title) {
        return this.$message.error("请输入文章标题！");
      }
      const data = await this.$http.get(`/articles/title/${title}`);
      if (!data) {
        return this.$message.error("没有查询到文章!");
      }
      this.articles = data.data.articles;
      this.articles.forEach((item, index) => {
        this.articles[index].publishDate = dateFormat(
          item.publishDate,
          "yyyy-mm-dd"
        );
      });
    },

    // 删除文章
    deleteArticle(id) {
      this.$confirm("此操作将永久删除该文章, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          // 发送删除文章的网络请求
          const data = await this.$http.delete(`/articles/delete/${id}`);
          if (data.status !== 200) {
            return this.$message.error("删除文章失败！");
          }
          this.$message.success("删除文章成功！");
          this.getArticlesList();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    // 监听pagesize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getArticlesList();
    },

    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.page = newPage;
      this.getArticlesList();
    },
  },
};
</script>

<style scoped>
</style>