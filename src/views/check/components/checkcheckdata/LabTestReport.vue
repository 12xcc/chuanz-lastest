<template>
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
        :fetch-file="fetchStoolTestFile"
      />

      <div class="title-container">
        <div class="blue-box"></div>
        <span class="title-text">呕吐物检查报告（请上传jpg或pdf格式）</span>
      </div>
      <UploadSection
        v-model="reports.vomit"
        :specimen-type="'呕吐物'"
        report-type="vomit"
        :fetch-file="fetchVomitFile"
      />

      <div class="title-container">
        <div class="blue-box"></div>
        <span class="title-text">血液检查报告（请上传jpg或pdf格式）</span>
      </div>
      <UploadSection
        v-model="reports.blood"
        :specimen-type="'血'"
        report-type="blood"
        :fetch-file="fetchBloodFile"
      />
    </el-form>
  </div>
</template>

<script>
import UploadSection from '@/components/UploadSection.vue';
import { getLabTestFile } from "@/api/check/check.js";

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
      labTestId: null, // 固定的labTestId
    };
  },
  methods: {
    handleAble() {
      this.allDisabled = false;
    },
    handleCancel() {
      this.allDisabled = true;
    },
    async fetchStoolTestFile() {
      await this.fetchFile('hasStoolTest');
    },
    async fetchVomitFile() {
      await this.fetchFile('vomit');
    },
    async fetchBloodFile() {
      await this.fetchFile('blood');
    },
    async fetchFile(reportType) {
      try {
        const response = await getLabTestFile(this.labTestId);
        const fileData = response.data; // 获取文件数据

        // 假设 fileData 是一个文件对象
        if (fileData) {
          this.reports[reportType].push(fileData); // 将文件添加到对应的报告中
        }
      } catch (error) {
        console.error("Error fetching lab test file:", error);
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
