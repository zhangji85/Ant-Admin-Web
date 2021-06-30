<template>
  <div class="form-view-parser">
    <a-spin :spinning="loading">
      <a-form-model
        :model="defaultData"
        :rules="rules"
        :labelCol="{ span: labelCol }"
        :wrapperCol="{ span: wrapperCol }"
        ref="parserForm"
        class="form"
      >
        <a-row>
          <template v-for="item in sourceData">
            <a-col :xs="24" :sm="24" :md="12" :lg="12" :key="item._uuid">
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
                  <!-- input 输入框 -->
                  <a-input
                    v-if="item.formOptions.el == 'input'"
                    :disabled="item._disabled"
                    :size="size"
                    :placeholder="item.formOptions.placeholder"
                    :type="item.formOptions.type"
                    :ref="item.dataIndex"
                    :allowClear="item.formOptions.allowClear"
                    v-model="defaultData[item.dataIndex]"
                  >
                  </a-input>
                  <!-- input.search 搜索框 -->
                  <a-input-search
                    v-if="item.formOptions.el == 'input.search'"
                    :disabled="item._disabled"
                    :size="size"
                    :placeholder="item.formOptions.placeholder"
                    :type="item.formOptions.type"
                    v-model="defaultData[item.dataIndex]"
                  ></a-input-search>
                  <!-- select 选择器 -->
                  <a-select
                    v-else-if="item.formOptions.el == 'select'"
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
                  <!-- datapicker 日期选择器 -->
                  <a-date-picker
                    style="width: 100%"
                    :locale="locale"
                    v-else-if="item.formOptions.el == 'datepicker'"
                    :disabled="item._disabled"
                    :size="size"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                    v-model="defaultData[item.dataIndex]"
                  />
                  <!-- timepicker 时间选择器 -->
                  <a-time-picker
                    v-else-if="item.formOptions.el == 'timepicker'"
                    style="width:100%"
                    :locale="locale"
                    :disabled="item._disabled"
                    :size="size"
                    format="HH:mm:ss"
                    value-format="HH:mm:ss"
                    v-model="defaultData[item.dataIndex]"
                  />
                  <!-- datatimepicker 日期时间选择器 -->
                  <a-date-picker
                    style="width: 100%"
                    show-time
                    :locale="locale"
                    v-else-if="item.formOptions.el == 'datetimepicker'"
                    :disabled="item._disabled"
                    :size="size"
                    format="YYYY-MM-DD HH:mm:ss"
                    value-format="YYYY-MM-DD HH:mm:ss"
                    v-model="defaultData[item.dataIndex]"
                  />
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
                  <!-- textarea 文本域 -->
                  <a-textarea
                    v-else-if="item.formOptions.el == 'textarea'"
                    :disabled="item._disabled"
                    :size="size"
                    v-model="defaultData[item.dataIndex]"
                    :rows="3"
                  />
                  <!-- slider 滑动输入条 -->
                  <a-slider
                    v-else-if="item.formOptions.el == 'slider'"
                    :disabled="item._disabled"
                    v-model="defaultData[item.dataIndex]"
                  />
                  <!-- upload 图片上传 -->
                  <div
                    class="clearfix"
                    v-else-if="item.formOptions.el == 'upload'"
                  >
                    <a-upload
                      :action="item.formOptions.action"
                      listType="picture-card"
                      @preview="handlePreview"
                      @change="handleChange($event, item.dataIndex)"
                      :remove="handleRemove"
                      :defaultFileList="defaultData[item.dataIndex]"
                      v-model="fileList"
                    >
                      <div
                        v-if="
                          Array.isArray(defaultData[item.dataIndex]) &&
                            defaultData[item.dataIndex].length < 3
                        "
                      >
                        <a-icon type="plus" />
                        <div class="ant-upload-text">上传</div>
                      </div>
                      <div v-else>
                        <a-icon type="plus" />
                        <div class="ant-upload-text">上传</div>
                      </div>
                    </a-upload>
                    <a-modal
                      :visible="previewVisible"
                      :footer="null"
                      @cancel="handleCancel"
                    >
                      <img
                        alt="example"
                        style="width: 100%"
                        :src="previewImage"
                      />
                    </a-modal>
                  </div>
                  <!-- tree 树形控件 -->
                  <template v-else-if="item.formOptions.el == 'tree'">
                    <a-tree
                      multiple
                      defaultExpandAll
                      @select="onSelect"
                      @expand="onExpand"
                      v-model="defaultData[item.dataIndex]"
                      :treeData="item.formOptions.options"
                    ></a-tree>
                  </template>
                </a-form-model-item>
              </slot>
            </a-col>
          </template>
        </a-row>
      </a-form-model>
    </a-spin>
  </div>
</template>

<script>
import moment from "moment";
import locale from "ant-design-vue/es/date-picker/locale/zh_CN";
export default {
  name: "v-form-view-parser",
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
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      locale,

      previewVisible: false,
      fileList: [],
      previewImage: ""
    };
  },
  mounted() {},
  computed: {
    columns() {
      return this.sourceData.filter(v => {
        return !v.notformRender;
      });
    },
    rules() {
      let rules = {};
      this.columns.forEach((v, i) => {
        let formOptions = v["formOptions"];
        if (formOptions && formOptions["rules"]) {
          rules[v.dataIndex] = formOptions["rules"];
        }
      });
      return rules;
    }
  },
  methods: {
    moment,
    onValuesChange(props, values) {
      //
    },
    handleSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$emit("handle-submit", this.defaultData);
          this.$refs.parserForm.resetFields();
        } else {
          return false;
        }
      });
    },
    handleCancel() {
      this.previewVisible = false;
    },
    handlePreview(file) {
      this.previewImage = file.url || file.thumbUrl;
      this.previewVisible = true;
    },
    handleChange(value, key) {
      console.log(value, key);
      this.fileList = "fileList";
      this.$set(this.defaultData, key, "fileList");
    },
    handleRemove(file) {
      console.log("TCL: remove -> file", file);
    },
    normFile(e) {
      if (Array.isArray(e)) {
        return e;
      }
      return e && e.fileList;
    },
    onSelect(keys) {
      console.log("Trigger Select", keys);
    },
    onExpand() {
      console.log("Trigger Expand");
    }
  }
};
</script>
<style scoped></style>
