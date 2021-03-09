<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>标签管理</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-card class="box-card">
      <!-- 搜索与添加区域 -->
      <el-row type="flex" justify="space-between">
        <el-col :span="8">
          <el-input
            placeholder="请输入标签名"
            clearable
            v-model="tag"
            @clear="getTagList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getTag"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addTagDialog = true"
            >添加标签</el-button
          >
        </el-col>
      </el-row>

      <!-- 标签列表区域 -->
      <el-table :data="taglist" border stripe height="500">
        <el-table-column type="index" />
        <el-table-column label="标签名" prop="name" />
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="editTagBtn(scope.row._id)"
            ></el-button>
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click="deleteTag(scope.row._id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加标签的对话框 -->
    <el-dialog
      title="添加标签"
      :visible.sync="addTagDialog"
      width="50%"
      @close="addDialogClosed"
    >
      <!-- 内容主体区域 -->
      <el-form
        ref="addFormRef"
        :model="addForm"
        :rules="tagFormRules"
        label-width="70px"
      >
        <el-form-item label="标签名" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addTagDialog = false">取 消</el-button>
        <el-button type="primary" @click="addTag">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑标签的对话框 -->
    <el-dialog
      title="编辑标签"
      :visible.sync="editTagDialog"
      width="50%"
      @close="editDialogClosed"
    >
      <!-- 内容主体区域 -->
      <el-form
        ref="editFormRef"
        :model="editForm"
        :rules="tagFormRules"
        label-width="70px"
      >
        <el-form-item label="标签名" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editTagDialog = false">取 消</el-button>
        <el-button type="primary" @click="editTag">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Tag",
  data() {
    return {
      tag: "",
      taglist: [],
      addTagDialog: false,
      editTagDialog: false,
      addForm: {
        name: "",
      },
      editForm: {},
      tagFormRules: {
        name: [
          {
            required: true,
            message: "请输入标签名",
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
    this.getTagList();
  },
  methods: {
    // 请求所有标签信息
    async getTagList() {
      // const token = window.sessionStorage.getItem("eleToken");
      const data = await this.$http.get("/articletag");
      if (data.status !== 200) {
        return this.$message.error("数据获取失败！");
      }
      this.taglist = data.data.names;
    },

    // 搜索标签
    async getTag() {
      if (!this.tag) {
        return this.$message.error("请输入标签名！");
      }
      const name = this.tag
      const data = await this.$http.get(`/articletag/tagname/${name}`);
      if (!data) {
        return this.$message.error("没有查询到标签信息!");
      }
      this.taglist = data.data.tag
    },

    // 添加标签
    addTag() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return;
        // 发起添加标签的网络请求
        // const token = window.sessionStorage.getItem("eleToken");
        const res = await this.$http.post("/articletag/add", {
          tag: this.addForm,
        });
        if (res.status !== 200) {
          return this.$message.error("添加标签失败");
        }
        this.$message.success("添加标签成功！");
        // 隐藏对话框
        this.addTagDialog = false;
        // 重新获取标签列表数据
        this.getTagList();
      });
    },
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },

    // 编辑标签
    async editTagBtn(id) {
      this.editTagDialog = true;
      // const token = window.sessionStorage.getItem("eleToken");
      const data = await this.$http.get(`/articletag/tagid/${id}`);
      if (data.status !== 200) {
        return this.$message.error("没有查询到标签信息!");
      }
      this.editForm = data.data.tag[0];
    },
    editTag() {
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) return;

        // 发起修改标签的网络请求
        const _id = this.editForm._id;
        // const token = window.sessionStorage.getItem("eleToken");
        const res = await this.$http.post(`/articletag/edit/${_id}`, {
          tag: this.editForm,
        });
        if (res.status !== 200) {
          return this.$message.error("修改标签信息失败！");
        }
        this.$message.success("修改标签信息成功！");
        // 隐藏对话框
        this.editTagDialog = false;
        // 重新获取标签列表数据
        this.getTagList();
      });
    },
    editDialogClosed() {
      this.$refs.editFormRef.resetFields();
    },

    // 删除标签
    deleteTag(id) {
      this.$confirm("此操作将永久删除该标签, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          // 发送删除标签的网络请求
          const token = window.sessionStorage.getItem("eleToken");
          const data = await this.$http.delete(`/articletag/delete/${id}`);
          if (data.status !== 200) {
            return this.$message.error("删除标签失败！");
          }
          this.$message.success("删除标签成功！");
          this.getTagList();
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