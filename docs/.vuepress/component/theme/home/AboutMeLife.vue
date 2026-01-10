<template>
  <div class="about-me-card-bg vp-blog-post-item about-me-life">
    <div style="margin-left: 20px">
      <p class="about-me-card-title-normal">𝐿𝒾𝒻𝑒</p>
      <p class="about-me-card-text-big">我的日常</p>
    </div>
    <div ref="chartRef" class="chart-container"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
// import * as echarts from 'echarts';

const chartRef = ref(null);

// 示例数据
const lifeData = [
  { name: "工作", value: (30 / 100).toFixed(2) },
  { name: "生活", value: (20 / 100).toFixed(2) },
  { name: "学习", value: (20 / 100).toFixed(2) },
  { name: "娱乐", value: (20 / 100).toFixed(2) },
  { name: "发呆", value: (10 / 100).toFixed(2) },
];
onMounted(() => {
  import("echarts").then((echarts) => {
    const myChart = echarts.init(chartRef.value);

    const option = {
      tooltip: {
        trigger: "item",
      },
      series: [
        {
          name: "我的日常",
          type: "pie",
          radius: ["40%", "65%"],
          center: ["50%", "35%"],
          startAngle: 180,
          endAngle: 360,
          data: lifeData,
        },
      ],
    };

    myChart.setOption(option);

    // 响应式调整
    window.addEventListener("resize", () => {
      myChart.resize();
    });
  });
});
</script>

<style scoped>
.about-me-life {
  height: 316px;
  padding: 20px 0;
  overflow: inherit;
}

.chart-container {
  height: 100%;
}
</style>
