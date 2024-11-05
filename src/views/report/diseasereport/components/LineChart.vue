<template>
<!-- 暂时弃用，已合并到父组件 -->
  <div class="chart-container">
    <div ref="chart" class="chart"></div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import * as echarts from "echarts";
import dayjs from "dayjs"; // 用于日期处理

const props = defineProps({
  DiseaseType: {
    type: Array,
    default: () => [],
  },
  TimePeriod: {
    type: Number,
    default: 1, // 默认时间段为“当天”
  },
  customDateRange: {
    type: Array,
    default: () => [],
  },
});

const chart = ref(null);


const allData = {
  新型冠状病毒感染: [120, 245, 300, 150, 180, 220, 330, 280, 200, 250, 190, 230],
  流感: [50, 75, 90, 65, 80, 110, 150, 130, 140, 120, 100, 110],
  鼠疫: [180, 200, 170, 160, 180, 190, 210, 190, 200, 180, 190, 220],
  感染性腹泻: [210, 220, 210, 190, 200, 230, 250, 240, 220, 210, 230, 250],
  炭疽: [300, 320, 310, 290, 310, 330, 350, 340, 320, 310, 330, 340],
  结核病: [100, 110, 105, 115, 120, 110, 120, 130, 140, 120, 130, 120],
  "登革热（蚊媒传染病）": [300, 310, 320, 330, 340, 350, 360, 370, 380, 390, 400, 410],
  "疟疾（蚊媒传染病）": [200, 210, 220, 230, 240, 250, 260, 270, 280, 290, 300, 310],
  "森林脑炎（蜱媒传染病）": [60, 70, 80, 70, 60, 50, 40, 50, 60, 70, 80, 90],
  "发热伴血小板减少综合征（蜱媒传染病）": [10, 15, 12, 14, 16, 18, 20, 22, 25, 30, 35, 40],
  斑疹伤寒: [110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220],
  流行性出血热: [40, 50, 45, 55, 60, 65, 70, 75, 80, 85, 90, 95],
  其他: [90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200],
};

// 用于时间段选择的模拟数据
const periodData = {
  1: {
    // 当天
    xAxisData: ["0-6时", "6-12时", "12-18时", "18-24时"],
    data: {
      新型冠状病毒感染: [120, 150, 180, 220],
      流感: [50, 65, 80, 110],
      鼠疫: [180, 160, 180, 200],
      感染性腹泻: [210, 190, 230, 250],
      炭疽: [300, 290, 310, 340],
      结核病: [100, 115, 120, 130],
      "登革热（蚊媒传染病）": [300, 330, 340, 370],
      "疟疾（蚊媒传染病）": [200, 230, 240, 270],
      "森林脑炎（蜱媒传染病）": [60, 70, 60, 80],
      "发热伴血小板减少综合征（蜱媒传染病）": [10, 14, 18, 22],
      斑疹伤寒: [110, 140, 150, 180],
      流行性出血热: [40, 55, 60, 75],
      其他: [90, 120, 130, 160],
    },
  },
  2: {
    // 最近一周
    xAxisData: Array.from({ length: 7 }, (_, i) =>
      dayjs()
        .subtract(6 - i, "day")
        .format("YYYY-MM-DD")
    ),
    data: {
      新型冠状病毒感染: [120, 245, 300, 150, 180, 220, 330],
      流感: [50, 75, 90, 65, 80, 110, 150],
      鼠疫: [180, 200, 170, 160, 180, 190, 210],
      感染性腹泻: [210, 220, 210, 190, 200, 230, 250],
      炭疽: [300, 320, 310, 290, 310, 330, 350],
      结核病: [100, 110, 105, 115, 120, 110, 120],
      "登革热（蚊媒传染病）": [300, 310, 320, 330, 340, 350, 360],
      "疟疾（蚊媒传染病）": [200, 210, 220, 230, 240, 250, 260],
      "森林脑炎（蜱媒传染病）": [60, 70, 80, 70, 60, 50, 40],
      "发热伴血小板减少综合征（蜱媒传染病）": [10, 15, 12, 14, 16, 18, 20],
      斑疹伤寒: [110, 120, 130, 140, 150, 160, 170],
      流行性出血热: [40, 50, 45, 55, 60, 65, 70],
      其他: [90, 100, 110, 120, 130, 140, 150],
    },
  },
  3: {
    // 最近一个月
    xAxisData: Array.from({ length: 6 }, (_, i) => {
      const start = dayjs().subtract(i * 5, "day");
      const end = start.add(4, "day"); // 5天为一个单位
      return `${start.format("MM.DD")}-${end.format("MM.DD")}`;
    }).reverse(),
    data: {
      新型冠状病毒感染: [120, 245, 300, 150, 180, 220],
      流感: [50, 75, 90, 65, 80, 110],
      鼠疫: [180, 200, 170, 160, 180, 190],
      感染性腹泻: [210, 220, 210, 190, 200, 230],
      炭疽: [300, 320, 310, 290, 310, 330],
      结核病: [100, 110, 105, 115, 120, 110],
      "登革热（蚊媒传染病）": [300, 310, 320, 330, 340, 350],
      "疟疾（蚊媒传染病）": [200, 210, 220, 230, 240, 250],
      "森林脑炎（蜱媒传染病）": [60, 70, 80, 70, 60, 50],
      "发热伴血小板减少综合征（蜱媒传染病）": [10, 15, 12, 14, 16, 18],
      斑疹伤寒: [110, 120, 130, 140, 150, 160],
      流行性出血热: [40, 50, 45, 55, 60, 65],
      其他: [90, 100, 110, 120, 130, 140],
    },
  },
  4: {
    // 最近一年
    xAxisData: Array.from({ length: 12 }, (_, i) =>
      dayjs()
        .subtract(11 - i, "month")
        .format("YYYY-MM")
    ),
    data: {
      新型冠状病毒感染: allData["新型冠状病毒感染"],
      流感: allData["流感"],
      鼠疫: allData["鼠疫"],
      感染性腹泻: allData["感染性腹泻"],
      炭疽: allData["炭疽"],
      结核病: allData["结核病"],
      "登革热（蚊媒传染病）": allData["登革热（蚊媒传染病）"],
      "疟疾（蚊媒传染病）": allData["疟疾（蚊媒传染病）"],
      "森林脑炎（蜱媒传染病）": allData["森林脑炎（蜱媒传染病）"],
      "发热伴血小板减少综合征（蜱媒传染病）": allData["发热伴血小板减少综合征（蜱媒传染病）"],
      斑疹伤寒: allData["斑疹伤寒"],
      流行性出血热: allData["流行性出血热"],
      其他: allData["其他"],
    },
  },
  5: {
    // 自定义数据
    xAxisData: [],
    // props.customDateRange.map(date => dayjs(date).format("MM-DD")), // 需要自定义选择日期的数据
    data: {
      
    },
  },
};

