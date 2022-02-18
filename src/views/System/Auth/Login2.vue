<template>
  <div class="login2">
    <auth-base>
      <a-form-model
        ref="accpwdForm"
        :model="accform"
        :rules="accrules"
        :wrapper-col="wrapperCol"
        style="padding-top: 20px"
      >
        <a-form-model-item ref="account" prop="account">
          <a-input
            v-model="accform.account"
            size="large"
            placeholder="请输入账号或邮箱地址"
            @blur="
              () => {
                $refs.account.onFieldBlur();
              }
            "
          >
            <a-icon slot="prefix" type="user" />
          </a-input>
        </a-form-model-item>
        <a-form-model-item ref="password" prop="password">
          <a-input-password
            v-model="accform.password"
            size="large"
            placeholder="请输入密码"
            @blur="
              () => {
                $refs.password.onFieldBlur();
              }
            "
          >
            <a-icon slot="prefix" type="lock" />
          </a-input-password>
        </a-form-model-item>
      </a-form-model>
      <a-button
        type="primary"
        style="width: 100%; margin-bottom: 10px"
        size="large"
        @click="onLogin"
        :loading="loading"
        >登录</a-button
      >
      <a @click="toRegister">还没有账号？立即注册</a>

      <a href class="fr">忘记密码</a>
    </auth-base>
  </div>
</template>

<script>
import AuthBase from 'views/System/Auth/AuthBase';
export default {
  name: 'Login2',
  components: {
    AuthBase
  },
  data() {
    return {
      wrapperCol: { span: 24 },
      // 账号密码登录
      accform: {
        account: '',
        password: ''
      },
      accrules: {
        account: [
          {
            required: true,
            message: '请输入账号或邮箱地址',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ]
      },
      loading: false
    };
  },
  mounted() {},
  methods: {
    onLogin() {
      this.$refs.accpwdForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
          }, 3000);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    toRegister() {
      this.$router.push({
        path: '/register'
      });
    }
  }
};
</script>
<style scoped>
.fr {
  float: right;
}
</style>
