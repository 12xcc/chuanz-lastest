<template>
  <div class="container">
    <div class="title">疾病诊断准确率报表</div>
    <el-form :inline="true" class="demo-form-inline" style="margin-top: 20px; margin-left: 20px; margin-bottom: -20px">
      <el-form-item label="选择时间范围">
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="fetchDiagnosticAccuracy">确 定</el-button>
      </el-form-item>
    </el-form>
    <div class="cards-container">
      <div class="card-container">
        <div class="card" v-for="(item, index) in cardData" :key="index">
          <div class="card-title">{{ item.title }}</div>
          <div class="card-bottom">
            <div class="card-data" :id="'card-data-' + index">
              {{ item.data }}
            </div>
            <img :src="item.imgSrc" alt="" />
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
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import { BarChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import allcheckinnumber from "@/assets/screenimgs/allcheckinnumber.svg";
import todayhealth from "@/assets/screenimgs/todayhealth.svg";
import todaydisease from "@/assets/screenimgs/todaydisease.svg";
import { getstrike } from "@/api/report/screen.js";

echarts.use([
  GridComponent,
  BarChart,
  CanvasRenderer,
  TooltipComponent,
  LegendComponent,
]);

function formatDate(date) {
  const y = date.getFullYear();
  const m = (date.getMonth() + 1).toString().padStart(2, "0");
  const d = date.getDate().toString().padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export default {
  setup() {
    const cardData = ref([
      { title: "疾病总确诊人次", data: 0, imgSrc: todaydisease },
      { title: "疾病总诊断人次", data: 0, imgSrc: allcheckinnumber },
      { title: "诊断的总的识别准确率", data: 0, imgSrc: todayhealth },
    ]);

    const chart = ref(null);
    const dateRange = ref([]); // 时间范围绑定变量

    const updateChart = (data) => {
      const diseaseTypeName = [
        "新型冠状病毒感染",
        "流感",
        "鼠疫",
        "感染性腹泻",
        "炭疽",
        "结核病",
        "登革热（蚊媒传染病）",
        "疟疾（蚊媒传染病）",
        "森林脑炎（蜱媒传染病）",
        "发热伴血小板减少综合征（蜱媒传染病）",
        "斑疹伤寒",
        "流行性热出血",
      ];

      const dataHigh = new Array(diseaseTypeName.length).fill(0);
      const dataLow = new Array(diseaseTypeName.length).fill(0);

      data.list.forEach((item) => {
        const index = diseaseTypeName.indexOf(item.diseaseTypeName);
        if (index !== -1) {
          dataHigh[index] = item.predictDiagnoseNumber || 0;
          dataLow[index] = item.actuallyDiagnoseNumber || 0;
        } else {
          console.warn("Disease type not found:", item.diseaseTypeName);
        }
      });

      const option = {
        color: ["#424242", "#285AC8"],
        legend: {
          data: ["预测数", "确诊数"],
          top: "5%",
          selectedMode: false,
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
          formatter: function (params) {
            const diseaseName = params[0].name;
            const diagnosisCount =
              params[0].seriesName === "预测数"
                ? dataHigh[params[0].dataIndex] || 0
                : dataLow[params[0].dataIndex] || 0;

            const confirmedCount = params[1]
              ? dataLow[params[1].dataIndex] || 0
              : 0;

            const chartAccuracy =
              diagnosisCount > 0
                ? ((diagnosisCount / confirmedCount) * 100).toFixed(2)
                : "0.00";

            return `${diseaseName} <br/>预测数 ${diagnosisCount.toFixed(
              2
            )} 人<br/>确诊数 ${confirmedCount.toFixed(
              2
            )} 人<br/>准确率 ${chartAccuracy}%`;
          },
          backgroundColor: "#FFFFFF",
          borderColor: "#FFFFFF",
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
            name: "预测数",
            data: dataHigh,
            type: "bar",
            barWidth: "25%",
            itemStyle: {
              borderRadius: [7, 7, 0, 0],
            },
            showBackground: true,
            backgroundStyle: {
              color: "#F4F4F4",
              borderRadius: [7, 7, 0, 0],
            },
          },
          {
            name: "确诊数",
            data: dataLow,
            type: "bar",
            barWidth: "25%",
            itemStyle: {
              borderRadius: [7, 7, 0, 0],
            },
            showBackground: true,
            backgroundStyle: {
              color: "#F4F4F4",
              borderRadius: [7, 7, 0, 0],
            },
          },
        ],
      };

      const myChart = echarts.init(chart.value);
      myChart.setOption(option);
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    };

    const fetchDiagnosticAccuracy = async () => {
      try {
        let startDate, endDate;
        if (dateRange.value && dateRange.value.length === 2) {
          startDate = dateRange.value[0];
          endDate = dateRange.value[1];
        } else {
          const now = new Date();
          endDate = formatDate(now);
          const lastYear = new Date(now);
          lastYear.setFullYear(now.getFullYear() - 1);
          startDate = formatDate(lastYear);
        }

        console.log("查询时间范围参数：", startDate, endDate);

        // 确保 getstrike 接口传参格式是 { params: { startDate, endDate } }
        const response = await getstrike({ startDate, endDate });

        if (response.data.code === 1 && response.data.data) {
          const result = response.data.data;

          cardData.value[0].data = result.confirmedNumber || 0;
          cardData.value[1].data = result.diagnosedNumber || 0;

          let totalPredictDiagnoseNumber = 0;
          let totalActuallyDiagnoseNumber = 0;

          result.list.forEach((item) => {
            totalPredictDiagnoseNumber += item.predictDiagnoseNumber || 0;
            totalActuallyDiagnoseNumber += item.actuallyDiagnoseNumber || 0;
          });

          const accuracy =
            totalActuallyDiagnoseNumber > 0
              ? (
                  (totalPredictDiagnoseNumber / totalActuallyDiagnoseNumber) *
                  100
                ).toFixed(2)
              : "0.00";

          cardData.value[2].data = accuracy + "%";

          updateChart(result);
        } else {
          console.error("查询失败：", response);
        }
      } catch (error) {
        console.error("接口异常：", error);
      }
    };

    onMounted(() => {
      fetchDiagnosticAccuracy(); // 默认加载一年内数据
    });

    return {
      cardData,
      chart,
      dateRange,
      fetchDiagnosticAccuracy,
    };
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
  margin-top: 20px;
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
  margin-top: 30px;
  width: 100%;
  height: 150px;
  margin-bottom: 5px;
}

.card-container {
  display: flex;
}

.card {
  background: #fafafa;
  border-radius: 10px;
  height: 130px;
  width: 420px;
  margin: 10px;
}

.card-title {
  margin: 15px;
  font-size: 14px;
  font-weight: 550;
  color: #4a4a4a;
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
