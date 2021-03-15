<template>
  <div class="user">
    <a-card :bordered="false">
      <a-tabs defaultActiveKey="1" :tabPosition="tabPosition">
        <a-tab-pane tab="基本设置" key="1">
          <base-settings></base-settings>
        </a-tab-pane>
        <a-tab-pane tab="安全设置" key="2">
          <security />
        </a-tab-pane>
        <a-tab-pane tab="新消息通知" key="3">新消息通知</a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>

<script>
import security from "@/views/User/setting/security";
import baseSettings from "@/views/User/setting/base-settings";
export default {
  name: "User",
  components: {
    security,
    baseSettings
  },
  data() {
    return {
      tabPosition: "left"
    };
  },
  mounted() {},
  methods: {}
};
</script>
<style scoped></style>
