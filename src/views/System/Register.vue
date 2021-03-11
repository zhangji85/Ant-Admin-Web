<template>
  <div class="register">
    <auth-base>
      <div style="margin-bottom: 20px">注册</div>
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item ref="email" prop="email">
          <a-input
            v-model="form.email"
            size="large"
            placeholder="邮箱"
            @blur="
              () => {
                $refs.email.onFieldBlur();
              }
            "
          />
        </a-form-model-item>
        <a-form-model-item ref="password" prop="password">
          <a-input-password
            v-model="form.password"
            size="large"
            placeholder="至少六位密码，区分大小写"
            @blur="
              () => {
                $refs.password.onFieldBlur();
              }
            "
          />
        </a-form-model-item>
        <a-form-model-item ref="confirmpwd" prop="confirmpwd">
          <a-input-password
            v-model="form.confirmpwd"
            size="large"
            placeholder="确认密码"
            @blur="
              () => {
                $refs.confirmpwd.onFieldBlur();
              }
            "
          />
        </a-form-model-item>
        <a-form-model-item ref="phone" prop="phone">
          <a-input
            v-model="form.phone"
            size="large"
            placeholder="11位手机号"
            @blur="
              () => {
                $refs.phone.onFieldBlur();
              }
            "
          >
            <a-select
              slot="addonBefore"
              :value="form.prefix"
              style="width: 70px"
              @change="handleChange"
            >
              <a-select-option value="86">
                +86
              </a-select-option>
              <a-select-option value="87">
                +87
              </a-select-option>
            </a-select>
          </a-input>
        </a-form-model-item>
        <a-form-model-item ref="captcha" prop="captcha">
          <a-row :gutter="8">
            <a-col :span="16">
              <a-input
                v-model="form.captcha"
                size="large"
                placeholder="验证码"
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
        <a-form-model-item>
          <a-row :gutter="8">
            <a-col :span="12">
              <a-button type="primary" size="large" block @click="onRegister">
                注册
              </a-button>
            </a-col>
            <a-col :span="12">
              <a-button
                type="link"
                size="large"
                block
                class="link-btn"
                @click="toLogin"
              >
                使用已有账户登录
              </a-button>
            </a-col>
          </a-row>
        </a-form-model-item>
      </a-form-model>
    </auth-base>
  </div>
</template>

<script>
import AuthBase from "@/views/System/AuthBase";
export default {
  name: "Register",
  components: {
    AuthBase
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      wrapperCol: { span: 24 },
      form: {
        email: "",
        password: "",
        confirmpwd: "",
        prefix: "86",
        phone: "",
        captcha: ""
      },
      rules: {
        email: [
          {
            type: "email",
            message: "请输入邮箱地址",
            trigger: "blur"
          },
          {
            required: true,
            message: "请输入邮箱地址",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          { min: 6, max: 18, message: "请输入6~18位密码", trigger: "blur" }
        ],
        confirmpwd: [
          {
            validator: validatePass,
            trigger: "blur"
          }
        ],
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
      auth_timer: null
    };
  },
  mounted() {},
  methods: {
    onRegister() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    get_captcha() {
      this.$refs.ruleForm.validateField(["phone"], valid => {
        if (!valid) {
          this.count_down();
        }
      });
    },
    toLogin() {
      this.$router.push({
        path: "/login"
      });
    },
    handleChange(value) {
      this.$set(this.form, "prefix", value);
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
    }
  }
};
</script>
<style scoped>
.link-btn {
  padding: 0 !important;
  text-align: right;
}
</style>
