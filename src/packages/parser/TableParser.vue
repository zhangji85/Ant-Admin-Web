<template>
  <div class="table-parser">
    <a-spin
      :spinning="loading || !reRender"
      :style="{ minHeight: tableBoxHeight + 'px' }"
    >
      <template v-if="columns.length && reRender">
        <div>
          <!-- 表格设置 -->
          <div class="toolbar">
            <div class="toolbar-item">{{ title }}</div>
            <div class="toolbar-right">
              <div class="tool-btns">
                <slot name="toolbtns"></slot>
              </div>
              <!-- 斑马纹 -->
              <div class="toolbar-item">
                <a-tooltip placement="top">
                  <template slot="title">
                    <span>表格斑马纹</span>
                  </template>
                  <a-switch
                    checked-children="开"
                    un-checked-children="关"
                    style="transform: translateY(-12.5%);"
                    @change="renderStripe"
                  />
                </a-tooltip>
              </div>
              <div class="toolbar-vertical">
                <a-divider type="vertical" />
              </div>
              <!-- 刷新 -->
              <div class="toolbar-item">
                <a-tooltip placement="top">
                  <template slot="title">
                    <span>刷新</span>
                  </template>
                  <a-icon type="reload" />
                </a-tooltip>
              </div>
              <!-- 密度 -->
              <div class="toolbar-item">
                <a-tooltip placement="top">
                  <template slot="title">
                    <span>密度</span>
                  </template>
                  <a-dropdown
                    overlayClassName="overlay"
                    placement="bottomCenter"
                    :trigger="['click']"
                  >
                    <a
                      class="ant-dropdown-link"
                      @click="e => e.preventDefault()"
                    >
                      <a-icon
                        type="column-height"
                        style="color: rgba(0, 0, 0, 0.65);"
                      />
                    </a>
                    <a-menu slot="overlay" @click="menuClick">
                      <template v-for="item in meunInfo">
                        <a-menu-item
                          :key="item.key"
                          :class="
                            item.key == tableSize ? 'overlay-selected' : ''
                          "
                        >
                          <div style="width: 60px;">{{ item.title }}</div>
                        </a-menu-item>
                      </template>
                    </a-menu>
                  </a-dropdown>
                </a-tooltip>
              </div>
              <!-- 列设置 -->
              <div class="toolbar-item">
                <a-tooltip placement="top">
                  <template slot="title">
                    <span>列设置</span>
                  </template>
                  <a-popover
                    trigger="click"
                    style="with: 180px"
                    arrow-point-at-center
                    placement="bottomRight"
                    :getPopupContainer="
                      triggerNode => {
                        return triggerNode.parentNode;
                      }
                    "
                  >
                    <template slot="content">
                      <a-checkbox-group
                        :defaultVaule="defaultValue"
                        v-model="checkedList"
                        @change="onChange"
                      >
                        <div
                          v-for="(item, index) in columns"
                          :key="'ch' + index"
                          class="check-item"
                        >
                          <a-icon type="more" style="width: 1px" />
                          <a-icon type="more" />
                          <a-checkbox :value="item.key">
                            {{ item.title }}
                          </a-checkbox>
                        </div>
                      </a-checkbox-group>
                    </template>
                    <div
                      slot="title"
                      class="check-item"
                      style="margin-left: 8px"
                    >
                      <a-checkbox
                        :indeterminate="indeterminate"
                        :checked="checkAll"
                        @change="onCheckAllChange"
                      >
                        <span class="check-title">列展示</span>
                      </a-checkbox>
                      <a-button
                        type="link"
                        class="reset-btn"
                        @click="resetCheck"
                      >
                        重置
                      </a-button>
                    </div>
                    <a-icon type="setting" />
                  </a-popover>
                </a-tooltip>
              </div>
            </div>
          </div>
          <!-- 表格 -->
          <div class="tableBox" ref="tableBox">
            <a-table
              ref="table"
              :locale="locale"
              :rowSelection="rowSelection"
              :size="tableSize"
              :columns="tableHead"
              :data-source="tableData"
              :indentSize="0"
              :bordered="bordered"
              :loading="!reRender"
              :rowKey="
                (record, index) => {
                  return 'tabparser' + index;
                }
              "
              :scroll="{ x: width, y: height }"
              v-resize.debounce.500="getDomWidth"
            >
              <template
                slot-scope="text, record"
                :slot="item.slot"
                v-for="item in tableHead"
              >
                <div
                  :style="{ width: item.width + 'px' }"
                  :key="item.dataIndex"
                >
                  <slot :name="item.slot" :row="record" :header="item">
                    <template v-if="item.slot == 'action'">
                      <div :style="{ width: item.width + 'px' }">
                        <a href="javascript:void(0);">
                          <span @click="handleInfo(text, record)">详情</span>
                          <a-divider type="vertical" />
                          <span @click="handleEdit(text, record)">编辑</span>
                          <a-divider type="vertical" />
                          <a-popconfirm
                            v-if="tableData.length"
                            title="确定删除？"
                            ok-text="确定"
                            cancel-text="取消"
                            @confirm="() => handleDel(text, record)"
                          >
                            <span style="color:#f00">删除</span>
                          </a-popconfirm>
                        </a>
                      </div>
                    </template>
                    <template v-else>
                      <div v-if="item.tooltip">
                        <a-tooltip>
                          <template slot="title">{{ text }}</template>
                          <div
                            class="textover1"
                            :style="{ width: item.width + 'px' }"
                          >
                            {{ text }}
                          </div>
                        </a-tooltip>
                      </div>
                      <div
                        v-else
                        class="textover1"
                        :style="{ width: item.width + 'px' }"
                      >
                        {{ text }}
                      </div>
                    </template>
                  </slot>
                </div>
              </template>
            </a-table>
          </div>
        </div>
      </template>
      <a-card
        :loading="loading"
        v-else
        :style="{ minHeight: tableBoxHeight + 'px', textAlign: 'center' }"
        >暂无数据</a-card
      >
    </a-spin>
  </div>
