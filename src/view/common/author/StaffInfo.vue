<template>
  <div class="user-info">
    <el-row class="top-box">
      <el-button size="medium"  :type="typeInfo === 'userInfoTag'? 'primary':''"  @click="changeStatus('userInfoTag')">个人信息</el-button>
      <el-button size="medium" :type="typeInfo === 'updatePassword'? 'primary':''" @click="changeStatus('updatePassword')">密码修改</el-button>
    </el-row>
    <el-row class="content-form-box" v-if="typeInfo === 'userInfoTag'">
      <el-form :model="userInformation" :rules="infoRules" ref="userInformation" label-width="120px">
        <el-form-item label="用户邮箱" prop="account">
          <el-input v-model="userInformation.account" :disabled="viewFlag"></el-input>
        </el-form-item>
        <el-form-item label="用户姓名" prop="name">
          <el-input v-model="userInformation.name" :disabled="viewFlag"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input  v-model="userInformation.mobile" :disabled="viewFlag"></el-input>
        </el-form-item>
        <el-form-item >
          <el-button size="medium" type="primary" @click="editStaff" v-if="viewFlag && canEdit">编 辑</el-button>
          <el-button size="medium" type="primary" @click="submitStaff" v-if="!viewFlag && canEdit">保 存</el-button>
          <el-button size="medium" @click="cancel" v-if="!viewFlag">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row class="content-form-box" v-if="typeInfo === 'updatePassword'">
      <el-form :model="updatePasswordForm" ref="updatePasswordForm" :rules="rules" status-icon label-width="120px">
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input v-model="updatePasswordForm.oldPassword" maxlength="24"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="updatePasswordForm.newPassword" maxlength="24"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="passwordConform">
          <el-input v-model="updatePasswordForm.passwordConform" maxlength="24"></el-input>
        </el-form-item>
        <el-form-item >
          <el-button size="medium" type="primary" @click="updatePassword('updatePasswordForm')" v-if="canEdit">修 改</el-button>
        </el-form-item>
      </el-form>
    </el-row>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  export default {
    name: 'userInfo',
    data () {
      var validatePass = (rule, value, callback) => {
        if(value == undefined){value = ''}
        if(value.trim() === ''){
          callback(new Error('请输入旧密码'));
        }else{
          callback()
        }
      };
      var validateNewPass = (rule, value, callback) => {
        if(value == undefined){value = ''}
        if(value.trim() === ''){
          callback(new Error('请输入新密码'))
        }else{
          if(this.updatePasswordForm.passwordConform.trim() !== ''){
            this.$refs.updatePasswordForm.validateField('passwordConform');
          };
          callback()
        }
      };
      var validateConfirmNewPass = (rule, value, callback) => {
        if(value == undefined){value = ''}
        if(value.trim() === ''){
          callback(new Error('请输入确认新密码'))
        }else if (value.trim() !== this.updatePasswordForm.newPassword.trim()) {
          callback(new Error('两次输入密码不一致！'))
        }else{
          callback()
        }
      };
      return {
        canEdit: false,
        typeInfo: 'userInfoTag',
        userId: this.$store.getters.userId,
        viewFlag: true,
        updatePasswordForm: {
          oldPassword: '',
          newPassword: '',
          passwordConform: ''
        },
        infoRules: {
          account: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ],
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
          ]
        },
        rules: {
          oldPassword: [
            {validator: validatePass, trigger: 'blur'}
          ],
          newPassword: [
            {validator: validateNewPass, trigger: 'blur'}
          ],
          passwordConform: [
            {validator: validateConfirmNewPass, trigger: 'blur'}
          ]
        }
      }
    },
    computed: {
      ...mapGetters([
        'userInformation'
      ])
    },
    methods: {
      ...mapActions([
        'queryUserInfo',
        'updateUserInfo',
        'changePwd'
      ]),
      changeStatus (type) {
        if (type === 'userInfoTag') {
          this.typeInfo = 'userInfoTag';
          this.updatePasswordForm = {};
          this.$refs['updatePasswordForm'].resetFields();
        }
        if (type === 'updatePassword') {
          this.typeInfo = 'updatePassword';
        }
      },
      editStaff () {
        this.viewFlag = false
      },
      submitStaff () {
        let params = {
          userId: this.userId,
          account: this.userInformation.account,
          mobile: this.userInformation.mobile,
          name: this.userInformation.name
        }

        this.$refs['userInformation'].validate((valid) => {
          if (!valid) return;
          this.updateUserInfo(params).then(res => {
            if (res && res.retValue === 1){
              this.viewFlag = true;
              this.$message.success('提交成功');
            }else{
              this.$message.warning('提交失败');
            }
          })
        })
      },
      updatePassword (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = this.updatePasswordForm;
            params.userId = this.userId;
            this.changePwd(params).then(res => {
              if(res && res.retValue === 1){
                this.updatePasswordForm = {};
                this.$message.success('修改密码成功');
              }else{
                this.$message.error(res.resultMsg || '修改密码失败');
              }
            });
          } else {
            return false;
          }
        });
      },
      cancel () {
        this.viewFlag = true;
      }
    },
    created () {
      let routers = JSON.parse(sessionStorage.getItem('routers'));
      let flg = false;
      routers.forEach(v => {
        if (v.menuCode === 'userInfo') {
          if (v.authSign === '1') {
            flg = true;
          } else {
            flg = false;
          }
        }
      });
      this.canEdit = flg;
      this.queryUserInfo({userId: this.userId});
    }
  }
</script>
<style lang="scss" scoped>
  .top-box{
    padding: 10px;
    background: #ffffff;
  }
</style>
