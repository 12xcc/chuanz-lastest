<template>
  <div class="container">
    <div class="title-container">
      <div class="blue-box"></div>
      <span class="title-text">统计准确率范围设置</span>
    </div>
    <div class="content">
      <el-form-item label="准确率范围" prop="range" size="default">
        <el-select
          v-model="range"
          placeholder="请选择字段"
          clearable
          size="default"
          style="width: 200px; margin-right: -15px"
        >
          <el-option label="3" :value="3"></el-option>
          <el-option label="2" :value="2"></el-option>
          <el-option label="1" :value="1"></el-option>
        </el-select>
      </el-form-item>
    </div>
    <div class="content">
      传染病识别准确率 = <br>
      确诊人次中预测概率最高的&nbsp;&nbsp;<span style="font-weight:bold;color:#285AC8;font-size:18px"> {{ range }} </span>&nbsp;&nbsp;个疾病包含了确诊疾病的人次 / 确诊人次 * 100%
    </div>

    <div class="button">
      <el-button type="primary" @click="updateAccuracyRange">
        更新准确率参数
      </el-button>
    </div>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
import axios from "axios";
import {JudgmentsPredictorNumber} from '@/api/report/screen.js'
export default {
  data() {
    return {
     range: localStorage.getItem("accuracyRange") ? parseInt(localStorage.getItem("accuracyRange")) : 2,
    };
  },
  methods: {
    async updateAccuracyRange() {
      try {
        const response = await JudgmentsPredictorNumber(this.range);
        ElMessage.success("准确率范围更新成功");
        localStorage.setItem("accuracyRange", this.range);
      } catch (error) {
        ElMessage.error("更新失败，请稍后重试");
      }
    },
  },
};
</script>


<style scoped>
.container {
  height: 320px;
  width: 600px;
  position: absolute;
  left: 35%;
  top: 25%;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
}
.content {
  font-size: 14px;
  margin-bottom: 20px;
}
.status {
  margin-bottom: 10px;
  font-size: 14px;
}
.status span {
  color: #486ac8;
  font-weight: bold;
}
.button {
  position: absolute;
  left: 40%;
  top: 75%;
}
.title-container {
  display: flex;
  margin-left: 0px;
  margin-bottom: 20px;
  margin-top: 20px;
}

.blue-box {
  width: 6px;
  height: 18px;
  background-color: #285ac8;
  margin-right: 10px;
}

.title-text {
  font-size: 12px;
  font-weight: bold;
  color: #4a4a4a;
}
</style>
