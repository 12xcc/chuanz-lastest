<template>
  <div class="container">
    <div class="chart-container">
      <h3>打卡时间分布</h3>
      <el-radio-group
        v-model="timeRange"
        @change="updateChart"
        class="radio-group"
      >
        <el-radio-button value="最近一周">最近一周</el-radio-button>
        <el-radio-button value="最近一月">最近一月</el-radio-button>
        <el-radio-button value="最近一年">最近一年</el-radio-button>
      </el-radio-group>
      <div ref="chartContainer" class="chart"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import dayjs from "dayjs";
import { getCheckInDailyNumber } from "@/api/report/screen.js"; // 导入接口

export default {
  data() {
    return {
      chartInstance: null,
      timeRange: "最近一周", // 默认显示最近一周
    };
  },
  mounted() {
    this.chartInstance = echarts.init(this.$refs.chartContainer);
    this.updateChart(); // 初始化时更新图表
  },
  methods: {
    async updateChart() {
      let dateList = [];
      const today = dayjs();

      // 根据选中的时间范围生成 dateList
      if (this.timeRange === "最近一周") {
        dateList = [today.subtract(7, 'day').format("YYYY-MM-DD"), today.format("YYYY-MM-DD")];
      } else if (this.timeRange === "最近一月") {
        dateList = [today.subtract(30, 'day').format("YYYY-MM-DD"), today.format("YYYY-MM-DD")];
      } else if (this.timeRange === "最近一年") {
        dateList = [today.subtract(1, 'year').format("YYYY-MM-DD"), today.format("YYYY-MM-DD")];
      }

      // 获取接口数据
      try {
        const response = await getCheckInDailyNumber(dateList);
        if (response.data.code === 1) {
          let xAxisData = [];
          let seriesData = [];

          // 清空数据以防叠加
          xAxisData = [];
          seriesData = [];

          // 遍历每个时间段的数据
          response.data.data.forEach((item) => {
            item.list.forEach((dataPoint) => {
              const diseaseTypeName = dataPoint.diseaseTypeName || "健康";
              const count = dataPoint.count;

              // 如果疾病类型已经在 xAxisData 中，更新对应的 seriesData
              const existingIndex = xAxisData.indexOf(diseaseTypeName);
              if (existingIndex > -1) {
                seriesData[existingIndex] += count;
              } else {
                xAxisData.push(diseaseTypeName); // 添加新的疾病类型
                seriesData.push(count); // 添加对应的打卡数
              }
            });
          });

          // 更新图表
          const option = {
            color: ["#285AC8"],
            grid: {
              top: "10%",
              bottom: "15%",
              left: "15%",
              right: "3%",
            },
            tooltip: {
              trigger: "item", 
              // axisPointer: { type: 'shadow' },
              formatter: function (params) {
                const diseasename = params.name;
                const count = params.value;
                return `${diseasename}: ${count} 人`; 
              },
              backgroundColor: "#FFFFFF",
              borderColor:"#FFFFFF",
              textStyle: {
                color: "#333333",
              },
            },
            xAxis: {
              type: "category",
              data: xAxisData, // 更新横坐标数据
              axisLabel: {
                show: false, // 隐藏横坐标
              },
              axisLine: { show: false },
              axisTick: { show: false },
              splitLine: { show: false },
            },
            yAxis: {
              type: "value",
              axisLabel: {
                show: true,
              },
              axisLine: { show: false },
              axisTick: { show: false },
              splitLine: { show: false },
            },
            series: [
              {
                data: seriesData, // 更新数据
                type: "line",
                smooth: true,
                symbolSize: 10,
                itemStyle: {
                  color: "#285AC8",
                },
                lineStyle: {
                  width: 3,
                },
              },
            ],
          };

          this.chartInstance.setOption(option); 
        } else {
          console.error("获取数据失败:", response.data.msg);
        }
      } catch (error) {
        console.error("请求出错:", error);
      }
    },
  },
};
</script>

<style scoped>
.container {
  background-color: #fafafa;
  margin-top: 64px;
  margin-left: 10px;
}

.chart-container {
  padding: 20px;
  background-color: #fafafa;
  border-radius: 5px;
  width: 340px;
  height: 410px;
}

h3 {
  font-size: 14px;
  font-weight: bold;
  color: #4a4a4a;
  margin-bottom: 10px;
}

.el-radio-group {
  margin-top: 15px;
  margin-left: 30px;
}

.el-radio-button__inner {
  color: #285ac8;
}

.el-radio-button__inner:hover {
  background-color: #285ac8;
  color: white;
}

.chart {
  width: 100%;
  height: 300px;
  margin-top: 20px;
}
</style>
