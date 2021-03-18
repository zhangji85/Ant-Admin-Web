<template>
  <div class="table-form-parser">
    <!-- table form 结合实例 -->
    <v-table-parser
      :sourceData="sourceData"
      :tableData="tableData"
    ></v-table-parser>
    <v-create-form
      model="modal"
      :sourceData="sourceData"
      :defaultData="rowData"
    ></v-create-form>
  </div>
</template>

<script>
export default {
  name: "v-table-form-parser",
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
    defaultData: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      rowData: this.defaultData
    };
  },
  mounted() {},
  methods: {}
};
</script>
<style scoped></style>
