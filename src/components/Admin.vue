<template>
  <div>{{ user.name }}</div>
</template>

<script>
export default {
  name: 'Admin',
  data () {
    return {
      
    };
  },
  components: {},
  methods: {},
  computed: {
    user() {
      return this.$store.getters.user;
    },
  }
}
</script>

<style scoped>
</style>