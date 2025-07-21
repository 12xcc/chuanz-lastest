<template> 
  <div class="container">
    <div class="chart-container">
      <div class="chart-title">当日疾病人数统计图</div>
      <div ref="chart" class="chart"></div>
    </div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts/core';
import { GridComponent, TooltipComponent } from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { ref, onMounted, watch } from 'vue';
import { getDiseaseDataToday } from '@/api/report/screen.js';
import { useDiseaseStore } from '@/store/diseaseStore';
const diseaseStore = useDiseaseStore();


echarts.use([GridComponent, BarChart, CanvasRenderer, TooltipComponent]);

const chart = ref(null);
let myChart = null;

// 父组件传来的查询日期
const props = defineProps({
  queryDate: {
    type: String,
    required: true
  }
});

const diseaseTypes = [
  "新型冠状病毒感染", "流感", "鼠疫", "感染性腹泻", "炭疽", "结核病",
  "登革热（蚊媒传染病）", "疟疾（蚊媒传染病）", "森林脑炎（蜱媒传染病）", 
  "发热伴血小板减少综合征（蜱媒传染病）", "斑疹伤寒", "流行性热出血", "健康"
];

onMounted(() => {
  myChart = echarts.init(chart.value);
});

// 监听父组件传入的 queryDate 变化，调用接口更新图表
watch(() => props.queryDate, async (newDate) => {
  if (!newDate) return;

  try {
    const response = await getDiseaseDataToday(newDate);
    if (response.data.code === 1) {
      const data = response.data.data || [];
      diseaseStore.setDiseaseData(data);
      updateChart(data);
    } else {
      console.error("获取疾病数据失败:", response.data.msg);
      updateChart([]);
    }
  } catch (error) {
    console.error("请求出错:", error);
    updateChart([]);
  }
}, { immediate: true });

// 更新图表数据和配置
function updateChart(data) {
  if (!myChart) return;

  // 初始化所有疾病为0
  const diseaseDataMap = Object.fromEntries(diseaseTypes.map(type => [type, 0]));

  data.forEach(item => {
    const typeName = item.diagnosisDiseaseTypeName || "健康";
    if (typeName in diseaseDataMap) {
      diseaseDataMap[typeName] = item.count;
    }
  });

  const xAxisData = diseaseTypes;
  const seriesData = diseaseTypes.map(type => diseaseDataMap[type]);

  const option = {
    color: ['#D43030'],
    grid: {
      top: '25%',
      bottom: '5%',
    },
    xAxis: {
      type: 'category',
      data: xAxisData,
      axisLabel: { show: false },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false }
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false }
    },
    tooltip: {
      trigger: 'axis',
      formatter: function(params) {
        const diseaseName = params[0].name;
        const count = seriesData[params[0].dataIndex] || 0;
        return `${diseaseName}: ${count}人`;
      },
      backgroundColor: '#FFFFFF',
      borderColor: '#FFFFFF',
      borderWidth: 1,
      padding: [10, 10],
      textStyle: {
        color: '#333333',
        fontSize: 14,
      },
      extraCssText: 'border-radius: 4px;'
    },
    series: [
      {
        data: seriesData,
        type: 'bar',
        barWidth: '40%',
        itemStyle: { borderRadius: [3, 3, 0, 0] },
        showBackground: true,
        backgroundStyle: { color: '#F4F4F4' }
      }
    ]
  };

  myChart.setOption(option);
}

// 窗口大小变化时重置图表大小
window.addEventListener('resize', () => {
  if (myChart) myChart.resize();
});
</script>

<style scoped>
.container {
  margin-top: 10px;
  width: 100%;
  height: 200px;
}

.chart-container {
  width: 320px;
  height: 200px;
  background-color: #FAFAFA;
  border-radius: 5px;
  margin-left: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  position: relative;
  padding: 10px;  
}

.chart-title {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 14px;
  font-weight: bold;
  color: #4A4A4A;
  background-color: #FAFAFA;
  padding: 2px 5px;
  border-radius: 3px;
  z-index: 10;  
}

.chart {
  width: 100%;
  height: 100%;
}
</style>
