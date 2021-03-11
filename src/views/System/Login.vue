<template>
  <div class="login">
    <auth-base>
      <a-tabs
        size="large"
        v-model="active"
        @change="tabChange"
        class="login-tabs"
      >
        <a-tab-pane forceRender key="accpwdForm" tab="账号密码登录">
          <a-form-model
            ref="accpwdForm"
            :model="accform"
            :rules="accrules"
            :wrapper-col="wrapperCol"
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
        </a-tab-pane>
        <a-tab-pane forceRender key="phoneForm" tab="手机号登录">
          <a-form-model
            ref="phoneForm"
            :model="pform"
            :rules="prules"
            :wrapper-col="wrapperCol"
          >
            <a-form-model-item ref="phone" prop="phone">
              <a-input
                v-model="pform.phone"
                size="large"
                placeholder="手机号"
                @blur="
                  () => {
                    $refs.phone.onFieldBlur();
                  }
                "
              >
                <a-icon slot="prefix" type="mobile" />
              </a-input>
            </a-form-model-item>
            <a-form-model-item ref="captcha" prop="captcha">
              <a-row :gutter="8">
                <a-col :span="16">
                  <a-input
                    v-model="pform.captcha"
                    placeholder="验证码"
                    size="large"
                    @blur="
                      () => {
                        $refs.captcha.onFieldBlur();
                      }
                    "
                  >
                    <a-icon slot="prefix" type="mail" />
                  </a-input>
                </a-col>
                <a-col :span="8">
                  <a-button
                    block
                    size="large"
                    @click="get_captcha"
                    :disabled="disabled"
                  >
                    <span v-if="disabled">{{ timer }}&nbsp;s</span>
                    <span v-else>获取验证码</span>
                  </a-button>
                </a-col>
              </a-row>
            </a-form-model-item>
          </a-form-model>
        </a-tab-pane>
      </a-tabs>
      <a-button
        type="primary"
        style="width:100%;margin-bottom:10px"
        size="large"
        :loading="loading"
        @click="onLogin"
        >登录</a-button
      >
      <a @click="toRegister">还没有账号？立即注册</a>

      <a href class="fr">忘记密码</a>
    </auth-base>
  </div>
</template>

<script>
import AuthBase from "@/views/System/AuthBase";
export default {
  name: "Login",
  components: {
    AuthBase
  },
  data() {
    return {
      wrapperCol: { span: 24 },
      active: "accpwdForm",
      // 账号密码登录
      accform: {
        account: "",
        password: ""
      },
      accrules: {
        account: [
          {
            required: true,
            message: "请输入账号或邮箱地址",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      },
      // 手机号登录
      pform: {
        phone: "",
        captcha: ""
      },
      prules: {
        phone: [
          {
            required: true,
            message: "请输入手机号",
            trigger: "blur"
          },
          {
            pattern: /^1[3|4|5|7|8][0-9]\d{8}$/,
            message: "请输入正确的手机号",
            trigger: "blur"
          }
        ],
        captcha: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur"
          }
        ]
      },
      timer: 60,
      disabled: false,
      auth_timer: null,
      loading: false
    };
  },
  mounted() {},
  methods: {
    onLogin() {
      this.$refs[this.active].validate(valid => {
        if (valid) {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
          }, 3000);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    get_captcha() {
      this.$refs.ruleForm2.validateField(["phone"], valid => {
        if (!valid) {
          this.count_down();
        }
      });
    },
    toRegister() {
      this.$router.push({
        path: "/register"
      });
    },
    count_down() {
      this.disabled = true; //点击button改变v-show的状态
      this.auth_timer = setInterval(() => {
        //定时器设置每秒递减
        this.timer--; //递减时间
        if (this.timer <= 0) {
          this.disabled = false; //60s时间结束还原v-show状态并清除定时器
          clearInterval(this.auth_timer);
          this.timer = 60;
        }
      }, 1000);
    },
    tabChange(activeKey) {
      this.$refs[activeKey].resetFields();
    }
  }
};
</script>
<style scoped>
.login-tabs /deep/ .ant-tabs-top-bar,
.ant-tabs-nav-scroll {
  border-bottom: unset;
  text-align: center;
}
.fr {
  float: right;
}
</style>
