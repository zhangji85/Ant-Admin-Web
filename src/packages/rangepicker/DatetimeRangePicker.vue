<template>
  <div class="range-picker-div">
    <a-date-picker
      v-model="startValue"
      style="width: 100%"
      :locale="locale"
      :disabled-date="disabledStartDate"
      show-time
      :format="format"
      :disabled="disabled"
      :size="size"
      placeholder="开始日期时间"
      @openChange="handleStartOpenChange"
    />
    <div style="font-size: 14px;padding: 0 5px">~</div>
    <a-date-picker
      v-model="endValue"
      style="width: 100%"
      :locale="locale"
      :disabled-date="disabledEndDate"
      show-time
      :format="format"
      :disabled="disabled"
      :size="size"
      placeholder="结束日期时间"
      :open="endOpen"
      @openChange="handleEndOpenChange"
    />
  </div>
</template>
<script>
import moment from "moment";
import locale from "ant-design-vue/es/date-picker/locale/zh_CN";
export default {
  name: "v-datetime-range-picker",
  props: {
    value: {
      type: Array,
      default: () => {
        return [];
      }
    },
    format: {
      type: String,
      default: "YYYY-MM-DD HH:mm:ss"
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
      this.$emit("input", []);
      this.$emit("change", []);
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
<style scoped>
.range-picker-div {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: nowrap;
}
</style>
