<template>
  <div class="select-form-parser">
    <a-spin :spinning="loading">
      <a-form-model
        :model="defaultData"
        :labelCol="{ span: labelCol }"
        :wrapperCol="{ span: 24 - parseInt(labelCol) }"
        ref="selectForm"
        class="form"
      >
        <a-row :gutter="24" type="flex" justify="space-between">
          <template v-for="(item, index) in sourceData">
            <a-col
              :xs="24"
              :sm="12"
              :md="12"
              :lg="span"
              :key="item._uuid"
              :style="{ display: index < count ? 'block' : 'none' }"
            >
              <slot
                :name="item.dataIndex"
                :scope="item"
                :value="defaultData[item.dataIndex]"
              >
                <a-form-model-item
                  :key="item._uuid"
                  v-if="item.formOptions"
                  :label="item.title"
                  :prop="item.dataIndex"
                >
                  <!-- select 选择器 -->
                  <a-select
                    v-if="item.formOptions.el == 'select'"
                    :disabled="item._disabled"
                    :size="size"
                    :placeholder="item.formOptions.placeholder"
                    :mode="item.formOptions.type"
                    :allowClear="item.formOptions.allowClear"
                    v-model="defaultData[item.dataIndex]"
                  >
                    <template v-for="opt in item.formOptions.options">
                      <a-select-option :value="opt.value" :key="opt._uuid">
                        {{ opt.label }}
                      </a-select-option>
                    </template>
                  </a-select>
                  <!-- switch 开关 -->
                  <a-switch
                    v-else-if="item.formOptions.el == 'switch'"
                    :disabled="item._disabled"
                    :size="size"
                    :checkedChildren="item.checkedChildren"
                    :unCheckedChildren="item.uncheckedChildren"
                    v-model="defaultData[item.dataIndex]"
                  ></a-switch>
                  <!-- radio 单选框 -->
                  <a-radio-group
                    v-else-if="item.formOptions.el == 'radio'"
                    :disabled="item._disabled"
                    :size="size"
                    v-model="defaultData[item.dataIndex]"
                    :options="item.formOptions.options"
                  ></a-radio-group>
                  <!-- checkbox 复选框 -->
                  <a-checkbox-group
                    v-else-if="item.formOptions.el == 'checkbox'"
                    :disabled="item._disabled"
                    :size="size"
                    v-model="defaultData[item.dataIndex]"
                    :options="item.formOptions.options"
                  ></a-checkbox-group>

                  <!-- cascader 级联选择器 -->
                  <a-cascader
                    v-else-if="item.formOptions.el == 'cascader'"
                    :disabled="item._disabled"
                    :options="item.formOptions.options"
                    :size="size"
                    v-model="defaultData[item.dataIndex]"
                  />
                  <!-- rate 评分 -->
                  <a-rate
                    v-else-if="item.formOptions.el == 'rate'"
                    :disabled="item._disabled"
                    allowHalf
                    v-model="defaultData[item.dataIndex]"
                  />
                  <!-- timepicker 时间选择器 -->
                  <v-time-range-picker
                    ref="selectTimeRange"
                    v-else-if="item.formOptions.el == 'timepicker'"
                    style="width:100%"
                    :locale="locale"
                    :disabled="item._disabled"
                    :size="size"
                    v-model="defaultData[item.dataIndex]"
                  />
                  <!-- datapicker 日期选择器 -->
                  <a-range-picker
                    style="width: 100%"
                    :locale="locale"
                    :disabled="item._disabled"
                    :size="size"
                    v-else-if="item.formOptions.el == 'datepicker'"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                    :placeholder="['开始日期', '结束日期']"
                    v-model="defaultData[item.dataIndex]"
                  />
                  <!-- datatimepicker 日期时间选择器 -->
                  <a-range-picker
                    style="width: 100%"
                    v-else-if="item.formOptions.el == 'datetimepicker'"
                    :locale="locale"
                    :disabled="item._disabled"
                    :size="size"
                    :show-time="{ format: 'HH:mm:ss' }"
                    format="YYYY-MM-DD HH:mm:ss"
                    value-format="YYYY-MM-DD HH:mm:ss"
                    :placeholder="['开始日期时间', '结束日期时间']"
                    v-model="defaultData[item.dataIndex]"
                  />
                  <!-- <v-datetime-range-picker
                    style="width: 100%"
                    show-time
                    :locale="locale"
                    :disabled="item._disabled"
                    :size="size"
                    v-else-if="item.formOptions.el == 'datetimepicker'"
                    format="YYYY-MM-DD HH:mm:ss"
                    v-decorator="[item.dataIndex, { initialValue: [] }]"
                  /> -->
                  <!-- input 输入框 -->
                  <a-input
                    v-else
                    :disabled="item._disabled"
                    :size="size"
                    :placeholder="item.formOptions.placeholder"
                    :type="item.formOptions.type"
                    :ref="item.dataIndex"
                    :allowClear="item.formOptions.allowClear"
                    v-model="defaultData[item.dataIndex]"
                  >
                  </a-input>
                </a-form-model-item>
              </slot>
            </a-col>
          </template>
          <a-col
            :xs="24"
            :sm="12"
            :md="12"
            :lg="searchCol"
            style="text-align: right;"
          >
            <a-form-model-item :wrapperCol="{ span: 24 }">
              <a-button :size="size" @click="handleReset">
                重置
              </a-button>
              <a-button
                style="margin-left: 10px;"
                type="primary"
                :size="size"
                @click="handleSubmit"
              >
                查询
              </a-button>
              <a
                :style="{
                  marginLeft: '8px',
                  fontSize: '14px',
                  display: showExpand ? '' : 'none'
                }"
                @click="expand = !expand"
              >
                {{ expand ? "收起" : "展开" }}
                <a-icon :type="expand ? 'up' : 'down'" />
              </a>
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
    </a-spin>
  </div>
