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
        <h3>添加诊断信息</h3>
        <div class="footer">
          <el-button @click="handleCancel">取消</el-button>
          <el-button @click="handleReset">重置</el-button>
          <el-button type="primary" @click="handleSubmit(this.userId)"
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
                :disabled="allDisabled"
              ></el-input>
            </el-form-item>

            <!-- 性别 -->
            <el-form-item label="性别" prop="gender">
              <el-input
                v-model="form.gender"
                style="width: 200px"
                placeholder=""
                clearable
                :disabled="allDisabled"
              ></el-input>
            </el-form-item>

            <!-- 年龄 -->
            <el-form-item label="年龄" prop="age">
              <el-input
                v-model="form.age"
                style="width: 200px"
                placeholder="根据身份证号生成"
                clearable
                :disabled="allDisabled"
              ></el-input>
            </el-form-item>

            <!-- 民族 -->
            <el-form-item label="民族" prop="ethnicity">
              <el-input
                v-model="form.ethnicity"
                style="width: 200px"
                placeholder=""
                clearable
                :disabled="allDisabled"
              ></el-input>
            </el-form-item>

            <!-- 部门/工种 -->
            <el-form-item label="部门/工种" prop="department">
              <el-input
                v-model="form.department"
                style="width: 200px"
                placeholder=""
                clearable
                :disabled="allDisabled"
              ></el-input>
            </el-form-item>
          </div>          
        </div>


        <!-- 症状标签 -->
        <div class="select flex gap-2 mb-4">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">点击标签添加症状</span>
          </div>

          <el-check-tag
            v-for="tag in tags"
            :key="tag.name"
            :checked="selectedTag === tag.name"
            type="primary"
            @change="selectTag(tag.name)"
          >
            {{ tag.label }}
          </el-check-tag>
        </div>

        <!-- 根据选择的标签显示不同内容 -->
        <div v-show="selectedTag === 'DiagnosisResults'">
          <DiagnosisResults ref="DiagnosisResults" />
        </div>

        <div v-show="selectedTag === 'DiagnosisPersonalInfo'">
          <DiagnosisPersonalInfo ref="DiagnosisPersonalInfo" />
        </div>

        <div v-show="selectedTag === 'GeneralSymptoms'">
          <GeneralSymptoms ref="GeneralSymptoms" />
        </div>

        <div v-show="selectedTag === 'RespiratorySymptoms'">
          <RespiratorySymptoms ref="RespiratorySymptoms" />
        </div>

        <div v-show="selectedTag === 'DigestiveSymptoms'">
          <DigestiveSymptoms ref="DigestiveSymptoms" />
        </div>

        <div v-show="selectedTag === 'CirculatorySymptoms'">
          <CirculatorySymptoms ref="CirculatorySymptoms" />
        </div>

        <div v-show="selectedTag === 'NeurologicalSymptoms'">
          <NeurologicalSymptoms ref="NeurologicalSymptoms" />
        </div>

        <div v-show="selectedTag === 'DiagnosisLocalSymptoms'">
          <DiagnosisLocalSymptoms ref="DiagnosisLocalSymptoms" />
        </div>

        <div v-show="selectedTag === 'OtherSymptoms'">
          <OtherSymptoms ref="OtherSymptoms" />
        </div>

        <div v-show="selectedTag === 'DiagnosisComplications'">
          <DiagnosisComplications ref="DiagnosisComplications" />
        </div>

        <div v-show="selectedTag === 'Diagnosistag'">
          <Diagnosistag ref="Diagnosistag" />
        </div>
      </el-form>
    </div>
  </el-drawer>
</template>

<script>
import { ElMessage } from "element-plus";
import { saveDiagnosis } from "@/api/diagnosis/diagnosis"; // 使用新的添加诊断信息接口
import DiagnosisResults from "./DiagnosisResults.vue";
import GeneralSymptoms from "./GeneralSymptoms.vue";
import RespiratorySymptoms from "./RespiratorySymptoms.vue";
import CirculatorySymptoms from "./CirculatorySymptoms.vue";
import NeurologicalSymptoms from "./NeurologicalSymptoms.vue";
import DiagnosisLocalSymptoms from "./DiagnosisLocalSymptoms.vue";
import OtherSymptoms from "./OtherSymptoms.vue";
import DiagnosisComplications from "./DiagnosisComplications.vue";
import DiagnosisPersonalInfo from "./DiagnosisPersonalInfo.vue";
import Diagnosistag from "./Diagnosistag.vue";
import DigestiveSymptoms from "../adddiagnosisdata/DigestiveSymptoms.vue";

