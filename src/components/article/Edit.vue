<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/articles' }"
        >文章列表</el-breadcrumb-item
      >
      <el-breadcrumb-item>文章编辑</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 文章编辑区域 -->
    <el-card class="edit-card">
      <el-form
        ref="articleFormRef"
        :model="articleForm"
        :rules="articleFormRules"
        label-width="80px"
      >
        <el-form-item label="文章标题" prop="title">
          <el-input v-model="articleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model="author" disabled></el-input>
        </el-form-item>
        <el-form-item label="文章分类" prop="category">
          <el-select v-model="articleForm.category" placeholder="请选择">
            <el-option
              v-for="item in categories"
              :key="item.name"
              :label="item.name"
              :value="item._id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发布时间" prop="publishDate">
          <el-date-picker
            v-model="articleForm.publishDate"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item v-if="!articleForm._id" label="文章封面" prop="cover">
          <el-upload
            ref="upload"
            :auto-upload="false"
            drag
            action=""
            multiple
            :on-change="filechange"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="文章内容" prop="content">
          <quill :articleForm="articleForm"></quill>
        </el-form-item>
      </el-form>
    </el-card>

    <el-button type="primary" @click="addArticle">提交</el-button>
  </div>
</template>

<script>
import Quill from "./Quill.vue";

export default {
  name: "Edit",
  data() {
    return {
      articleForm: {
        _id: "",
        title: "",
        author: "",
        category: "",
        publishDate: "",
        cover: "",
        content: "",
      },
      author: "",
      articleFormRules: {
        title: [
          {
            required: true,
            message: "请输入文章标题",
            trigger: "blur",
          },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],
        publishDate: [
          {
            required: true,
            message: "请选择发布时间",
            trigger: "blur",
          },
        ],
      },
      categories: [],
    };
  },
  components: { Quill },
  methods: {
    // 获取文章分类
    async getCategory() {
      const token = window.sessionStorage.getItem("eleToken");
      const data = await this.$http.get("/articlecategory", {
        e: token,
      });
      if (data.status !== 200) {
        return this.$message.error("数据获取失败！");
      }
      this.categories = data.data.names;
      this.articleForm.category = this.categories[0]._id;
    },
    // 提交文章
    async addArticle() {
      if (!this.articleForm._id) {
        let formData = new FormData();
        for (let key in this.articleForm) {
          formData.append(key, this.articleForm[key]);
        }
        const data = await this.$http.post("/articles/add", formData);
        if (data.status == 200) {
          this.$router.push("/articles");
          this.$message.success("文章添加成功");
        } else {
          this.$$message.error("文章添加失败");
        }
      } else{
        this.editArticle()
      }

    },
    // 查询文章信息
    async getArticle() {
      const id = this.articleForm._id
      const data = await this.$http.get(`/articles/${id}`)
      const article = data.data.articles[0]

      this.articleForm.title = article.title
      this.articleForm.category = article.category._id
      this.articleForm.publishDate = article.publishDate
      this.articleForm.cover = article.cover
      this.articleForm.content = article.content
    },

    // 更新文章 
    async editArticle() {
      const id = this.articleForm._id
      const data = await this.$http.post(`/articles/edit/${id}`, {article: this.articleForm})
      if(data.status == 200) {        
        this.$router.push("/articles");
        this.$message.success("文章修改成功");
      }
    },

    // 监听图片改变事件
    filechange(file, filesList) {
      this.articleForm.cover = file.raw;
    },
  },
  created() {    
    this.articleForm.author = this.$store.getters.user.id;
    this.author = this.$store.getters.user.name;
    this.getCategory();

    const articleId = this.$route.params.articleId;
    if (articleId) {
      this.articleForm._id = articleId;
      this.getArticle()
    }
  },
};
</script>

<style scoped>
.edit-card {
  overflow: scroll;
}
</style>