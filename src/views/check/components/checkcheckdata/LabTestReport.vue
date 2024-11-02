<template>
<!-- 暂时弃用，已合并到checkcheckdata.vue中 -->
  <div>
    <el-form :disabled="allDisabled">
      <div class="title-container">
        <div class="blue-box"></div>
        <span class="title-text">粪便检查报告（请上传jpg或pdf格式）</span>
      </div>
      <UploadSection
        v-model="reports.hasStoolTest"
        :specimen-type="'粪便'"
        report-type="hasStoolTest"
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
        :fetch-file="getLabTestFile"
      />
    </el-form>
  </div>
</template>

<script>
import UploadSection from '@/components/UploadSection.vue';
import { getLabTestFile } from "@/api/check/check.js"; // 修改为接口所在的文件路径

export default {
  components: {
    UploadSection,
  },
  data() {
    return {
      allDisabled: true,
      reports: {
        hasStoolTest: [],
        vomit: [],
        blood: [],
      },
      labTestId:null, // 固定的labTestId
    };
  },
  methods: {
    handleAble() {
      this.allDisabled = false;
    },
    handleCancel() {
      this.allDisabled = true;
    },
    async getLabTestFile() {
      try {
        const response = await getLabTestFile(this.labTestId);
        return response.data;
      } catch (error) {
        console.error("Error fetching lab test file:", error);
        return null;
      }
    },
  },
};
</script>

<style scoped>
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
