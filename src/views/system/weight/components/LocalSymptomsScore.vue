<template>
  <div class="container">
    <el-form
      :model="symptoms"
      label-width="140px"
      class="form-container"
      ref="form"
      :rules="rules"
    >
      <div class="select flex gap-2 mb-4">
        <div class="title-container">
          <div class="blue-box"></div>
          <span class="title-text">局部症状权重表</span>
        </div>

        <div class="slider-demo-block" v-for="(score, index) in scoreLabels" :key="index">
          <el-tag type="primary">{{ score.label }}</el-tag>
          <el-slider
            class="custom-slider"
            v-model.number="symptoms[score.model].weightScore"
            show-input
            @change="updateWeightScore"
          />
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    symptomsData: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      symptoms: {
        HasConjunctivitis: { weightScore: 0, symptomWeightingId: null },
        HasConjunctivalCongestion: { weightScore: 0, symptomWeightingId: null },
        HasEyelidEdema: { weightScore: 0, symptomWeightingId: null },
        HasSmellTasteLoss: { weightScore: 0, symptomWeightingId: null },
        HasFacialRednessOrPallor: { weightScore: 0, symptomWeightingId: null },
        HasRednessNeckChest: { weightScore: 0, symptomWeightingId: null },
        HasLipCyanosis: { weightScore: 0, symptomWeightingId: null },
        HasSkinPallorOrBruising: { weightScore: 0, symptomWeightingId: null },
        HasGumBleeding: { weightScore: 0, symptomWeightingId: null },
        HasKidneyPain: { weightScore: 0, symptomWeightingId: null },
        HasLowBackPain: { weightScore: 0, symptomWeightingId: null },
        HasOrbitalPain: { weightScore: 0, symptomWeightingId: null },
        HasMucosalBleedingInOralOrNasal: { weightScore: 0, symptomWeightingId: null },
        HasSkinBleedingPoints: { weightScore: 0, symptomWeightingId: null },
      },
      rules: {},
      scoreLabels: [
        { label: "是否有结膜炎", model: "HasConjunctivitis" },
        { label: "是否有眼结膜充血、肿胀疼痛", model: "HasConjunctivalCongestion" },
        { label: "是否有上下眼睑水肿", model: "HasEyelidEdema" },
        { label: "是否有嗅觉味觉减退或丧失", model: "HasSmellTasteLoss" },
        { label: "是否有颜面潮红或苍白", model: "HasFacialRednessOrPallor" },
        { label: "是否有颈部、胸部潮红", model: "HasRednessNeckChest" },
        { label: "是否有口唇发绀", model: "HasLipCyanosis" },
        { label: "是否有皮肤苍白或带青紫", model: "HasSkinPallorOrBruising" },
        { label: "是否有牙龈出血", model: "HasGumBleeding" },
        { label: "是否有肾区疼痛", model: "HasKidneyPain" },
        { label: "是否有腰痛", model: "HasLowBackPain" },
        { label: "是否有眼眶痛", model: "HasOrbitalPain" },
        { label: "是否有口腔、鼻腔等处黏膜出血点", model: "HasMucosalBleedingInOralOrNasal" },
        { label: "是否有腋下/上臂/胸部或其它部位皮肤出血点", model: "HasSkinBleedingPoints" },
      ],
    };
  },
  watch: {
    symptomsData: {
      immediate: true,
      handler(newData) {
        newData.forEach((item) => {
          const fieldname = item.symptomFieldName;
          if (this.symptoms.hasOwnProperty(fieldname)) {
            this.symptoms[fieldname].weightScore = item.weightScore;
            this.symptoms[fieldname].symptomWeightingId = item.symptomWeightingId;
          }
        });
        this.updateWeightScore();
      },
    },
  },
  methods: {
    // 更新总分
    updateWeightScore() {
      const totalScore = Object.values(this.symptoms).reduce(
        (acc, symptom) => acc + Number(symptom.weightScore),
        0
      );
      this.$emit("update-weight-score", totalScore);
    },
  },
  computed: {
    // 计算总分
    totalWeightScore() {
      return Object.values(this.symptoms).reduce(
        (acc, symptom) => acc + Number(symptom.weightScore),
        0
      );
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
.el-tag {
  margin: 10px;
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
.slider-demo-block {
  width: 700px;
  display: flex;
  align-items: center;
}
.slider-demo-block .el-slider {
  margin-left: 12px;
}
.custom-slider .el-input-number {
  width: 130px !important;
}
.el-slider__input {
  width: 130px;
}
.custom-slider {
  width: 400px;
}
.el-slider {
  --el-slider-button-size: 15px !important;
}
.el-slider__runway .show-input {
  width: 200px !important;
}
</style>
