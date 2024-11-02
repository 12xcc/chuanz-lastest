<template>
  <el-drawer
    :model-value="visible"
    direction="rtl"
    size="800px"
    :with-header="false"
    custom-class="custom-drawer"
    @close="handleCancel"
  >
    <div class="container">
      <div class="title">
        <h3>查看/编辑诊断信息详情</h3>
        <div class="footer">
          <!-- <el-button v-if="isEditing" @click="handleQuit">取消</el-button> -->
          <el-button v-if="!isEditing" @click="handleEdit">编辑</el-button>
          <el-button v-if="isEditing" type="primary" @click="handleSubmit"
            >提交</el-button
          >
        </div>
      </div>
      <el-form
        :model="form"
        label-width="100px"
        class="form-container"
        ref="form"
        :rules="rules"
        :data="allData"
      >
        <div class="BaseInfo">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">个人基本信息</span>
          </div>
          <div class="BaseInfoDetail">
            <!-- 姓名 -->
            <el-form-item label="姓名" prop="name">
              <el-input
                v-model="form.name"
                style="width: 200px"
                placeholder="请输入姓名"
                clearable
                :disabled="InfoDisabled"
              ></el-input>
            </el-form-item>

            <!-- 性别 -->
            <el-form-item label="性别" prop="gender">
              <el-input
                v-model="form.gender"
                style="width: 200px"
                placeholder=""
                clearable
                :disabled="InfoDisabled"
              ></el-input>
            </el-form-item>

            <!-- 年龄 -->
            <el-form-item label="年龄" prop="age">
              <el-input
                v-model="form.age"
                style="width: 200px"
                placeholder="根据身份证号生成"
                clearable
                :disabled="InfoDisabled"
              ></el-input>
            </el-form-item>

            <!-- 民族 -->
            <el-form-item label="民族" prop="ethnicity">
              <el-input
                v-model="form.ethnicity"
                style="width: 200px"
                placeholder=""
                clearable
                :disabled="InfoDisabled"
              ></el-input>
            </el-form-item>

            <!-- 部门/工种 -->
            <el-form-item label="部门/工种" prop="department">
              <el-input
                v-model="form.department"
                style="width: 200px"
                placeholder=""
                clearable
                :disabled="InfoDisabled"
              ></el-input>
            </el-form-item>
          </div>
        </div>

        <!-- 症状标签 -->
        <div class="select flex gap-2 mb-4">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">点击标签查看症状</span>
          </div>
          <!-- 使用 v-for 渲染标签 -->
          <div
            v-for="tag in tags"
            :key="tag.name"
            style="display: inline-block; margin-right: 8px"
          >
            <!-- 当标签不可用时，显示提示 -->
            <el-tooltip
              v-if="!tag.enabled && !isEditing"
              content="无该症状信息"
              placement="top"
            >
              <el-check-tag
                :checked="selectedTag === tag.name"
                type="primary"
                class="disabled-tag"
              >
                {{ tag.label }}
              </el-check-tag>
            </el-tooltip>
            <!-- 当标签可用时，或者在编辑模式下，都可以点击 -->
            <el-check-tag
              v-else
              :checked="selectedTag === tag.name"
              type="primary"
              @change="selectTag(tag.name)"
            >
              {{ tag.label }}
            </el-check-tag>
          </div>
        </div>

        <!-- 根据选择的标签显示不同内容 -->
        <div>
          <!-- 诊断信息 -->
          <div v-show="selectedTag === 'DiagnosisResults'">
            <DiagnosisResults ref="DiagnosisResults" :data="diagnosisResults" />
          </div>

          <!-- 基本信息 -->
          <div v-show="selectedTag === 'DiagnosisPersonalInfo'">
            <DiagnosisPersonalInfo
              ref="DiagnosisPersonalInfo"
              :data="diagnosispersonalinfo"
            />
          </div>

          <!-- 全身症状 -->
          <div v-show="selectedTag === 'GeneralSymptoms'">
            <GeneralSymptoms
              ref="GeneralSymptoms"
              :data="diagnosisgeneralsymptoms"
            />
          </div>

          <!-- 呼吸系统症状 -->
          <div v-show="selectedTag === 'RespiratorySymptoms'">
            <RespiratorySymptoms
              ref="RespiratorySymptoms"
              :data="diagnosisrespiratorysymptoms"
            />
          </div>

          <!-- 消化系统症状 -->
          <div v-show="selectedTag === 'DigestiveSymptoms'">
            <DigestiveSymptoms
              ref="DigestiveSymptoms"
              :data="diagnosisdigestivesymptoms"
            />
          </div>

          <!-- 循环系统症状 -->
          <div v-show="selectedTag === 'CirculatorySymptoms'">
            <CirculatorySymptoms
              ref="CirculatorySymptoms"
              :data="diagnosiscirculatorysymptoms"
            />
          </div>

          <!-- 神经系统症状 -->
          <div v-show="selectedTag === 'NeurologicalSymptoms'">
            <NeurologicalSymptoms
              ref="NeurologicalSymptoms"
              :data="diagnosisneurologicalsymptoms"
            />
          </div>

          <!-- 局部症状 -->
          <div v-show="selectedTag === 'LocalSymptoms'">
            <DiagnosisLocalSymptoms
              ref="DiagnosisLocalSymptoms"
              :data="diagnosislocalsymptoms"
            />
          </div>

          <!-- 其他症状 -->
          <div v-show="selectedTag === 'OtherSymptoms'">
            <OtherSymptoms ref="OtherSymptoms" :data="diagnosisothersymptoms" />
          </div>

          <!-- 并发症 -->
          <div v-show="selectedTag === 'RiskFactorsAndExposure'">
            <RiskFactorsAndExposure
              ref="RiskFactorsAndExposure"
              :data="diagnosiscomplications"
            />
          </div>

          <!-- 检测报告 -->
          <div v-show="selectedTag === 'DiagnosisExaminations'">
            <DiagnosisExaminations
              ref="DiagnosisExaminations"
              :data="diagnosisexaminations"
              @updateReports="handleReportsUpdate"
            />
          </div>
        </div>
      </el-form>
    </div>
  </el-drawer>
