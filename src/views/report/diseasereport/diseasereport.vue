<template>
  <div class="container">
    <div class="title-container">
      <div class="title">
        <div class="blue-box"></div>
        <span class="title-text">时间段</span>
      </div>
      <span class="contents">
        <el-radio-group v-model="radio">
          <el-radio :value="1">当天</el-radio>
          <el-radio :value="2">最近一周</el-radio>
          <el-radio :value="3">最近一个月</el-radio>
          <el-radio :value="4">最近一年</el-radio>
          <el-radio :value="5">自定义</el-radio>
        </el-radio-group>
      </span>
    </div>
    <div v-if="radio === 5" class="date-selection-container">
      <el-date-picker
        value-format="YYYY-MM-DD"
        v-model="customDateRange"
        type="daterange"
        range-separator="到"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        :size="size"
      />
    </div>

    <div class="title-container">
      <div class="title">
        <div class="blue-box"></div>
        <span class="title-text">数据类型</span>
      </div>
      <span class="contents">
        <el-radio-group v-model="checkList">
          <el-radio label="自动诊断" :value="'自动诊断'">自动诊断</el-radio>
          <el-radio label="医院诊断" :value="'医院诊断'">医院诊断</el-radio>
        </el-radio-group>
      </span>
    </div>

    <div class="title-container">
      <div class="title">
        <div class="blue-box"></div>
        <span class="title-text">疾病类型</span>
      </div>
      <span class="contents">
        <el-checkbox-group v-model="DiseaseType">
          <el-checkbox label="新型冠状病毒感染" value="新型冠状病毒感染" />
          <el-checkbox label="流感" value="流感" />
          <el-checkbox label="鼠疫" value="鼠疫" />
          <el-checkbox label="感染性腹泻" value="感染性腹泻" />
          <el-checkbox label="炭疽" value="炭疽" />
          <el-checkbox label="结核病" value="结核病" />
          <el-checkbox
            label="登革热（蚊媒传染病）"
            value="登革热（蚊媒传染病）"
          />
          <el-checkbox label="疟疾（蚊媒传染病）" value="疟疾（蚊媒传染病）" />
          <el-checkbox
            label="森林脑炎（蜱媒传染病）"
            value="森林脑炎（蜱媒传染病）"
          />
          <el-checkbox
            label="发热伴血小板减少综合征（蜱媒传染病）"
            value="发热伴血小板减少综合征（蜱媒传染病）"
          />
          <el-checkbox label="斑疹伤寒" value="斑疹伤寒" />
          <el-checkbox label="流行性出血热" value="流行性出血热" />
          <el-checkbox label="其他" value="其他" />
        </el-checkbox-group>
      </span>
    </div>

    <div class="chart-container">
      <div ref="chart" class="chart"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import * as echarts from "echarts";
import dayjs from "dayjs";
import DateSelection from "@/components/linedate.vue";
import { getDiseaseStatisticsListInfo } from "@/api/report/screen.js";

const radio = ref(1); // 默认选择当天
const checkList = ref("自动诊断");
const DiseaseType = ref([]);
const customDateRange = ref([]);
const chart = ref(null);

