<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <levelbar></levelbar>
    <tabs-view></tabs-view>
    <!--<error-log v-if="log.length>0" class="errLog-container" :logsList="log"></error-log>-->
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Levelbar from './Levelbar'
import TabsView from './TabsView'
import Hamburger from 'components/common/Hamburger'
import UserInfo from 'components/common/UserInfo'
import Screenfull from 'components/common/Screenfull'

export default {
  components: {
    Levelbar,
    TabsView,
    Hamburger,
    // ErrorLog,
    UserInfo,
    Screenfull
  },
  data () {
    return {
      // log: errLogStore.state.errLog
      todoCount: 0
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar () {
      this.$store.dispatch('app/toggleSideBar')
    },
    logout () {
      this.$store.dispatch('user/logout').then(() => {
        // 为了重新实例化vue-router对象 避免bug
        location.reload()
      })
    },
    userInfo () {
      this.$router.push({path: `/rule/author/staffInfo`})
    },
    changePwd () {
      this.$router.push({path: `/rule/author/modPwd/${this.$store.getters.userId}`})
    }
  },
  mounted () {

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .navbar {
    height: 50px;
    line-height: 50px;
    border-radius: 0px !important;
    width: 100%;
    min-width: 1024px;
    .hamburger-container {
      line-height: 58px;
      height: 50px;
      float: left;
      padding: 0 10px;
      outline: none;
    }
    .errLog-container {
      display: inline-block;
      position: absolute;
      right: 150px;
    }
    .userinfo{
      position: absolute;
      right: 130px;
      top: 8px;
    }
    .schedule-item {
      position: absolute;
      right: 180px;
      top: 8px;
    }
    .screenfull {
      position: absolute;
      right: 90px;
      top: 16px;
      color: red;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .avatar-container {
      height: 50px;
      display: inline-block;
      position: absolute;
      right: 35px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
  .el-dropdown-menu__item {
    line-height: 28px !important;
  }
</style>
