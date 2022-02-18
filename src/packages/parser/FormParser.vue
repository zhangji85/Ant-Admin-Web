<template>
  <div class="form-parser">
    <a-modal
      v-if="model == 'modal'"
      :visible="value"
      :title="title"
      :width="width + '%'"
      @cancel="handleCancel"
    >
      <template slot="footer">
        <a-button :size="size" key="back" @click="handleCancel">
          取消
        </a-button>
        <a-button
          :size="size"
          key="submit"
          type="primary"
          :loading="confirmLoading"
          @click="handleOk"
        >
          确定
        </a-button>
      </template>
      <v-form-view-parser
        ref="createForm"
        :sourceData="sourceData"
        :defaultData="defaultData"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        :size="size"
      >
      </v-form-view-parser>
    </a-modal>
    <a-drawer
      v-else-if="model == 'drawer'"
      :title="title"
      wrapClassName="create-form-drawer"
      placement="right"
      :closable="true"
      @close="onClose"
      :visible="value"
      :width="width + '%'"
    >
      <v-form-view-parser
        ref="createForm"
        :sourceData="sourceData"
        :defaultData="defaultData"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        :size="size"
      >
      </v-form-view-parser>
      <div class="form-parser-footer">
        <a-button :size="size" key="back" @click="onClose">
          取消
        </a-button>
        <a-button :size="size" type="primary" @click="handleOk">
          确定
        </a-button>
      </div>
    </a-drawer>
    <v-form-view-parser
      v-else
      ref="createForm"
      :sourceData="sourceData"
      :defaultData="defaultData"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
      :size="size"
    >
    </v-form-view-parser>
  </div>
</template>

<script>
export default {
  name: "v-form-parser",
  props: {
    sourceData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    value: Boolean,
    model: String,
    confirmLoading: Boolean,
    defaultData: {
      type: Object,
      default: () => {
        return {};
      }
    },
    title: {
      type: String,
      default: "Title"
    },
    width: {
      type: [Number, String],
      default: 70
    },
    labelCol: {
      type: [Number, String],
      default: 5
    },
    wrapperCol: {
      type: [Number, String],
      default: 18
    },
    // 表单的尺寸
    size: {
      type: String,
      default: "default"
    }
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    onClose() {
      this.$emit("input", false);
    },
    handleOk(e) {
      this.$refs.createForm.handleSubmit(e);
    },
    handleCancel(e) {
      this.$emit("input", false);
    }
  }
};
</script>
<style scoped>
.form-parser-footer {
  padding: 10px 16px;
  position: absolute;
  bottom: 0;
  width: 100%;
  right: 10px;
  border-top: 1px solid #e8e8e8;
  background: #fff;
  text-align: right;
}
</style>
