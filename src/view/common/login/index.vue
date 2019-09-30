<template>
  <div class="login-container" id="loginContainer">
    <header class="login-header">
      <div class="box-wrapper">
        <i class="el-icon-edit-outline icon-style"></i>&nbsp;&nbsp;
        <h1>{{systemName}}</h1>
      </div>
    </header>
    <section class="login-body">
      <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left"
               label-width="0px"
               class="card-box login-form">
        <h3 class="title">{{systemName}}</h3>
        <el-form-item prop="account">
          <span class="svg-container"></span>
          <el-input name="account" type="text" @keyup.enter.native="handleLogin" v-model="loginForm.account" autoComplete="on"
                    placeholder="账户"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <span class="svg-container"></span>
          <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password"
                    autoComplete="on" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
            登录
          </el-button>
        </el-form-item>
        <router-link to="/sendpwd" class="forget-pwd" v-if="forgetPwd">
          忘记密码?(或首次登录)
        </router-link>
      </el-form>
    </section>
    <div class="footer">
      <footerbar></footerbar>
    </div>
  </div>
</template>

<script>
import { Footerbar } from 'view/common/layout'
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'login',
  data () {
    const validateAccount = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入账户名'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能小于6位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        account: '',
        password: ''
      },
      loginRules: {
        account: [
          { required: true, trigger: 'blur', validator: validateAccount }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePass }
        ]
      },
      canvasEngine: null,
      loading: false,
      showDialog: false,
      forgetPwd: false
    }
  },
  components: {
    Footerbar
  },
  mounted () {
    document.addEventListener('keyup', this.handleEnter)
  },
  computed: {
    ...mapGetters([
      'systemName'
    ])
},
  methods: {
    handleEnter (e) {
      const event = e || window.event
      if (event.keyCode === 13) {
        this.handleLogin()
      }
    },
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(res => {
            this.loading = false
            if (res.retValue === 1) {
              this.$router.push({ path: '/' })
            } else {
              this.$message.error(res.resultMsg)
            }
          }).catch(err => {
            this.loading = false
            this.$message.error(err.message)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }

}
</script>

<style lang="scss" scoped>
.login-container {
  position: relative;
  height: 100%;
  overflow-y: hidden;
  h1{
    list-style-type: none;
    font-family: PingFangSC-Regular;
    color: #5579ee;
    font-size: 30px;
    margin: 0;
    letter-spacing: 10px;
  }

  .login-header {
    min-width: 1200px;
    background: #efefef;
    .box-wrapper{
      width: 1190px;
      height: 90px;
      line-height: 90px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      .icon-style{
        font-size: 30px;
        color: #5579ee;
      }
    }
  }
  .login-body{
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    min-width: 1200px;
    height: 600px;
    background: #00000e url("../../../assets/img/bg.jpg") no-repeat center 0;
    .login-form {
      width: 460px;
      padding: 30px 50px;
      z-index: 101;
      background: rgba(77, 77, 77, 0.6);
      border: 1px solid rgba(77, 77, 77, 0.6);
      border-radius: 6px;
      transform: translateX(-50%);
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      .title {
        text-align: center;
        margin-bottom: 50px;
        font-size: 36px;
        color: #fff;
      }
    }
  }
  .footer{
    margin: 30px 0px;
  }
  .forget-pwd {
    font-size: 16px;
    color: #fff;
    float: right;
    text-decoration: none;
  }

}
</style>