</template>

<script>
import moment from "moment";
import locale from "ant-design-vue/es/date-picker/locale/zh_CN";
export default {
  name: "v-select-form-parser",
  props: {
    sourceData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    defaultData: {
      type: Object,
      default: () => {
        return {};
      }
    },
    span: {
      type: [Number, String],
      default: 12
    },
    labelCol: {
      type: [Number, String],
      default: "5"
    },
    // 表单的尺寸
    size: {
      type: String,
      default: "default"
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      locale,
      expand: false,
      showExpand: true
    };
  },
  mounted() {},
  computed: {
    count() {
      let len = this.sourceData.length;
      if (len) {
        let num = parseInt(24 / parseInt(this.span));
        if (len >= num) {
          return this.expand ? len : num - 1;
        } else {
          this.showExpand = false;
          return len;
        }
      }
      return 0;
    },
    searchCol() {
      let len = this.sourceData.length;
      let num = parseInt(24 / parseInt(this.span));
      if (this.expand) {
        let ys = len % num;
        if (ys == 0) {
          return 24;
        } else {
          return (num - ys) * parseInt(this.span);
        }
      } else if (len < num) {
        return (num - len) * parseInt(this.span);
      }
      return parseInt(this.span);
    },
    timeColumns() {
      // 滚动宽度小于容器宽度的时候去掉fixed
      return this.sourceData.map((v, i) => {
        if (
          v.formOptions.el == "datepicker" ||
          v.formOptions.el == "datetimepicker"
        ) {
          return v;
        }
        return null;
      });
    }
  },
  methods: {
    moment,
    onValuesChange(props, values) {
      //
    },
    handleSubmit() {
      this.$refs.selectForm.validate(valid => {
        if (valid) {
          this.$emit("handle-submit", this.defaultData);
        } else {
          return false;
        }
      });
    },
    handleCancel() {
      this.previewVisible = false;
    },
    onSelect(keys) {
      console.log("Trigger Select", keys);
    },
    onExpand() {
      console.log("Trigger Expand");
    },
    handleReset() {
      this.$refs.selectForm.resetFields();
      this.$refs.selectTimeRange[0].clearValues();
    }
  }
};
</script>
<style scoped></style>
