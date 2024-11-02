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
        <h3>查看/编辑检测信息</h3>
        <div class="footer">
          <el-button v-if="!isEditing" @click="handleEdit">编辑</el-button>
          <el-button v-if="isEditing" type="primary" @click="handleSubmit">提交</el-button>
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
            <el-form-item label="姓名" prop="name">
              <el-input
                v-model="form.name"
                style="width: 200px"
                placeholder="请输入姓名"
                @blur="$refs.form.validateField('name')"
                clearable
                :disabled="InfoDisabled"
              ></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="gender">
              <el-input
                v-model="form.gender"
                style="width: 200px"
                placeholder=""
                clearable
                :disabled="InfoDisabled"
              ></el-input>
            </el-form-item>
            <el-form-item label="年龄" prop="age">
              <el-input
                v-model="form.age"
                style="width: 200px"
                placeholder="根据身份证号生成"
                clearable
                :disabled="InfoDisabled"
              ></el-input>
            </el-form-item>
            <el-form-item label="民族" prop="ethnicity">
              <el-input
                v-model="form.ethnicity"
                style="width: 200px"
                placeholder=""
                clearable
                :disabled="InfoDisabled"
              ></el-input>
            </el-form-item>
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

        <div class="BaseInfo">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">报告日期</span>
          </div>
          <div class="BaseInfoDetail">
              <el-form-item label="报告日期">
              <el-date-picker
                v-model="form.uploadDate"
                type="date"
                format="YYYY-MM-DD"
                placeholder="请选择报告日期"  
                style="width:200px"
                :disabled="allDisabled"
                :disabled-date="disabledAfterDate"
              />
            </el-form-item>
          </div>
        </div>

        <div class="select flex gap-2 mb-4">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">病原学及血清学检查</span>
          </div>
          <el-check-tag
            :checked="form.isVirusAntigenTestDone"
            type="primary"
            @change="toggleTag('isVirusAntigenTestDone')"
            :disabled="allDisabled"
          >
            病毒抗原检测
          </el-check-tag>
          <el-check-tag
            :checked="form.isVirusNucleicAcidTestDone"
            type="primary"
            @change="toggleTag('isVirusNucleicAcidTestDone')"
            :disabled="allDisabled"
          >
            病毒核酸检测
          </el-check-tag>
          <el-check-tag
            :checked="form.isVirusCultureIsolationDone"
            type="primary"
            @change="toggleTag('isVirusCultureIsolationDone')"
            :disabled="allDisabled"
          >
            病毒培养分离
          </el-check-tag>
          <el-check-tag
            :checked="form.isSerologicalTestDone"
            type="primary"
            @change="toggleTag('isSerologicalTestDone')"
            :disabled="allDisabled"
          >
            血清学检测
          </el-check-tag>
        </div>

        <!-- LabTestReport 内容 -->
        <div class="LabTestReport">
          <el-form :disabled="allDisabled">
            <div class="title-container">
              <div class="blue-box"></div>
              <span class="title-text">粪便检查报告（请上传jpg或pdf格式）</span>
            </div>
            <UploadSection
              v-model="reports.hasStoolTest"
              :specimen-type="'粪便'"
              report-type="hasStoolTest"
              :initial-file="reports.hasStoolTest" 
              :fetch-file="getLabTestFile"
            />
            <div class="title-container">
              <div class="blue-box"></div>
              <span class="title-text">呕吐物检查报告（请上传jpg或pdf格式）</span>
            </div>
            <UploadSection
              v-model="reports.vomit"
              :specimen-type="'呕吐物'"
              report-type="vomit"
              :initial-file="reports.vomit" 
              :fetch-file="getLabTestFile"
            />
            <div class="title-container">
              <div class="blue-box"></div>
              <span class="title-text">血液检查报告（请上传jpg或pdf格式）</span>
            </div>
            <UploadSection
              v-model="reports.blood"
              :specimen-type="'血'"
              report-type="blood"
              :initial-file="reports.blood" 
              :fetch-file="getLabTestFile"
            />
          </el-form>
        </div>
      </el-form>
    </div>
  </el-drawer>
