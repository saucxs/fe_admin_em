<template>
  <footer class="footer">
    <span>欢迎使用{{systemName}}</span>
  </footer>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  export default {
    name: 'Footer',
    data() {
      return {

      }
    },
    computed: {
      ...mapGetters([
        'systemName'
      ])
    },
  }
</script>

<style lang="scss" scoped>
  .footer {
    color: #999;
    font-size: 12px;
    text-align: center;
    height: 30px;
    line-height: 30px;
  }
</style>
