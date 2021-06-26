<template>
  <div>
    <a-row :gutter="24">
      <a-col :xs="24" :sm="11" :md="11" :lg="11">
        <a-date-picker
          v-model="startValue"
          style="width: 100%"
          :locale="locale"
          :disabled-date="disabledStartDate"
          :format="format"
          :disabled="disabled"
          :size="size"
          placeholder="开始日期"
          @openChange="handleStartOpenChange"
        />
      </a-col>
      <a-col :xs="24" :sm="2" :md="2" :lg="2" style="text-align: center">
        <span style="font-size: 18px">~</span>
      </a-col>
      <a-col :xs="24" :sm="11" :md="11" :lg="11">
        <a-date-picker
          v-model="endValue"
          style="width: 100%"
          :locale="locale"
          :disabled-date="disabledEndDate"
          :format="format"
          :disabled="disabled"
          :size="size"
          placeholder="结束日期"
          :open="endOpen"
          @openChange="handleEndOpenChange"
        />
      </a-col>
    </a-row>
  </div>
</template>
<script>
import moment from "moment";
import locale from "ant-design-vue/es/date-picker/locale/zh_CN";
export default {
  name: "v-date-range-picker",
  props: {
    value: {
      type: Array,
      default: () => {
        return [];
      }
    },
    format: {
      type: String,
      default: "YYYY-MM-DD"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: "default"
    }
  },
  data() {
    return {
      locale,
      startValue: null,
      endValue: null,
      endOpen: false
    };
  },
  watch: {
    startValue(val) {
      if (val) {
        this.$set(this.value, 0, moment(val).format(this.format));
        this.$emit("input", this.value);
      } else {
        this.endValue = null;
        this.$emit("input", []);
      }
    },
    endValue(val) {
      if (val) {
        this.$set(this.value, 1, moment(val).format(this.format));
        this.$emit("input", this.value);
      } else {
        this.startValue = null;
        this.$emit("input", []);
      }
    }
  },
  methods: {
    // 清除时间选择
    clearValues() {
      this.startValue = null;
      this.endValue = null;
    },
    disabledStartDate(startValue) {
      const endValue = this.endValue;
      if (!startValue || !endValue) {
        return false;
      }
      return startValue.valueOf() > endValue.valueOf();
    },
    disabledEndDate(endValue) {
      const startValue = this.startValue;
      if (!endValue || !startValue) {
        return false;
      }
      return startValue.valueOf() >= endValue.valueOf();
    },
    handleStartOpenChange(open) {
      if (!open) {
        this.endOpen = true;
      }
    },
    handleEndOpenChange(open) {
      this.endOpen = open;
    }
  }
};
</script>