export default {
  components: {
    DiagnosisResults,
    GeneralSymptoms,
    RespiratorySymptoms,
    CirculatorySymptoms,
    NeurologicalSymptoms,
    DiagnosisLocalSymptoms,
    OtherSymptoms,
    DiagnosisComplications,
    DiagnosisPersonalInfo,
    Diagnosistag,
    DigestiveSymptoms,
  },
  data() {
    return {
      visible: false,
      selectedTag: null,
      form: {},
      rules: {
      },
      userId: null,
      allDisabled: true, // 控制表单是否禁用
      tags: [
        { name: "DiagnosisResults", label: "诊断信息" },
        { name: "DiagnosisPersonalInfo", label: "基本信息" },
        { name: "GeneralSymptoms", label: "全身症状" },
        { name: "RespiratorySymptoms", label: "呼吸系统症状" },
        { name: "DigestiveSymptoms", label: "消化系统症状" },
        { name: "CirculatorySymptoms", label: "循环系统症状" },
        { name: "NeurologicalSymptoms", label: "神经系统症状" },
        { name: "DiagnosisLocalSymptoms", label: "局部症状" },
        { name: "OtherSymptoms", label: "其他症状" },
        { name: "DiagnosisComplications", label: "并发症" },
        { name: "Diagnosistag", label: "上传检测报告" },
      ],
      refs: [
        "DiagnosisResults",
        "GeneralSymptoms",
        "RespiratorySymptoms",
        "CirculatorySymptoms",
        "NeurologicalSymptoms",
        "DiagnosisLocalSymptoms",
        "OtherSymptoms",
        "DiagnosisComplications",
        "DiagnosisPersonalInfo",
        "Diagnosistag",
        "DigestiveSymptoms",
      ],
    };
  },
  methods: {
    selectTag(tagName) {
      this.selectedTag = tagName;
    },
    showDrawer(user) {
      this.form = { ...user };
      this.userId = user.userId;
      console.log("userid:" + this.userId);
      this.visible = true;
    },
    handleCancel() {
      this.visible = false;
      this.handleReset();
    },

    async handleSubmit(userId) {
      try {
        // 验证所有子组件
        for (const tag of this.tags) {
          const component = this.$refs[tag.name];
          if (component && component.validate) {
            await component.validate();
          }
        }

        // 收集子组件的数据
        const submitData = {};
        for (const tag of this.tags) {
          const component = this.$refs[tag.name];
          if (component && component.getData) {
            submitData[tag.name] = component.getData();
          }
        }

        const mappedSubmitData = {
          diagnosisResultsEmpDTO: submitData.DiagnosisResults,
          diagnosispersonalinfo: submitData.DiagnosisPersonalInfo,
          diagnosisgeneralsymptoms: submitData.GeneralSymptoms,
          diagnosisrespiratorysymptoms: submitData.RespiratorySymptoms,
          diagnosiscirculatorysymptoms: submitData.CirculatorySymptoms,
          diagnosisneurologicalsymptoms: submitData.NeurologicalSymptoms,
          diagnosislocalsymptoms: submitData.DiagnosisLocalSymptoms,
          diagnosisothersymptoms: submitData.OtherSymptoms,
          diagnosiscomplications: submitData.DiagnosisComplications,
          diagnosisexaminations: submitData.Diagnosistag,
          diagnosisdigestivesymptoms: submitData.DigestiveSymptoms,
        };

        console.log("提交数据:", mappedSubmitData);
        console.log("userid:" + this.userId);
        const response = await saveDiagnosis(mappedSubmitData, userId);

        if (response.data && response.data.code === 1) {
          ElMessage.success("提交成功");
          this.visible = false;
          this.handleReset();
          this.$emit("update");
        } else {
          ElMessage.error("提交失败，请稍后重试");
        }
      } catch (error) {
        // console.error("提交失败:", error.message);
        ElMessage.error(error.message);
      }
    },
    handleReset() {
      this.selectedTag = null;
      this.form = {};
      // 重置所有子组件
      this.tags.forEach((tag) => {
        if (this.$refs[tag.name] && this.$refs[tag.name].handleReset) {
          this.$refs[tag.name].handleReset();
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
