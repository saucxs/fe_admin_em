<template>
  <header class="header">
    <div class="header-box">
      <el-row type="flex" justify="center">
        <el-col :span="12">
          <div class="header-logo">
            <a href="/">{{systemName}}</a>
          </div>
        </el-col>
        <el-col :span="11">
          <el-row type="flex" justify="end" align="middle">
            <!--<el-tooltip effect="dark" content="待办日程" placement="bottom" v-if="todoCount > 0">-->
              <!--<el-badge :value="todoCount" :max="10" class="schedule-item">-->
                <!--<schedule-alarm class="schedule-alarm right-menu-item"></schedule-alarm>-->
              <!--</el-badge>-->
            <!--</el-tooltip>-->
            <el-tooltip effect="dark" content="全屏" placement="bottom">
              <screenfull class="screenfull right-menu-item"></screenfull>
            </el-tooltip>
            <el-dropdown>
              <div class="header-user-name">{{$store.getters.staffCode}}<i class="el-icon-caret-bottom el-icon--right"></i></div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item><span @click="userInfo" style="display:block;">个人信息</span></el-dropdown-item>
                <!--<el-dropdown-item><span @click="changePwd" style="display:block;">修改密码</span></el-dropdown-item>-->
                <el-dropdown-item><span @click="logout" style="display:block;">退出登录</span></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </header>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import Screenfull from 'components/common/Screenfull'
  export default {
    name: 'Header',
    components: {
      Screenfull
    },
    data() {
      return {

      }
    },
    computed: {
      ...mapGetters([
        'systemName'
      ])
    },
    methods: {
      logout () {
        this.$store.dispatch('user/logout').then(() => {
          // 为了重新实例化vue-router对象 避免bug
          location.reload()
        })
      },
      userInfo () {
        this.$router.push({path: `/inner/author/staffInfo`})
      },
      // changePwd () {
      //   this.$router.push({path: `/inner/author/modPwd/${this.$store.getters.userId}`})
      // }
    }
  }

</script>

<style lang="scss" scoped>
  .header {
    color: #fff;
    font-size: 18px;
    background: #3a79ff;
    height: 46px;
    line-height: 46px;
    font-weight: 700;
    .header-box{
      /*width: 1440px;*/
      margin: 0 auto;
      background: #3a79ff;
      .screenfull {
        margin-right: 20px;
      }
      a{
        color: #ffffff;
      }
    }
    .header-user-name {
        cursor: pointer;
        color: #fff;
    }
  }
</style>
