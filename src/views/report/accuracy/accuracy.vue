<template>
 <div class="container">
  <div class="title">疾病诊断准确率报表</div>
    <div class="cards-container">
      <div class="card-container">
          <div class="card" v-for="(item, index) in cardData" :key="index">
              <div class="card-title">{{ item.title }}</div>
              <div class="card-bottom">
                  <div class="card-data" :id="'card-data-' + index">{{ item.data }}</div>
                  <img :src="item.imgSrc" alt=""/>
              </div>
          </div>
      </div>
    </div>
    <div class="chart-container">
      <div class="chart-title">疾病诊断准确率报表</div>
      <div ref="chart" class="chart"></div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import * as echarts from "echarts/core";
import { GridComponent, TooltipComponent, LegendComponent } from "echarts/components";
import { BarChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import { CountUp } from 'countup.js';
import allusernumber from '@/assets/screenimgs/allusernumber.svg';
import allcheckinnumber from '@/assets/screenimgs/allcheckinnumber.svg';
import todaycheckin from '@/assets/screenimgs/todaycheckin.svg';
import todayhealth from '@/assets/screenimgs/todayhealth.svg';
import todaydisease from '@/assets/screenimgs/todaydisease.svg';
import todaynotcheckin from '@/assets/screenimgs/todaynotcheckin.svg';
import { getstrike } from '@/api/report/screen.js'
echarts.use([GridComponent, BarChart, CanvasRenderer, TooltipComponent, LegendComponent]);

export default {
  setup() {
    const cardData = ref([
      { title: "疾病总确诊人次", data: 0, imgSrc: todaydisease },
      { title: "疾病总诊断人次", data: 0, imgSrc: allcheckinnumber },
      { title: "诊断的总的识别准确率", data: 0, imgSrc: todayhealth },
    ]);

    const chart = ref(null);

    onMounted(() => {
      cardData.value.forEach((item, index) => {
        const countUp = new CountUp(`card-data-${index}`, item.data);
        countUp.start();
      });

      const myChart = echarts.init(chart.value);

      const diseaseTypeName = [
        "新型冠状病毒",
        "流感",
        "鼠疫",
        "感染性腹泻",
        "炭疽",
        "结核病",
        "登革热(蚊媒传染病)",
        "疟疾(蚊媒传染病)",
        "森林脑炎(蜱媒传染病)",
        "发热伴血小板减少综合征(蜱媒传染病)",
        "斑疹伤寒",
        "流行性热出血"
      ];
      const dataHigh = [80, 70, 60, 90, 50, 85, 75, 65, 95, 55, 80, 100];
      const dataLow = [50, 65, 55, 70, 40, 65, 65, 55, 80, 45, 70, 80];
      const option = {
        color: ["#424242", "#285AC8"],
        legend: {
          data: ["诊断数", "确诊数"],
          top: "5%",
        },
        grid: {
          left: "4%",
          right: "1%",
          top: "20%",
          bottom: "30%",
        },
        xAxis: {
          type: "category",
          data: diseaseTypeName,
          axisLabel: {
            interval: 0,
            rotate: 45,
          },
          axisLine: { show: false },
          axisTick: { show: false },
        },
        yAxis: {
          type: "value",
          axisLine: { show: false },
          axisTick: { show: false },
          splitLine: { show: false },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: { type: "shadow" },
          formatter: function (params) {
            let highValue = null;
            let lowValue = null;
            params.forEach((param) => {
              if (param.seriesName === "诊断数" && param.value !== '-') highValue = param.value;
              if (param.seriesName === "确诊数" && param.value !== '-') lowValue = param.value;
            });

            let tooltipContent = `${params[0].name}<br>`;
            params.forEach((param) => {
              tooltipContent += `${param.seriesName}: ${param.value}<br>`;
            });

            if (highValue !== null && lowValue !== null) {
              const accuracyRate = ((lowValue / highValue) * 100).toFixed(2);
              tooltipContent += `准确率: ${accuracyRate}%`;
            }

            return tooltipContent;
          },
          backgroundColor: "#FFFFFF",
          borderColor: "#DDDDDD",
          borderWidth: 1,
          padding: [10, 10],
          textStyle: {
            color: "#333333",
            fontSize: 14,
          },
          extraCssText: "border-radius: 4px;",
        },
        series: [
          {
            name: "诊断数",
            data: dataHigh,
            type: "bar",
            barWidth: "25%",
            barCategoryGap: "100%",
            stack: "0%",
            itemStyle: {
              borderRadius: [7, 7, 0, 0],
            },
          },
          {
            name: "确诊数",
            data: dataLow,
            type: "bar",
            barWidth: "25%",
            barCategoryGap: "100%",
            stack: "10%",
            itemStyle: {
              borderRadius: [7, 7, 0, 0],
            },
          },
        ],
      };

      myChart.setOption(option);

      window.addEventListener("resize", () => {
        myChart.resize();
      });
    });

    return { cardData, chart };
  },
};
</script>

<style scoped>
.container {
  padding-top: 10px;
  width: 100%;
  height: 550px;
  background-color: #ffffff;
  padding-bottom: 5px;
  padding-right: 5px;
}

.title-container {
  margin-top: 30px;
  margin-left: 10px;
  align-items: center;
}

.blue-box {
  width: 6px;
  height: 22px;
  background-color: #285ac8;
  margin-right: 10px;
}

.title-text {
  font-size: 16px;
  font-weight: bold;
  color: #333333;
}

.contents {
  display: flex;
  align-items: center;
  margin-left: 20px;
}

.el-radio {
  margin-left: 60px;
  margin-top: 10px;
}

.date-selection-container {
  margin-top: 20px;
  margin-left: 90px;
}

.el-checkbox-group {
  margin-top: 10px;
  margin-left: 60px;
}

.title {
  text-align: center;
  width: 100%;
  font-size: 22px;
  font-weight: bold;
  color: #333333;
  padding-top: 20px;
  padding-left: 10px;
}

.cards-container {
  margin-top: 50px;
  width: 100%;
  height: 150px;
  margin-bottom: 5px;
}

.card-container {
  display: flex;
}

.card {
  background: #FAFAFA;
  border-radius: 10px;
  height: 130px;
  width: 420px;
  margin: 10px;
}

.card-title {
  margin: 15px;
  font-size: 14px;
  font-weight: 550;
  color: #4A4A4A;
}

.card-bottom {
  display: flex;
}

img {
  height: 50px;
  width: 50px;
  margin-left: 250px;
  margin-top: 5px;
}

.card-data {
  width: 74px;
  font-size: 24px;
  margin-top: 15px;
  margin-left: 15px;
  font-weight: bold;
  color: #333333;
}

.chart-container {
  width: auto;
  height: 100%;
  background-color: #fafafa;
  border-radius: 5px;
  margin-left: 10px;
  margin-bottom: 5px;
  position: relative;
  padding: 10px;
}

.chart-title {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 14px;
  font-weight: bold;
  color: #4a4a4a;
  background-color: #fafafa;
  padding: 2px 5px;
  border-radius: 3px;
  z-index: 10;
}

.chart {
  width: 100%;
  height: 100%;
}
</style>
