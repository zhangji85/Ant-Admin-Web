<template>
  <div class="test">
    <v-card>
      test
      <div id="c1"></div>
    </v-card>
  </div>
</template>

<script>
import { Chart } from "@antv/g2";
export default {
  name: "test",
  data() {
    return {};
  },
  mounted() {
    this.createChart();
    const e = document.createEvent("Event");
    e.initEvent("resize", true, true);
    window.dispatchEvent(e);
  },
  methods: {
    createChart() {
      const data = [
        { name: "London", 月份: "Jan.", 月均降雨量: 18.9 },
        { name: "London", 月份: "Feb.", 月均降雨量: 28.8 },
        { name: "London", 月份: "Mar.", 月均降雨量: 39.3 },
        { name: "London", 月份: "Apr.", 月均降雨量: 81.4 },
        { name: "London", 月份: "May", 月均降雨量: 47 },
        { name: "London", 月份: "Jun.", 月均降雨量: 20.3 },
        { name: "London", 月份: "Jul.", 月均降雨量: 24 },
        { name: "London", 月份: "Aug.", 月均降雨量: 35.6 },
        { name: "Berlin", 月份: "Jan.", 月均降雨量: 12.4 },
        { name: "Berlin", 月份: "Feb.", 月均降雨量: 23.2 },
        { name: "Berlin", 月份: "Mar.", 月均降雨量: 34.5 },
        { name: "Berlin", 月份: "Apr.", 月均降雨量: 99.7 },
        { name: "Berlin", 月份: "May", 月均降雨量: 52.6 },
        { name: "Berlin", 月份: "Jun.", 月均降雨量: 35.5 },
        { name: "Berlin", 月份: "Jul.", 月均降雨量: 37.4 },
        { name: "Berlin", 月份: "Aug.", 月均降雨量: 42.4 }
      ];

      const chart = new Chart({
        container: "c1",
        autoFit: true,
        height: 500
      });

      chart.data(data);
      chart.scale("月均降雨量", {
        nice: true
      });
      chart.tooltip({
        showMarkers: false,
        shared: true
      });

      chart
        .interval()
        .position("月份*月均降雨量")
        .color("name")
        .adjust([
          {
            type: "dodge",
            marginRatio: 0
          }
        ]);

      chart.interaction("active-region");
      chart.render();
    }
  }
};
</script>
<style scoped></style>
<style>
::-webkit-scrollbar {
  display: none;
}
html,
body {
  overflow: hidden;
  height: 100%;
  margin: 0;
}
</style>