const initChart = () => {
  if (!chart.value) return;
  const myChart = echarts.init(chart.value);

const updateChart = async () => { 
  const selectedTypes = Array.from(DiseaseType.value);
  const sourceType = checkList.value;
  let dateBegin, dateEnd, xAxisData = [];

  const today = dayjs();

  if (radio.value === 1) {
    dateBegin = today.format("YYYY-MM-DD");
    dateEnd = today.format("YYYY-MM-DD");
    xAxisData = ["00-06时", "06-12时", "12-18时", "18-24时"];
  } else if (radio.value === 2) {
    dateBegin = today.subtract(6, "day").format("YYYY-MM-DD");
    dateEnd = today.format("YYYY-MM-DD");
    xAxisData = Array.from({ length: 7 }, (_, i) =>
      today.subtract(i, "day").format("YYYY-MM-DD")
    ).reverse();
  } else if (radio.value === 3) {
    dateBegin = today.subtract(29, "day").format("YYYY-MM-DD");
    dateEnd = today.format("YYYY-MM-DD");
    xAxisData = Array.from({ length: 30 }, (_, i) =>
      today.subtract(i, "day").format("YYYY-MM-DD")
    ).reverse();
  } else if (radio.value === 4) {
    dateBegin = today.subtract(364, "day").format("YYYY-MM-DD");
    dateEnd = today.format("YYYY-MM-DD");
    xAxisData = Array.from({ length: 365 }, (_, i) =>
      today.subtract(i, "day").format("YYYY-MM-DD")
    ).reverse();
  } else if (radio.value === 5 && customDateRange.value.length === 2) {
    // 自定义时间范围
    dateBegin = customDateRange.value[0];
    dateEnd = customDateRange.value[1];

    const start = dayjs(dateBegin);
    const end = dayjs(dateEnd);
    xAxisData = [];

    let current = start;
    while (current.isBefore(end) || current.isSame(end, 'day')) {
      xAxisData.push(current.format("YYYY-MM-DD"));
      current = current.add(1, "day");
    }
  }

  console.log("生成的X轴:", xAxisData);

  try {
    const response = await getDiseaseStatisticsListInfo(
      dateBegin,
      dateEnd,
      selectedTypes,
      sourceType
    );

    // 使用 data.data 作为疾病数据的实际来源
    const diseaseData = response.data.data;
    console.log("API 响应的疾病数据:", diseaseData);

    const seriesData = selectedTypes.map((type) => ({
      name: type,
      type: "line",
      smooth: true,
      data: xAxisData.map(() => 0), 
    }));

    console.log("要查询的疾病类型:", selectedTypes);
    console.log("数据中的键（疾病名称）:", Object.keys(diseaseData));

    selectedTypes.forEach((type, seriesIndex) => {
      const typeData = diseaseData[type];  // 从 diseaseData 获取特定疾病数据
      if (typeData) {
        console.log(`正在处理 ${type} 的数据:`, typeData);

        typeData.forEach((entry) => {
          const entryDate = dayjs(entry.key.join("-")).format("YYYY-MM-DD");
          const entryValue = entry.value;

          console.log(`正在处理 ${type} :`, { 日期: entryDate, 数值: entryValue });

          const xAxisIndex = xAxisData.indexOf(entryDate);
          if (xAxisIndex !== -1) {
            seriesData[seriesIndex].data[xAxisIndex] = entryValue;
            console.log(`匹配到日期 ${entryDate} 于索引 ${xAxisIndex}, 设置数值为 ${entryValue}`);
          } else {
            console.log(`日期 ${entryDate} 未在X轴数据中找到`);
          }
        });
      } else {
        console.log(`未找到 ${type} 的数据`);
      }
    });

    myChart.clear();
    myChart.setOption({
      tooltip: { trigger: "axis" },
      legend: { show: false },
      xAxis: { type: "category", data: xAxisData },
      yAxis: { type: "value" },
      series: seriesData,
    });
  } catch (error) {
    console.error("数据获取失败：", error);
  }
};




  watch([() => DiseaseType.value, () => radio.value], updateChart, {
    immediate: true,
  });
  watch(
    () => customDateRange.value,
    () => {
      if (radio.value === 5) updateChart();
    }
  );
  watch(
    () => checkList.value,
    () => {
      updateChart();
    }
  );
};

onMounted(() => initChart());
</script>

<style scoped>
.container {
  padding-top: 10px;
  width: 100%;
  height: 900px;
  background-color: #ffffff;
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
  display: flex;
}
.chart-container {
  width: 100%;
  height: 400px;
}
.chart {
  width: 100%;
  height: 100%;
}
</style>


