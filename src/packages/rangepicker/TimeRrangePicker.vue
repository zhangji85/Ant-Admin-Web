<template>
  <div>
    <a-row :gutter="24">
      <a-col :xs="24" :sm="11" :md="11" :lg="11">
        <a-time-picker
          v-model="startValue"
          style="width: 100%"
          :locale="locale"
          :disabledHours="disabledStartHours"
          :disabledMinutes="disabledStartMinutes"
          :disabledSeconds="disabledStartSeconds"
          :format="format"
          :disabled="disabled"
          :size="size"
          placeholder="开始时间"
          @openChange="handleStartOpenChange"
        />
      </a-col>
      <a-col :xs="24" :sm="2" :md="2" :lg="2" style="text-align: center">
        <span style="font-size: 18px">~</span>
      </a-col>
      <a-col :xs="24" :sm="11" :md="11" :lg="11">
        <a-time-picker
          v-model="endValue"
          style="width: 100%"
          :locale="locale"
          :disabledHours="disabledEndHours"
          :disabledMinutes="disabledEndMinutes"
          :disabledSeconds="disabledEndSeconds"
          :format="format"
          :disabled="disabled"
          :size="size"
          placeholder="结束时间"
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
  name: "v-time-range-picker",
  props: {
    value: {
      type: Array,
      default: () => {
        return [];
      }
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
      format: "HH:mm:ss",
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
    // 开始时间限制
    disabledStartHours() {
      let hours = [];
      let time = moment(this.endValue).format(this.format);
      let timeArr = time.split(":");
      for (var i = 23; i > parseInt(timeArr[0]); i--) {
        hours.push(i);
      }
      return hours;
    },
    disabledStartMinutes(selectedHour) {
      let time = moment(this.endValue).format(this.format);
      let timeArr = time.split(":");
      let minutes = [];
      if (selectedHour == parseInt(timeArr[0])) {
        for (var i = 59; i > parseInt(timeArr[1]); i--) {
          minutes.push(i);
        }
      }
      return minutes;
    },
    disabledStartSeconds(selectedHour, selectedMinute) {
      let time = moment(this.endValue).format("HH:mm:ss");
      let timeArr = time.split(":");
      let second = [];
      if (
        selectedHour == parseInt(timeArr[0]) &&
        selectedMinute == parseInt(timeArr[1])
      ) {
        for (var i = 59; i > parseInt(timeArr[2]); i--) {
          second.push(i);
        }
      }
      return second;
    },
    // 结束时间限制
    disabledEndHours() {
      let hours = [];
      let time = moment(this.startValue).format("HH:mm:ss");
      let timeArr = time.split(":");
      for (var i = 0; i < parseInt(timeArr[0]); i++) {
        hours.push(i);
      }
      return hours;
    },
    disabledEndMinutes(selectedHour) {
      let time = moment(this.startValue).format("HH:mm:ss");
      let timeArr = time.split(":");
      let minutes = [];
      if (selectedHour == parseInt(timeArr[0])) {
        for (var i = 0; i < parseInt(timeArr[1]); i++) {
          minutes.push(i);
        }
      }
      return minutes;
    },
    disabledEndSeconds(selectedHour, selectedMinute) {
      let time = moment(this.startValue).format("HH:mm:ss");
      let timeArr = time.split(":");
      let second = [];
      if (
        selectedHour == parseInt(timeArr[0]) &&
        selectedMinute == parseInt(timeArr[1])
      ) {
        for (var i = 0; i < parseInt(timeArr[2]); i++) {
          second.push(i);
        }
      }
      return second;
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