</template>


<script>
import { ElMessage } from "element-plus";
import DiagnosisResults from "./DiagnosisResults.vue";
import GeneralSymptoms from "./GeneralSymptoms.vue";
import RespiratorySymptoms from "./RespiratorySymptoms.vue";
import CirculatorySymptoms from "./CirculatorySymptoms.vue";
import NeurologicalSymptoms from "./NeurologicalSymptoms.vue";
import DiagnosisLocalSymptoms from "./DiagnosisLocalSymptoms.vue";
import OtherSymptoms from "./OtherSymptoms.vue";
import RiskFactorsAndExposure from "./RiskFactorsAndExposure.vue";
import DiagnosisPersonalInfo from "./DiagnosisPersonalInfo.vue";
import DiagnosisExaminations from "./DiagnosisExaminations.vue";
import DigestiveSymptoms from "../checkdaignosisdata/DigestiveSymptoms.vue";
import { selectDiagnosis, updateDiagnosis } from "@/api/diagnosis/diagnosis";

export default {
  components: {
    DiagnosisResults,
    GeneralSymptoms,
    RespiratorySymptoms,
    CirculatorySymptoms,
    NeurologicalSymptoms,
    DiagnosisLocalSymptoms,
    OtherSymptoms,
    RiskFactorsAndExposure,
    DiagnosisPersonalInfo,
    DiagnosisExaminations,
    DigestiveSymptoms,
  },
  data() {
    return {
      allData: [],
      InfoDisabled: true,
      allDisabled: true,
      visible: false, // 控制弹窗显示
      selectedTag: null, // 当前选中的标签
      form: {},
      rules: {
      },
      isEditing: false,
      refs: [
        "DiagnosisResults",
        "DiagnosisPersonalInfo",
        "GeneralSymptoms",
        "RespiratorySymptoms",
        "DigestiveSymptoms",
        "CirculatorySymptoms",
        "NeurologicalSymptoms",
        "DiagnosisLocalSymptoms",
        "OtherSymptoms",
        "RiskFactorsAndExposure",
        "DiagnosisExaminations",
      ],

      // 用于存储子组件数据的属性，初始为 null
      diagnosisResults: null, // 诊断信息
      diagnosispersonalinfo: null, // 基本信息
      diagnosisgeneralsymptoms: null, // 全身症状
      diagnosisrespiratorysymptoms: null, // 呼吸系统症状
      diagnosiscirculatorysymptoms: null, // 循环系统症状
      diagnosisneurologicalsymptoms: null, // 神经系统症状
      diagnosislocalsymptoms: null, // 局部症状
      diagnosisothersymptoms: null, // 其他症状
      diagnosiscomplications: null, // 并发症
      diagnosisdigestivesymptoms: null, // 消化系统症状
      diagnosisexaminations: null, // 检测报告

      // 症状标签，添加 enabled 属性
      tags: [
        { name: "DiagnosisResults", label: "诊断信息", enabled: true },
        { name: "DiagnosisPersonalInfo", label: "基本信息", enabled: true },
        { name: "GeneralSymptoms", label: "全身症状", enabled: true },
        { name: "RespiratorySymptoms", label: "呼吸系统症状", enabled: true },
        { name: "DigestiveSymptoms", label: "消化系统症状", enabled: true },
        { name: "CirculatorySymptoms", label: "循环系统症状", enabled: true },
        { name: "NeurologicalSymptoms", label: "神经系统症状", enabled: true },
        { name: "LocalSymptoms", label: "局部症状", enabled: true },
        { name: "OtherSymptoms", label: "其他症状", enabled: true },
        { name: "RiskFactorsAndExposure", label: "并发症", enabled: true },
        { name: "DiagnosisExaminations", label: "检测报告", enabled: true },
      ],
    };
  },

  methods: {
    selectTag(tagName) {
      this.selectedTag = tagName;
    },
    async showDrawer(user) {
      this.visible = true;
      // 调用接口获取数据
      this.form = { ...user };
      await this.fetchDiagnosisData(user.diagnosisResultsId);
    },

    // 调用接口获取诊断数据，并分发给子组件
    async fetchDiagnosisData(userId) {
      try {
        const response = await selectDiagnosis(userId);
        if (response && response.data && response.data.code === 1) {
          const data = response.data.data;
          this.form.diagnosisDate = data.diagnosisresults.diagnosisDate;
          console.log("后端响应：", data);
          // 分发数据到各个子组件，若数据为 null，则赋值为 null
          this.diagnosisResults = data.diagnosisresults || null;
          this.diagnosispersonalinfo = data.diagnosispersonalinfo || null;
          this.diagnosisgeneralsymptoms = data.diagnosisgeneralsymptoms || null;
          this.diagnosisrespiratorysymptoms =
            data.diagnosisrespiratorysymptoms || null;
          this.diagnosiscirculatorysymptoms =
            data.diagnosiscirculatorysymptoms || null;
          this.diagnosisneurologicalsymptoms =
            data.diagnosisneurologicalsymptoms || null;
          this.diagnosislocalsymptoms = data.diagnosislocalsymptoms || null;
          this.diagnosisothersymptoms = data.diagnosisothersymptoms || null;
          this.diagnosiscomplications = data.diagnosiscomplications || null;
          this.diagnosisdigestivesymptoms =
            data.diagnosisdigestivesymptoms || null;
          this.diagnosisexaminations = data.diagnosisexaminations || null;
          console.log("data:", data.diagnosisresults);
          // 更新标签的 enabled 状态
          this.updateTagEnabledStatus();

          // 设置默认选中的标签为第一个可用的标签
          const firstEnabledTag = this.tags.find((tag) => tag.enabled);
          this.selectedTag = firstEnabledTag ? firstEnabledTag.name : null;
        } else {
          ElMessage.error("获取诊断数据失败");
        }
      } catch (error) {
        console.error("获取诊断数据出错：", error);
        ElMessage.error("获取诊断数据失败");
      }
    },

    // 更新标签的 enabled 状态
    updateTagEnabledStatus() {
      this.tags.forEach((tag) => {
        switch (tag.name) {
          case "DiagnosisResults":
            tag.enabled = this.diagnosisResults !== null;
            break;
          case "DiagnosisPersonalInfo":
            tag.enabled = this.diagnosispersonalinfo !== null;
            break;
          case "GeneralSymptoms":
            tag.enabled = this.diagnosisgeneralsymptoms !== null;
            break;
          case "RespiratorySymptoms":
            tag.enabled = this.diagnosisrespiratorysymptoms !== null;
            break;
          case "DigestiveSymptoms":
            tag.enabled = this.diagnosisdigestivesymptoms !== null;
            break;
          case "CirculatorySymptoms":
            tag.enabled = this.diagnosiscirculatorysymptoms !== null;
            break;
          case "NeurologicalSymptoms":
            tag.enabled = this.diagnosisneurologicalsymptoms !== null;
            break;
          case "LocalSymptoms":
            tag.enabled = this.diagnosislocalsymptoms !== null;
            break;
          case "OtherSymptoms":
            tag.enabled = this.diagnosisothersymptoms !== null;
            break;
          case "RiskFactorsAndExposure":
            tag.enabled = this.diagnosiscomplications !== null;
            break;
          case "DiagnosisExaminations":
            tag.enabled = this.diagnosisexaminations !== null;
            break;
          default:
            tag.enabled = false;
        }
      });
    },

    handleReportsUpdate({ reports, fileList }) {
      this.reportsData = {
        reports,
        fileList,
      };
      console.log("Updated reports and fileList:", this.reportsData);
    },

    handleCancel() {
      this.allDisabled = true;
      this.isEditing = false;
      this.refs.forEach((ref) => {
        if (this.$refs[ref] && this.$refs[ref].handleCancel) {
          this.$refs[ref].handleCancel();
        }
      });
      this.visible = false;
      this.handleReset();
    },

    handleEdit() {
      this.allDisabled = false;
      this.isEditing = true; // 进入编辑模式

      // 在编辑模式下，所有标签都可点击
      this.tags.forEach((tag) => {
        tag.enabled = true;
      });

      this.refs.forEach((ref) => {
        if (this.$refs[ref] && this.$refs[ref].handleAble) {
          this.$refs[ref].handleAble();
        }
      });
    },

    async handleSubmit() {
      try {
        // 调用子组件的 validate 方法
        for (const refName of this.refs) {
          const component = this.$refs[refName];
          if (component && component.validate) {
            await component.validate();
          }
        }

        // 如果子组件验证通过，继续处理其他数据
        const submitData = {};

        for (const refName of this.refs) {
          const component = this.$refs[refName];
          if (component && component.getData) {
            submitData[refName] = component.getData();
          }
        }

        // 手动修改对象键名
        const mappedSubmitData = {
          diagnosisresults: submitData.DiagnosisResults,
          diagnosispersonalinfo: submitData.DiagnosisPersonalInfo,
          diagnosisgeneralsymptoms: submitData.GeneralSymptoms,
          diagnosisrespiratorysymptoms: submitData.RespiratorySymptoms,
          diagnosiscirculatorysymptoms: submitData.CirculatorySymptoms,
          diagnosisneurologicalsymptoms: submitData.NeurologicalSymptoms,
          diagnosislocalsymptoms: submitData.DiagnosisLocalSymptoms,
          diagnosisothersymptoms: submitData.OtherSymptoms,
          diagnosiscomplications: submitData.RiskFactorsAndExposure,
          diagnosisexaminations: submitData.DiagnosisExaminations,
          diagnosisdigestivesymptoms: submitData.DigestiveSymptoms,
        };

        console.log("提交数据:", mappedSubmitData);

        // 调用更新接口，提交修改后的数据
        const response = await updateDiagnosis(mappedSubmitData);
        if (response && response.data && response.data.code === 1) {
          ElMessage.success("提交成功");
          this.visible = false;
          this.handleReset();
          this.$emit("update");
        } else {
          ElMessage.error(response.data.msg || "提交失败");
        }
      } catch (error) {
        // 处理验证错误
        console.error("验证失败:", error.message);
        ElMessage({
          message: error.message,
          type: "error",
        });
      }
    },

    handleReset() {
      this.message = "";
      this.selectedTag = null;
      this.isEditing = false;
      this.allDisabled = true;
      this.refs.forEach((ref) => {
        if (this.$refs[ref] && this.$refs[ref].handleReset) {
          this.$refs[ref].handleReset();
        }
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
  width: 800px;
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
}
</style>