</template>

<script>
import { ElMessage } from "element-plus";
import UploadSection from '@/components/UploadSection.vue';
import { getLabTestFile,updateLabTest,selectLabTest  } from "@/api/check/check.js"; 

export default {
  components: {
    UploadSection,
  },
  data() {
    return {
      InfoDisabled: true,
      allDisabled: true,
      visible: false,
      isEditing: false,
      form: {
        isVirusAntigenTestDone: false,
        isVirusNucleicAcidTestDone: false,
        isVirusCultureIsolationDone: false,
        isSerologicalTestDone: false,
        uploadDate:null,
      },
      reports: {
        hasStoolTest: [],
        vomit: [],
        blood: [],
      },
      rules: {
        diagnosisDate: [{ required: true, message: "请选择该诊断的诊断日期" }],
      },
    };
  },
  methods: {
    toggleTag(field) {
      this.form[field] = !this.form[field];
    },
    showDrawer(user) {
      this.form = { ...user };
      this.visible = true;
      this.getLabTestFile(user.labTestReportId);
      this.selectLabTest(user.labTestReportId)
    },
    disabledAfterDate(date) {
      const today = new Date();
      // 设置为今天的开始时间
      today.setHours(0, 0, 0, 0);
      // 返回日期是否在今天之后
      return date.getTime() > today.getTime();
    },
    handleCancel() {
      this.visible = false;
      this.isEditing = false;
      this.allDisabled = true;
      this.handleReset();
    },
    handleEdit() {
      this.allDisabled = false;
      this.isEditing = true;
    },
    vaildate(){
      
    },
    async handleSubmit() {
      try {
        const data = {
          labTestReportId: this.form.labTestReportId,
          userId: this.form.userId,
          uploadDate: this.form.uploadDate,
          isVirusAntigenTestDone: this.form.isVirusAntigenTestDone,
          isVirusNucleicAcidTestDone: this.form.isVirusNucleicAcidTestDone,
          isVirusCultureIsolationDone: this.form.isVirusCultureIsolationDone,
          isSerologicalTestDone: this.form.isSerologicalTestDone,
          pathogenicTestResults: this.form.pathogenicTestResults,
          fileIds: this.form.fileIds,
        };

        const response = await updateLabTest(data);

        if (response.data.code === 1) {
          // 提交成功处理
          this.visible = false;
          ElMessage({
            message: "提交成功",
            type: "success",
          });
          this.$emit("updatecheck");
          this.handleReset();
        } else if (response.data.code === 0) {
          ElMessage({
            message: response.data.msg || "提交失败",
            type: "error",
          });
        }
      } catch (error) {
        console.error("提交失败:", error.message);
        ElMessage({
          message: error.message,
          type: "error",
        });
      }
    },
    handleReset() {
      this.message = "";
    },

    async selectLabTest(labTestReportId){
        try{
          const response = await selectLabTest(labTestReportId);

          if (response.data.code === 1) {
          this.form.isVirusAntigenTestDone = response.data.data.isVirusAntigenTestDone;
          this.form.isVirusNucleicAcidTestDone=response.data.data.isVirusNucleicAcidTestDone;          
          this.form.isSerologicalTestDone = response.data.data.isSerologicalTestDone;
          this.form.isVirusCultureIsolationDone = response.data.data.isVirusCultureIsolationDone;
          const uploadDateArray = response.data.data.uploadDate;
            this.form.uploadDate = uploadDateArray.map(num => String(num).padStart(2, '0')).join('-');
        }
        console.log(this.form);
        }catch(error){
          ElMessage.error(error);
        }
    },

    async getLabTestFile(labTestReportId) {
      try {
        const response = await getLabTestFile(labTestReportId);

        if (response && response.data) {
          this.reports.hasStoolTest = response.data.hasStoolTest || [];
          this.reports.vomit = response.data.vomit || [];
          this.reports.blood = response.data.blood || [];
        }
      } catch (error) {
        console.error(error);
        return null;
      }
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
.LabTestReport {
  margin-top: 20px;
}
</style>
