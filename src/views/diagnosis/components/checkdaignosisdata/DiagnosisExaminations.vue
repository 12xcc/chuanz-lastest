<template>
  <div>
    <el-form
      :model="form"
      label-width="100px"
      class="form-container"
      ref="form"
      :rules="rules"
    >
      <!-- 病原学及血清学检查标签 -->
      <div class="select flex gap-2 mb-4">
        <div class="title-container">
          <div class="blue-box"></div>
          <span class="title-text">病原学及血清学检查</span>
        </div>

        <el-check-tag
          :checked="form.hasImaging"
          type="primary"
          @change="toggleTag('hasImaging')"
        >
          影像学检查报告
        </el-check-tag>

        <el-check-tag
          :checked="form.hasUltrasound"
          type="primary"
          @change="toggleTag('hasUltrasound')"
        >
          B超报告
        </el-check-tag>

        <el-check-tag
          :checked="form.hasBloodTest"
          type="primary"
          @change="toggleTag('hasBloodTest')"
        >
          血液检查报告
        </el-check-tag>

        <el-check-tag
          :checked="form.hasStoolTest"
          type="primary"
          @change="toggleTag('hasStoolTest')"
        >
          粪便常规检查报告
        </el-check-tag>

        <el-check-tag
          :checked="form.hasUrineTest"
          type="primary"
          @change="toggleTag('hasUrineTest')"
        >
          尿常规检查报告
        </el-check-tag>

        <el-check-tag
          :checked="form.caseReport"
          type="primary"
          @change="toggleTag('caseReport')"
        >
          病案首页
        </el-check-tag>
      </div>
    </el-form>
    <!-- 影像学检查报告 -->
    <div class="title-container">
      <div class="blue-box"></div>
      <span class="title-text">影像学检查报告（请上传jpg或pdf格式）</span>
    </div>
    <UploadSection
      v-model="fileLists.imaging"
      :specimen-type="'影像学'"
      report-type="'影像学检查报告'"
      @fileChange="updateReportStatus('hasImaging', fileLists.imaging)"
    />

    <!-- B超报告 -->
    <div class="title-container">
      <div class="blue-box"></div>
      <span class="title-text">B超报告（请上传jpg或pdf格式）</span>
    </div>
    <UploadSection
      v-model="fileLists.ultrasound"
      :specimen-type="'B超'"
      report-type="'B超报告'"
      @fileChange="updateReportStatus('hasUltrasound', fileLists.ultrasound)"
    />

    <!-- 血液检查报告 -->
    <div class="title-container">
      <div class="blue-box"></div>
      <span class="title-text">血液检查报告（请上传jpg或pdf格式）</span>
    </div>
    <UploadSection
      v-model="fileLists.bloodTest"
      :specimen-type="'血'"
      report-type="'血液检查报告'"
      @fileChange="updateReportStatus('hasBloodTest', fileLists.bloodTest)"
    />

    <!-- 粪便常规检查报告 -->
    <div class="title-container">
      <div class="blue-box"></div>
      <span class="title-text">粪便常规报告（请上传jpg或pdf格式）</span>
    </div>
    <UploadSection
      v-model="fileLists.stoolTest"
      :specimen-type="'粪便'"
      report-type="'粪便常规检查报告'"
      @fileChange="updateReportStatus('hasStoolTest', fileLists.stoolTest)"
    />

    <!-- 尿常规检查报告 -->
    <div class="title-container">
      <div class="blue-box"></div>
      <span class="title-text">尿常规检查报告（请上传jpg或pdf格式）</span>
    </div>
    <UploadSection
      v-model="fileLists.urineTest"
      :specimen-type="'尿'"
      report-type="'尿常规检查报告'"
      @fileChange="updateReportStatus('hasUrineTest', fileLists.urineTest)"
    />

    <!-- 病案首页 -->
    <div class="title-container">
      <div class="blue-box"></div>
      <span class="title-text">病案首页（请上传jpg或pdf格式）</span>
    </div>
    <UploadSection
      v-model="fileLists.caseReport"
      :specimen-type="'病案'"
      report-type="'病案首页'"
      @fileChange="updateReportStatus('caseReport', fileLists.caseReport)"
    />
  </div>
</template>

<script>
import UploadSection from "@/components/UploadSection.vue";

export default {
  components: {
    UploadSection,
  },
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      form: {
        hasImaging: false, // 是否有影像学检查报告
        hasUltrasound: false, // 是否有B超报告
        hasBloodTest: false, // 是否有血液检查报告
        hasStoolTest: false, // 是否有粪便常规检查报告
        hasUrineTest: false, // 是否有尿常规检查报告
        // caseReport: false,       // 是否有病案首页
      },
      fileLists: {
        imaging: [], // 影像学检查报告的文件数组
        ultrasound: [], // B超报告的文件数组
        bloodTest: [], // 血液检查报告的文件数组
        stoolTest: [], // 粪便常规检查报告的文件数组
        urineTest: [], // 尿常规检查报告的文件数组
        caseReport: [], // 病案首页的文件数组
      },
      rules: {},
    };
  },
  watch: {
    data: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          // 先将所有数据映射到 form
          this.form = { ...this.form, ...newVal };

          this.$forceUpdate();
        } else {
          // console.warn("Received null or undefined data");
        }
      },
    },
  },
  methods: {
    toggleTag(field) {
      // 切换布尔状态
      this.form[field] = !this.form[field];
      if (!this.form[field]) {
        // 如果取消选中，则清空相应的文件列表
        this.fileLists[field] = [];
      }
    },
    updateReportStatus(field, fileList) {
      // 根据文件列表的长度更新布尔值，表示是否有报告
      this.form[field] = fileList.length > 0;
    },
    getData() {
      console.log(this.form);
      return this.form;
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
.el-check-tag {
  margin: 10px;
  font-weight: normal;
}
.el-check-tag.is-checked {
  background-color: #333333 !important;
  color: #ffffff;
  font-weight: normal;
}
</style>
