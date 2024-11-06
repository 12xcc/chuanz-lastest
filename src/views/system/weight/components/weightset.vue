<template>
  <el-drawer
    :model-value="visible"
    direction="rtl"
    size="850px"
    :with-header="false"
    custom-class="custom-drawer"
    @close="handleCancel"
  >
    <div class="container">
      <div class="title">
        <h3>设置疾病权重</h3>
        <div class="footer">
          <el-button type="primary" @click="handleSubmit">保存</el-button>
          <el-button type="warning" @click="handleUpdateHis"
            >保存并更新历史打卡的预测信息</el-button
          >
        </div>
      </div>
      <el-form
        :model="form"
        label-width="100px"
        class="form-container"
        ref="form"
        :rules="rules"
        label-position="left"
      >
        <div class="BaseInfo">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">疾病名称</span>
          </div>
          <el-form-item label="疾病名称" prop="diseaseTypeName">
            <el-input
              v-model="form.diseaseTypeName"
              style="width: 200px"
              clearable
              :disabled="allDisabled"
            ></el-input>
          </el-form-item>
        </div>

        <div class="BaseInfo">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">当前权重总分(必须等于100)</span>
          </div>
          <el-form-item label="当前权重总分" prop="WeightScore">
            <el-input
              v-model.number="form.WeightScore"
              style="width: 200px"
              clearable
              :disabled="allDisabled"
            ></el-input>
          </el-form-item>
        </div>

        <div class="select flex gap-2 mb-4">
          <el-check-tag
            v-for="tag in tags"
            :key="tag"
            :checked="selectedTag === tag"
            type="primary"
            @change="selectTag(tag)"
          >
            {{ tag }}
          </el-check-tag>
        </div>

        <div>
          <!-- 全身症状 -->
          <div v-show="selectedTag === '全身症状'">
            <GeneralSymptomsScore
              ref="GeneralSymptomsScore"
              :symptoms-data="generalSymptomsData"
              @update-weight-score="updateWeightScore"
            />
          </div>

          <!-- 呼吸系统症状 -->
          <div v-show="selectedTag === '呼吸系统症状'">
            <RespiratorySymptomsScore
              ref="RespiratorySymptomsScore"
              :symptoms-data="respiratorySymptomsData"
              @update-weight-score="updateWeightScore"
            />
          </div>

          <!-- 消化系统症状 -->
          <div v-show="selectedTag === '消化系统症状'">
            <DigestiveSymptomsScore
              ref="DigestiveSymptomsScore"
              :symptoms-data="digestiveSymptomsData"
              @update-weight-score="updateWeightScore"
            />
          </div>

          <!-- 循环系统症状 -->
          <div v-show="selectedTag === '循环系统症状'">
            <CirculatorySymptomsScore
              ref="CirculatorySymptomsScore"
              :symptoms-data="circulatorySymptomsData"
              @update-weight-score="updateWeightScore"
            />
          </div>

          <!-- 神经系统症状 -->
          <div v-show="selectedTag === '神经系统症状'">
            <NeurologicalSymptomsScore
              ref="NeurologicalSymptomsScore"
              :symptoms-data="neurologicalSymptomsData"
              @update-weight-score="updateWeightScore"
            />
          </div>

          <!-- 局部症状 -->
          <div v-show="selectedTag === '局部症状'">
            <LocalSymptomsScore
              ref="LocalSymptomsScore"
              :symptoms-data="localSymptomsData"
              @update-weight-score="updateWeightScore"
            />
          </div>

          <!-- 其他症状 -->
          <div v-show="selectedTag === '其他症状'">
            <OtherSymptomsScore
              ref="OtherSymptomsScore"
              :symptoms-data="otherSymptomsData"
              @update-weight-score="updateWeightScore"
            />
          </div>

          <!-- 危险因素与暴露史 -->
          <div v-show="selectedTag === '危险因素与暴露史'">
            <RiskFactorsAndExposureScore
              ref="RiskFactorsAndExposureScore"
              :symptoms-data="riskFactorsData"
              @update-weight-score="updateWeightScore"
            />
          </div>
        </div>
      </el-form>
    </div>
  </el-drawer>
</template>

