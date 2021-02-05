<template>
  <div class="login">
    <div class="loginBox">
      <h2>博客管理员登录</h2>
      <form
        action=""
        method="post"
        @submit.prevent="submit"
        class="form"
      >
        <div class="item">
          <input name="email" type="email" v-model="loginForm.email" required />
          <label for="">邮箱</label>
        </div>
        <div class="item">
          <input name="password" type="password" v-model="loginForm.password" required />
          <label for="">密码</label>
        </div>
        <button class="btn">
          登录
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
// 引入jwt-decode,用来解析token
import jwt_decode from 'jwt-decode'

export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        email: "",
        password: "",
      }
    };
  },
  components: {},
  methods: {
    async submit() {
      // 如果用户没有输入邮件地址和密码
      if (this.loginForm.email.trim().length == 0) {
        alert("请输入邮箱地址");
        return false;
      }
      if (this.loginForm.password.trim().length == 0) {
        alert("请输入密码");
        return false;
      }
      const {data} = await this.$http.post('/users/login', this.loginForm)
      if(data.success) {
        // 存储 token 到 sessionStorage
        const token = data.token
        sessionStorage.setItem('eleToken', token)

        // 解析token
        const decoded = jwt_decode(token)
        
        // 将 token 存储到 vuex 中
        this.$store.dispatch("setAuthenticated", !this.isEmpty(decoded))
        this.$store.dispatch("setUser", decoded)

        // 成功之后的跳转
        this.$router.push('/home')
      }
    },

    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0)
      )
    }
  },
};
</script>

<style scoped>
input,
button {
  background: transparent;
  border: none;
  outline: none;
}
.login {
  height: 100vh;
  background: linear-gradient(#141e30, #243b55);
  color: #11829d;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}
.loginBox {
  width: 400px;
  height: 364px;
  background: rgba(0, 0, 0, 0.5);
  box-shadow: 0 15px 25px 0 rgba(0, 0, 0, 0.6);
  padding: 40px;
  box-sizing: border-box;
}
h2 {
  text-align: center;
  color: #fff;
  margin-bottom: 30px;
  font-size: 24px;
  font-weight: bold;
}
.form {
  position: relative;
}
.item {
  height: 45px;
  border-bottom: 1px solid #fff;
  margin-bottom: 40px;
  position: relative;
}
.item input {
  width: 100%;
  height: 100%;
  color: #fff;
  padding-top: 20px;
  box-sizing: border-box;
}
.item input:focus + label,
.item input:valid + label {
  top: 0px;
  font-size: 12px;
}
.item label {
  position: absolute;
  left: 0;
  top: 12px;
  transition: all 0.5s linear;
}
.btn {
  padding: 10px 20px;
  margin-top: 30px;
  color: #03e9f4;
  position: absolute;
  overflow: hidden;
  right: 0;
  letter-spacing: 2px;
}
.btn:hover {
  background: #03e9f4;
  border-radius: 5px;
  color: #fff;
  box-shadow: 0 0 5px 0 #03e9f4, 0 0 25px 0 #03e9f4, 0 0 50px 0 #03e9f4,
    0 0 100px 0 #03e9f4;
}
.btn > span {
  position: absolute;
}
.btn > span:nth-child(1) {
  width: 100%;
  height: 2px;
  background: -webkit-linear-gradient(left, transparent, #03e9f4);
  left: -100%;
  top: 0;
  animation: line1 1s linear infinite;
}
@keyframes line1 {
  50%,
  100% {
    left: 100%;
  }
}
.btn > span:nth-child(2) {
  width: 2px;
  height: 100%;
  background: -webkit-linear-gradient(top, transparent, #03e9f4);
  right: 0;
  top: -100%;
  animation: line2 1s 0.25s linear infinite;
}
@keyframes line2 {
  50%,
  100% {
    top: 100%;
  }
}
.btn > span:nth-child(3) {
  width: 100%;
  height: 2px;
  background: -webkit-linear-gradient(left, #03e9f4, transparent);
  left: 100%;
  bottom: 0;
  animation: line3 1s 0.5s linear infinite;
}
@keyframes line3 {
  50%,
  100% {
    left: -100%;
  }
}
.btn > span:nth-child(4) {
  width: 2px;
  height: 100%;
  background: -webkit-linear-gradient(top, #03e9f4, transparent);
  left: 0;
  top: 100%;
  animation: line4 1s 0.75s linear infinite;
}
@keyframes line4 {
  50%,
  100% {
    top: -100%;
  }
}
</style>