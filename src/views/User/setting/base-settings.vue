<template>
  <div class="base-settings">
    <a-row :gutter="16">
      <a-col class="gutter-row" :span="8">
        <div class="form-box">
          <a-form-model
            ref="ruleForm"
            layout="vertical"
            style="width: 60%"
            :model="form"
            :rules="rules"
          >
            <a-form-model-item ref="name" label="昵称" prop="name">
              <a-input v-model="form.name" />
            </a-form-model-item>
            <a-form-model-item ref="sex" label="性别" prop="sex">
              <a-radio-group v-model="form.sex">
                <a-radio value="1">
                  男
                </a-radio>
                <a-radio value="2">
                  女
                </a-radio>
                <a-radio value="3">
                  保密
                </a-radio>
              </a-radio-group>
            </a-form-model-item>
            <a-form-model-item ref="email" label="Email" prop="email">
              <a-input v-model="form.email" />
            </a-form-model-item>
            <a-form-model-item ref="address" label="地址" prop="address">
              <a-input v-model="form.address" />
            </a-form-model-item>
            <a-form-model-item :wrapper-col="{ span: 14, offset: 0 }">
              <a-button type="primary" @click="onSubmit">
                提交保存
              </a-button>
            </a-form-model-item>
          </a-form-model>
        </div>
      </a-col>
      <a-col class="gutter-row" :span="16">
        <div class="avatar-box">
          <a-avatar
            style="backgroundColor:#87d068"
            icon="user"
            :size="128"
            class="avatar"
          />
          <br />
          <a-upload action="/">
            <a-button> <a-icon type="upload" /> Change Avatar</a-button>
          </a-upload>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  name: "base-settings",
  data() {
    return {
      form: {
        name: "Admin",
        sex: "3",
        email: "123456789@qq.com",
        address: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入昵称",
            trigger: "blur"
          }
        ],
        sex: [
          {
            required: true,
            message: "请选择性别",
            trigger: "blur"
          }
        ],
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
        ]
      }
    };
  },
  mounted() {},
  methods: {
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$message.success("提交成功！");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style scoped>
.avatar {
  margin-bottom: 20px;
}
.avatar-box {
  width: 50%;
}
</style>
