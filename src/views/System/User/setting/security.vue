<template>
  <div class="security">
    <a-list itemLayout="horizontal" :dataSource="data">
      <a-list-item slot="renderItem" slot-scope="item, index" :key="index">
        <a-list-item-meta>
          <a slot="title">{{ item.title }}</a>
          <span slot="description">
            <span class="security-list-description">{{
              item.description
            }}</span>
            <span v-if="item.value">:</span>
            <span class="security-list-value">{{ item.value }}</span>
          </span>
        </a-list-item-meta>
        <template v-if="item.actions">
          <a slot="actions">{{ item.actions.title }}</a>
        </template>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
let data = [
  {
    title: '账户密码',
    description: '当前密码强度',
    value: '强',
    actions: {
      title: '修改'
    }
  },
  {
    title: '密保手机',
    description: '已绑定手机',
    value: '178****6855',
    actions: {
      title: '修改'
    }
  },
  {
    title: '密保问题',
    description: '未设置密保问题，密保问题可有效保护账户安全',
    value: '',
    actions: {
      title: '设置'
    }
  },
  {
    title: '备用邮箱',
    description: '已绑定邮箱',
    value: '1808***436@qq.com',
    actions: {
      title: '修改'
    }
  },
  {
    title: 'MFA 设备',
    description: '未绑定 MFA 设备，绑定后，可以进行二次确认',
    value: '',
    actions: {
      title: '绑定'
    }
  }
];
export default {
  data() {
    return {
      data: Object.freeze(data)
    };
  }
};
</script>

<style scoped></style>