<script>
import {
  getAllWeightScoringInfo,
  updateBatchWeightScoring,
  updateBatchWeightScoringAndDiagnosisSoring,
} from "@/api/system/weight.js";
import GeneralSymptomsScore from "./GeneralSymptomsScore.vue";
import RespiratorySymptomsScore from "./RespiratorySymptomsScore.vue";
import DigestiveSymptomsScore from "./DigestiveSymptomsScore.vue";
import CirculatorySymptomsScore from "./CirculatorySymptomsScore.vue";
import NeurologicalSymptomsScore from "./NeurologicalSymptomsScore.vue";
import LocalSymptomsScore from "./LocalSymptomsScore.vue";
import OtherSymptomsScore from "./OtherSymptomsScore.vue";
import RiskFactorsAndExposureScore from "./RiskFactorsAndExposureScore.vue";
import {ElMessage, ElMessageBox } from "element-plus";
export default {
  components: {
    GeneralSymptomsScore,
    RespiratorySymptomsScore,
    DigestiveSymptomsScore,
    CirculatorySymptomsScore,
    NeurologicalSymptomsScore,
    LocalSymptomsScore,
    OtherSymptomsScore,
    RiskFactorsAndExposureScore,
  },
  data() {
    return {
      allDisabled: true,
      visible: false, // 控制抽屉显示隐藏
      selectedTag: "全身症状", // 默认选中的标签
      form: {
        diseaseTypeName: "", // 疾病类型名称
        WeightScore: 0, // 当前总分
      },
      generalSymptomsData: [], // GeneralSymptoms 数据
      respiratorySymptomsData: [], // 呼吸系统症状数据
      digestiveSymptomsData: [], // 消化系统症状数据
      circulatorySymptomsData: [], // 循环系统症状数据
      neurologicalSymptomsData: [], // 神经系统症状数据
      localSymptomsData: [], // 局部症状数据
      otherSymptomsData: [], // 其他症状数据
      riskFactorsData: [], // 危险因素与暴露史数据
      rules: {}, // 表单校验规则
      tags: [
        "全身症状",
        "呼吸系统症状",
        "消化系统症状",
        "循环系统症状",
        "神经系统症状",
        "局部症状",
        "其他症状",
        "危险因素与暴露史",
      ], // 症状标签
    };
  },
  methods: {
    // 当用户点击“设置权重”时调用，展示抽屉并调用接口获取数据
    async showDrawer(user) {
      this.form = { ...user }; // 将数据赋值给 form
      this.visible = true;
      await this.fetchSymptomsData(); // 调用接口获取数据
    },

    // 调用接口获取症状数据
    async fetchSymptomsData() {
      try {
        const params = { diseaseTypeName: this.form.diseaseTypeName };
        const response = await getAllWeightScoringInfo(params);

        if (
          response &&
          response.status === 200 &&
          response.data &&
          response.data.code === 1
        ) {
          const data = response.data.data;

          // 分发数据到各个子组件
          this.generalSymptomsData = data.filter(
            (item) => item.tableName === "GeneralSymptoms"
          );
          this.respiratorySymptomsData = data.filter(
            (item) => item.tableName === "RespiratorySymptoms"
          );
          this.digestiveSymptomsData = data.filter(
            (item) => item.tableName === "DigestiveSymptoms"
          );
          this.circulatorySymptomsData = data.filter(
            (item) => item.tableName === "CirculatorySymptoms"
          );
          this.neurologicalSymptomsData = data.filter(
            (item) => item.tableName === "NeurologicalSymptoms"
          );
          this.localSymptomsData = data.filter(
            (item) => item.tableName === "LocalSymptoms"
          );
          this.otherSymptomsData = data.filter(
            (item) => item.tableName === "OtherSymptoms"
          );
          this.riskFactorsData = data.filter(
            (item) => item.tableName === "RiskFactorsAndExposure"
          );
        } else {
          console.error("获取症状数据失败，响应结构不符合预期");
        }
      } catch (error) {
        console.error("接口调用出错：", error);
      }
    },

    handleCancel() {
      this.visible = false; // 关闭抽屉
    },

    selectTag(tag) {
      this.selectedTag = tag;
      this.updateWeightScore(); // 切换标签时更新分数
    },

    updateWeightScore() {
      // 计算 WeightScore 为所有子组件的分数总和
      const components = [
        "GeneralSymptomsScore",
        "RespiratorySymptomsScore",
        "DigestiveSymptomsScore",
        "CirculatorySymptomsScore",
        "NeurologicalSymptomsScore",
        "LocalSymptomsScore",
        "OtherSymptomsScore",
        "RiskFactorsAndExposureScore",
      ];

      this.form.WeightScore = components.reduce((total, component) => {
        const compRef = this.$refs[component];
        return total + (compRef ? compRef.totalWeightScore : 0);
      }, 0);

      console.log("Updated WeightScore:", this.form.WeightScore);
    },

    handleSubmit() {
      // 总分不是100不让交
      if (this.form.WeightScore !== 100) {
        this.$message.error("所有分数总和必须为100，无法提交！");
        return;
      }

      this.$message.warning("正在提交，请稍候...");
      // 收集所有子组件的数据
      const components = [
        this.$refs.GeneralSymptomsScore,
        this.$refs.RespiratorySymptomsScore,
        this.$refs.DigestiveSymptomsScore,
        this.$refs.CirculatorySymptomsScore,
        this.$refs.NeurologicalSymptomsScore,
        this.$refs.LocalSymptomsScore,
        this.$refs.OtherSymptomsScore,
        this.$refs.RiskFactorsAndExposureScore,
      ];

      let requestData = [];

      components.forEach((component) => {
        if (component && component.symptoms) {
          Object.values(component.symptoms).forEach((symptom) => {
            if (symptom.symptomWeightingId != null) {
              requestData.push({
                symptomWeightingId: symptom.symptomWeightingId,
                weightScore: symptom.weightScore,
              });
            }
          });
        }
      });

      // 调用接口
      updateBatchWeightScoring(requestData)
        .then((response) => {
          if (response.data.code === 1) {
            this.$message.success("提交成功");
            this.visible = false;
          } else {
            this.$message.error(response.data.msg || "提交失败");
          }
        })
        .catch((error) => {
          console.error("API调用出错：", error);
          this.$message.error("提交失败");
        });
    },

    handleUpdateHis() {
      // 确保分数总和为 100
      if (this.form.WeightScore !== 100) {
        ElMessage.error("所有分数总和必须为100，无法提交！");
        return;
      }

      // 第一次确认
      ElMessageBox.confirm(
        "点击此按钮将会修改诊断权重表，并更新历史预测的结果。请不要轻易尝试！",
        "确认操作",
        {
          confirmButtonText: "我已知晓",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          // 第二次确认
          return ElMessageBox.confirm(
            "您确定要继续吗？此操作不可逆！",
            "再次确认",
            {
              confirmButtonText: "确认修改",
              cancelButtonText: "取消",
              type: "warning",
            }
          );
        })
        .then(() => {
          ElMessage.warning("正在提交，请稍候...");

          // 收集所有子组件的数据
          const components = [
            this.$refs.GeneralSymptomsScore,
            this.$refs.RespiratorySymptomsScore,
            this.$refs.DigestiveSymptomsScore,
            this.$refs.CirculatorySymptomsScore,
            this.$refs.NeurologicalSymptomsScore,
            this.$refs.LocalSymptomsScore,
            this.$refs.OtherSymptomsScore,
            this.$refs.RiskFactorsAndExposureScore,
          ];

          let requestData = [];
          components.forEach((component) => {
            if (component && component.symptoms) {
              Object.values(component.symptoms).forEach((symptom) => {
                if (symptom.symptomWeightingId != null) {
                  requestData.push({
                    symptomWeightingId: symptom.symptomWeightingId,
                    weightScore: symptom.weightScore,
                  });
                }
              });
            }
          });

          // 调用接口
          updateBatchWeightScoringAndDiagnosisSoring(requestData)
            .then((response) => {
              if (response.data.code === 1) {
                ElMessage.success("提交成功");
                this.visible = false;
              } else {
                ElMessage.error(response.data.msg || "提交失败");
              }
            })
            .catch((error) => {
              console.error("API调用出错：", error);
              ElMessage.error("提交失败");
            });
        })
        .catch(() => {
          ElMessage.info("操作已取消");
        });
    },
  },
};
</script>


<style scoped>
.custom-drawer {
  height: 100%;
}
.form-container {
  padding: 20px;
  margin-top: 70px;
}
.title {
  position: fixed;
  top: 0;
  right: 0;
  width: 850px;
  background: #ffffff;
  padding: 3px;
  z-index: 100;
  border: 3px solid #fafafa;
}
.footer {
  display: flex;
  justify-content: flex-end;
  margin-top: -25px;
  margin-right: 10px;
  margin-bottom: 20px;
}
h3 {
  margin-top: 20px;
  font-size: 16px;
  color: #333333;
  margin-left: 30px;
}
.custom-input {
  margin-bottom: 10px;
}
.el-dropdown-link:focus {
  outline: none;
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

.BaseInfo {
  margin-bottom: 50px;
}
.el-check-tag {
  margin: 10px;
  font-weight: normal;
}

.el-check-tag.is-checked {
  background-color: #333333 !important;
  color: #ffffff;
  font-weight: normal;
}
.select {
  margin-top: 10px;
  margin-bottom: 20px;
  display: block;
}
.el-form-item {
  margin-left: 20px;
}
</style>


