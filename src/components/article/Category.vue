<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类管理</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-card class="box-card">
      <!-- 搜索与添加区域 -->
      <el-row type="flex" justify="space-between">
        <el-col :span="8">
          <el-input
            placeholder="请输入分类名"
            clearable
            v-model="category"
            @clear="getCategoryList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getCategory"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addCategoryDialog = true"
            >添加分类</el-button
          >
        </el-col>
      </el-row>

      <!-- 分类列表区域 -->
      <el-table :data="categorylist" border stripe height="500">
        <el-table-column type="index" />
        <el-table-column label="分类名" prop="name" />
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="editCategoryBtn(scope.row._id)"
            ></el-button>
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click="deleteCategory(scope.row._id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加分类的对话框 -->
    <el-dialog
      title="添加分类"
      :visible.sync="addCategoryDialog"
      width="50%"
      @close="addDialogClosed"
    >
      <!-- 内容主体区域 -->
      <el-form
        ref="addFormRef"
        :model="addForm"
        :rules="categoryFormRules"
        label-width="70px"
      >
        <el-form-item label="分类名" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCategoryDialog = false">取 消</el-button>
        <el-button type="primary" @click="addCategory">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑分类的对话框 -->
    <el-dialog
      title="编辑分类"
      :visible.sync="editCategoryDialog"
      width="50%"
      @close="editDialogClosed"
    >
      <!-- 内容主体区域 -->
      <el-form
        ref="editFormRef"
        :model="editForm"
        :rules="categoryFormRules"
        label-width="70px"
      >
        <el-form-item label="分类名" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editCategoryDialog = false">取 消</el-button>
        <el-button type="primary" @click="editCategory">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Category",
  data() {
    return {
      category: "",
      categorylist: [],
      addCategoryDialog: false,
      editCategoryDialog: false,
      addForm: {
        name: "",
      },
      editForm: {},
      categoryFormRules: {
        name: [
          {
            required: true,
            message: "请输入分类名",
            trigger: "blur",
          },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  components: {},
  created() {
    this.getCategoryList();
  },
  methods: {
    // 请求所有分类信息
    async getCategoryList() {
      const token = window.sessionStorage.getItem("eleToken");
      const data = await this.$http.get("/articlecategory");
      if (data.status !== 200) {
        return this.$message.error("数据获取失败！");
      }
      this.categorylist = data.data.names;
    },

    // 搜索分类
    async getCategory() {
      if (!this.category) {
        return this.$message.error("请输入分类名！");
      }
      const name = this.category
      const data = await this.$http.get(`/articlecategory/${name}`);
      if (!data) {
        return this.$message.error("没有查询到用户信息!");
      }
      this.categorylist = data.data.category
      console.log(data);
    },

    // 添加分类
    addCategory() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return;
        // 发起添加用户的网络请求
        const token = window.sessionStorage.getItem("eleToken");
        const res = await this.$http.post("/articlecategory/add", {
          category: this.addForm,
        });
        if (res.status !== 200) {
          return this.$message.error("添加分类失败");
        }
        this.$message.success("添加用户成功！");
        // 隐藏对话框
        this.addCategoryDialog = false;
        // 重新获取用户列表数据
        this.getCategoryList();
      });
    },
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },

    // 编辑分类
    async editCategoryBtn(id) {
      this.editCategoryDialog = true;
      const token = window.sessionStorage.getItem("eleToken");
      const data = await this.$http.get(`/articlecategory/${id}`);
      if (data.status !== 200) {
        return this.$message.error("没有查询到用户信息!");
      }
      this.editForm = data.data.category[0];
    },
    editCategory() {
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) return;

        // 发起修改用户的网络请求
        const _id = this.editForm._id;
        const token = window.sessionStorage.getItem("eleToken");
        const res = await this.$http.post(`/articlecategory/edit/${_id}`, {
          category: this.editForm,
        });
        if (res.status !== 200) {
          return this.$message.error("修改分类信息失败！");
        }
        this.$message.success("修改分类信息成功！");
        // 隐藏对话框
        this.editCategoryDialog = false;
        // 重新获取分类列表数据
        this.getCategoryList();
      });
    },
    editDialogClosed() {
      this.$refs.editFormRef.resetFields();
    },

    // 删除分类
    deleteCategory(id) {
      this.$confirm("此操作将永久删除该分类, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          // 发送删除用户的网络请求
          const token = window.sessionStorage.getItem("eleToken");
          const data = await this.$http.delete(`/articlecategory/delete/${id}`);
          if (data.status !== 200) {
            return this.$message.error("删除分类失败！");
          }
          this.$message.success("删除分类成功！");
          this.getCategoryList();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style scoped>
</style>