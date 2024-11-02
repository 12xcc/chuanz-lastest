<template>
  <div>
    <div class="title-container">
      <div class="blue-box"></div>
      <span class="title-text">粪便检查报告（请上传jpg或pdf格式）</span>
    </div>
    <UploadSection
      v-model="reports.hasStoolTest"
      :specimen-type="'粪便'"
      report-type="hasStoolTest"
    />

    <div class="title-container">
      <div class="blue-box"></div>
      <span class="title-text">呕吐物检查报告（请上传jpg或pdf格式）</span>
    </div>
    <UploadSection
      v-model="reports.vomit"
      :specimen-type="'呕吐物'"
      report-type="vomit"
    />

    <div class="title-container">
      <div class="blue-box"></div>
      <span class="title-text">血液检查报告（请上传jpg或pdf格式）</span>
    </div>
    <UploadSection
      v-model="reports.blood"
      :specimen-type="'血'"
      report-type="blood"
    />
  </div>
</template>

<script>
import UploadSection from '@/components/UploadSection.vue';

export default {
  components: {
    UploadSection,
  },
  data() {
    return {
      reports: {
        hasStoolTest: [],
        vomit: [],
        blood: [],
      },
    };
  },
  methods: {

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
