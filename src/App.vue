<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
// 引入jwt-decode,用来解析token
import jwt_decode from "jwt-decode";

export default {
  name: "app",
  components: {},
  created() {
    if (sessionStorage.eleToken) {
      const decoded = jwt_decode(sessionStorage.eleToken);
      // 将 token 存储到 vuex 中
      this.$store.dispatch("setAuthenticated", !this.isEmpty(decoded));
      this.$store.dispatch("setUser", decoded);
    }
  },
  methods: {
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    },
  },
};
</script>

<style>
</style>