</template>

<script>
import { getTableScroll } from "@/utils/TableScrollY";
export default {
  name: "v-table-parser",
  props: {
    sourceData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    tableData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    title: {
      type: String
    },
    rowKey: Function,
    loading: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: "middle"
    },
    bordered: {
      type: Boolean,
      default: false
    },
    scrollY: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      locale: {
        filterConfirm: "确定",
        filterReset: "重置",
        emptyText: "暂无数据"
      },
      checkedList: [],
      initChecked: false,
      indeterminate: false,
      checkAll: true,
      tableSize: this.size,
      reRender: true,
      tableBoxWidth: 0,
      tableBoxHeight: 0,
      height: false,
      meunInfo: [
        {
          title: "默认",
          key: "default"
        },
        {
          title: "中等",
          key: "middle"
        },
        {
          title: "紧凑",
          key: "small"
        }
      ]
    };
  },
  watch: {
    size(val) {
      this.reRender = false;
      this.$nextTick(() => {
        this.reRender = true;
      });
    }
  },
  mounted() {},
  computed: {
    rowSelection() {
      return {
        columnWidth: "50px",
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            "selectedRows: ",
            selectedRows
          );
        }
      };
    },
    // 表格的固定宽之和用于滚动
    width() {
      let w = 0;
      let tdPadding = this.tableSize === "small" ? 16 : 32;
      this.sourceData.map(v => {
        if (!v.hidden) {
          w += v.width + tdPadding;
        }
      });
      return w + 200 + 32;
    },
    columns() {
      // 滚动宽度小于容器宽度的时候去掉fixed
      return this.sourceData
        .map((v, i) => {
          if (i === 0 && this.width < this.tableBoxWidth) {
            v.fixed = false;
          }
          v.key = v.dataIndex;
          v.slot = v.dataIndex;
          v.scopedSlots = { customRender: v.dataIndex };
          return v;
        })
        .filter(v => {
          return !v.hidden;
        })
        .concat([
          {
            title: "操作",
            key: "operation",
            width: 200,
            fixed: this.width < this.tableBoxWidth ? false : "right",
            slot: "action",
            scopedSlots: { customRender: "action" }
          }
        ]);
    },
    defaultValue() {
      let defaultValue = [];
      this.columns.forEach((col, i) => {
        defaultValue.push(col["key"]);
      });
      if (!this.initChecked) {
        this.checkedList = defaultValue;
        this.initChecked = true;
      }
      return defaultValue;
    },
    tableHead() {
      let head = [];
      this.columns.forEach((col, i) => {
        if (this.checkedList.includes(col["key"])) {
          head.push(col);
        }
      });
      return head;
    }
  },
  methods: {
    getDomWidth() {
      console.log(">>>>>>>>>>>>>>>>>>>>>>");
      this.tableBoxWidth = this.$refs.tableBox.clientWidth;
      this.tableBoxHeight = this.$refs.tableBox.clientHeight;
      let height =
        getTableScroll({ ref: this.$refs.tableBox }) < 520
          ? document.body.clientHeight - 240
          : getTableScroll({ ref: this.$refs.tableBox });
      this.height = this.scrollY ? height : false;
    },
    handleEdit(text, record) {
      this.$emit("handle-edit", text, record);
      this.$emit("handleEdit", text, record);
    },
    handleInfo(text, record) {
      this.$emit("handle-info", text, record);
      this.$emit("handleInfo", text, record);
    },
    handleDel(text, record) {
      this.$emit("handle-del", text, record);
      this.$emit("handleDel", text, record);
    },
    // 密度下拉菜单选择
    menuClick({ key }) {
      this.tableSize = key;
    },
    // 列设置
    onChange(checkedList) {
      this.indeterminate =
        !!checkedList.length && checkedList.length < this.columns.length;
      this.checkAll = checkedList.length === this.columns.length;
    },
    onCheckAllChange(e) {
      Object.assign(this, {
        checkedList: e.target.checked ? this.defaultValue : [],
        indeterminate: false,
        checkAll: e.target.checked
      });
    },
    resetCheck() {
      Object.assign(this, {
        checkedList: this.defaultValue,
        indeterminate: false,
        checkAll: true
      });
    },
    // 对表格行进行斑马行格式显示
    renderStripe(checked) {
      const table = document.getElementsByClassName("ant-table-row");
      if (table.length > 0) {
        const rowList = [...table];
        rowList.forEach(row => {
          const index = rowList.indexOf(row);
          if (index % 2 !== 0 && checked) {
            row.style.backgroundColor = "#f7f7f7";
          } else {
            row.style.backgroundColor = "#ffffff";
          }
        });
      }
    }
  },
  watch: {
    columns: {
      handler(val) {}
    }
  }
};
</script>
<style scoped>
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  line-height: 64px;
  padding: 0 24px;
}
.tool-btns {
  margin-right: 12px;
}
.toolbar-right {
  display: flex;
  justify-content: flex-end;
}
.toolbar-item {
  margin-left: 16px;
  font-size: 16px;
  cursor: pointer;
}
.toolbar-vertical {
  margin-right: -8px;
  margin-left: 8px;
}
.overlay {
  width: 80px;
}
.overlay-selected {
  color: #1890ff;
  background-color: #e6f7ff;
}
.toolbar-item /deep/ .ant-popover-inner-content {
  padding: 10px 0 !important;
}
.check-item {
  padding: 5px;
}
.reset-btn {
  padding: 0 0 0 20px;
}
.columnHide {
  display: none;
}
</style>