// 初始化图表
const initChart = () => {
  if (!chart.value) return;

  const myChart = echarts.init(chart.value);

  const updateChart = () => {
    const selectedTypes = props.DiseaseType;
    let timePeriodData = periodData[props.TimePeriod] || {
      xAxisData: [],
      data: allData,
    };

    // 如果选择的是自定义时间段
    if (props.TimePeriod === 5) {
      const startDate = dayjs(props.customDateRange[0]);
      const endDate = dayjs(props.customDateRange[1]);
      const xAxisData = [];

      // 生成自定义日期范围内的每一天
      for (let date = startDate; date.isBefore(endDate) || date.isSame(endDate); date = date.add(1, 'day')) {
        xAxisData.push(date.format("MM-DD"));
      }

      timePeriodData = {
        xAxisData,
        data: {},
      };

      // 生成自定义数据
      props.DiseaseType.forEach(type => {
        timePeriodData.data[type] = new Array(xAxisData.length).fill(0); // 这里用 0 填充，您可以根据实际数据替换
      });
    }

    // 清除图表数据
    myChart.clear();

    // 过滤数据，只保留被选中的疾病类型
    const filteredSeries = Object.entries(timePeriodData.data)
      .filter(([name]) => selectedTypes.includes(name))
      .map(([name, data], index) => ({
        name,
        type: "line",
        data,
        smooth: true,
        itemStyle: {
          color: [
            "#285AC8",
            "#6b5b95",
            "#88b04b",
            "#f7cac9",
            "#92a8d1",
            "#ffcc5c",
            "#ff6f61",
            "#6b5b95",
            "#88b04b",
            "#f7cac9",
            "#92a8d1",
            "#ffcc5c",
          ][index % 12],
        },
      }));

    const option = {
      tooltip: {
        trigger: "axis",
      },
      legend: {
        show: false,
      },
      xAxis: {
        type: "category",
        data: timePeriodData.xAxisData,
      },
      yAxis: {
        type: "value",
      },
      series: filteredSeries,
    };

    myChart.setOption(option);
  };

  // 监视时间段和疾病类型的变化
  watch(
    () => [props.DiseaseType, props.TimePeriod],
    updateChart,
    {
      immediate: true,
    }
  );

  // 监视自定义日期范围变化
  watch(() => props.customDateRange, () => {
    if (props.TimePeriod === 5) {
      updateChart();
    }
  });
};

onMounted(() => {
  initChart();
});
</script>
<style scoped>
.chart-container {
  width: 100%;
  height: 400px;
}

.chart {
  width: 100%;
  height: 100%;
}
</style>
