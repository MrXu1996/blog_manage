<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-card class="box-card">
      <!-- 搜索与添加区域 -->
      <el-row type="flex" justify="space-between">
        <el-col :span="8">
          <el-input
            placeholder="请输入用户名"
            v-model="queryInfo.username"
            clearable
            @clear="getUserList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUser"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addUserDialog = true"
            >添加用户</el-button
          >
        </el-col>
      </el-row>

      <!-- 用户列表区域 -->
      <el-table :data="userlist" border stripe="">
        <el-table-column type="index" />
        <el-table-column label="用户名" prop="username" />
        <el-table-column label="邮箱" prop="email" />
        <el-table-column label="权限" prop="role" />
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.state"
              @change="userStateChange(scope.row)"
              :disabled="scope.row.role === 'admin'"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="editUserBtn(scope.row.username)"
            ></el-button>
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click="deleteUser(scope.row._id)"
            ></el-button>
            <!-- 分配角色按钮 -->
            <el-tooltip
              effect="dark"
              content="分配权限"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="warning"
                size="mini"
                icon="el-icon-setting"
              ></el-button>
            </el-tooltip>
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

    <!-- 添加用户的对话框 -->
    <el-dialog
      title="添加用户"
      :visible.sync="addUserDialog"
      width="50%"
      @close="addDialogClosed"
    >
      <!-- 内容主体区域 -->
      <el-form
        ref="addFormRef"
        :model="addForm"
        :rules="userFormRules"
        label-width="70px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="权限">
          <el-select v-model="addForm.role" placeholder="请选择">
            <el-option
              v-for="item in roles"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="addForm.state" placeholder="请选择">
            <el-option :value="true" label="启用"> </el-option>
            <el-option label="禁用" :value="false"> </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addUserDialog = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改用户对话框 -->
    <el-dialog
      title="修改用户信息"
      :visible.sync="editUserDialog"
      width="50%"
      @close="editDialogClosed"
    >
      <el-form
        :model="editUserForm"
        :rules="userFormRules"
        ref="editUserRuleForm"
        label-width="70px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editUserForm.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editUserForm.email" disabled></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="editUserForm.password"></el-input>
        </el-form-item>
        <el-form-item label="权限">
          <el-select v-model="editUserForm.role" placeholder="请选择">
            <el-option
              v-for="item in roles"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="editUserForm.state" placeholder="请选择">
            <el-option label="启用" :value="true"> </el-option>
            <el-option label="禁用" :value="false"> </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editUserDialog = false">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Users",
  data() {
    return {
      queryInfo: {
        username: "",
        // 当前页数
        page: 1,
        // 每页展示的条数
        pagesize: 5,
      },
      userlist: [],
      // 总数据条数
      total: 0,
      // 总页数
      count: 0,
      // 添加用户对话框的显示隐藏
      addUserDialog: false,
      // 修改用户对话框的显示隐藏
      editUserDialog: false,
      // 添加用户的表单数据
      addForm: {
        username: "",
        email: "",
        password: "",
        role: "普通用户",
        state: true,
      },
      // 修改用户的表单数据
      editUserForm: {},
      roles: [
        {
          value: "普通用户",
          label: "普通用户",
        },
        {
          value: "管理员",
          label: "管理员",
        },
        {
          value: "超级管理员",
          label: "超级管理员",
        },
      ],
      // 添加用户表单验证规则
      userFormRules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
        email: [
          {
            required: true,
            message: "请输入邮箱",
            trigger: "blur",
          },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
          {
            min: 6,
            max: 20,
            message: "长度在 6 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  components: {},
  created() {
    this.getUserList();
  },
  methods: {
    // 请求所有用户信息
    async getUserList() {
      const data = await this.$http.get("/users", {params: this.queryInfo});
      if (data.status !== 200) {
        return this.$message.error("数据获取失败！");
      }
      this.userlist = data.data.users;
      this.total = data.data.total;
      this.count = data.data.count;
    },

    // 搜索用户
    async getUser() {
      const username = this.queryInfo.username;
      if (!username) {
        return this.$message.error("请输入用户名！");
      }
      const data = await this.$http.get(`/users/user/${username}`);
      if (!data) {
        return this.$message.error("没有查询到用户信息!");
      }
      this.userlist = data.data.users;
    },

    // 监听switch开关改变的事件
    async userStateChange(userinfo) {
      const token = window.sessionStorage.getItem("eleToken");
      const data = await this.$http.post(`/users/${userinfo._id}/state/${userinfo.state}`);
      if (data.status !== 200) {
        userinfo.state = !userinfo.state;
        return this.$message.error("更新用户状态失败!");
      }
      return this.$message.success("更新用户状态成功!");
    },

    // 监听pagesize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getUserList();
    },

    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.page = newPage;
      this.getUserList();
    },

    // 添加用户对话框关闭
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },

    // 点击确定添加用户
    addUser() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return;
        // 发起添加用户的网络请求
        const token = window.sessionStorage.getItem("eleToken");
        const res = await this.$http.post("/users/add", {users: this.addForm});
        if (res.status !== 200) {
          return this.$message.error("邮箱已被注册！");
        }
        this.$message.success("添加用户成功！");
        // 隐藏对话框
        this.addUserDialog = false;
        // 重新获取用户列表数据
        this.getUserList();
      });
    },

    // 编辑用户信息
    async editUserBtn(username) {
      this.editUserDialog = true;
      const data = await this.$http.get(`/users/user/${username}`);
      if (!data) {
        return this.$message.error("没有查询到用户信息!");
      }
      this.editUserForm = data.data.users[0];
      this.editUserForm.password = "";
    },
    // 点击确定发送修改用户信息网络请求
    async editUser() {
      this.$refs.editUserRuleForm.validate(async (valid) => {
        if (!valid) return;

        // 发起修改用户的网络请求
        const _id = this.editUserForm._id;
        const res = await this.$http.post(`/users/edit/${_id}`, {users: this.editUserForm});
        if (res.status !== 200) {
          return this.$message.error("修改用户信息失败！");
        }
        this.$message.success("修改用户信息成功！");
        // 隐藏对话框
        this.editUserDialog = false;
        // 重新获取用户列表数据
        this.getUserList();
      });
    },
    // 修改用户对话框关闭重置操作
    editDialogClosed() {
      // this.getUserList();
      this.$refs.editUserRuleForm.resetFields();
    },

    // 删除用户
    deleteUser(id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( async () => {
          // 发送删除用户的网络请求
          const token = window.sessionStorage.getItem("eleToken");
          const data = await this.$http.delete(`/users/delete/${id}`)
          if(data.status !== 200) {
            return this.$message.error('删除用户失败！')
          }
          this.$message.success('删除用户成功！')
          this.getUserList()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    }
  },
};
</script>

<style scoped>
</style>