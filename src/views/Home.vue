<template>
  <div>
      初始化页面
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      
    };
  },
  components: {},
  methods: {
    async getUserInfo() {
      const token = window.sessionStorage.getItem('eleToken')
      const {data} = await this.$http.get('/users/info',{Authorization: token})
    }
  },
  created() {
    this.getUserInfo()
  }
}
</script>

<style scoped>
</style>