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
          <span class="title-text">消化系统症状权重表</span>
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
        IsDiarrheaFrequencyGEThreeTimesPerDay: { weightScore: 0, symptomWeightingId: null },
        HasStoolType1: { weightScore: 0, symptomWeightingId: null },
        HasStoolType2: { weightScore: 0, symptomWeightingId: null },
        HasVomiting: { weightScore: 0, symptomWeightingId: null },
        HasNausea: { weightScore: 0, symptomWeightingId: null },
        HasAppetiteLoss: { weightScore: 0, symptomWeightingId: null },
        HasAbdominalDistension: { weightScore: 0, symptomWeightingId: null },
        HasAbdominalPain: { weightScore: 0, symptomWeightingId: null },
        HasBorborygmus: { weightScore: 0, symptomWeightingId: null },
        HasUpperAbdominalDiscomfort: { weightScore: 0, symptomWeightingId: null },
        HasConstipation: { weightScore: 0, symptomWeightingId: null },
        HasOliguriaOrAnuria: { weightScore: 0, symptomWeightingId: null },
      },
      rules: {},
      scoreLabels: [
        { label: "腹泻，>=3天", model: "IsDiarrheaFrequencyGEThreeTimesPerDay" },
        { label: "稀便或水样便或米泔样（粪便性状1）", model: "HasStoolType1" },
        { label: "大块黏膜样或脓血样（粪便性状2）", model: "HasStoolType2" },
        { label: "是否呕吐", model: "HasVomiting" },
        { label: "是否恶心", model: "HasNausea" },
        { label: "是否食欲减退", model: "HasAppetiteLoss" },
        { label: "是否腹胀", model: "HasAbdominalDistension" },
        { label: "是否腹痛", model: "HasAbdominalPain" },
        { label: "是否腹鸣", model: "HasBorborygmus" },
        { label: "是否上腹部不适", model: "HasUpperAbdominalDiscomfort" },
        { label: "是否便秘", model: "HasConstipation" },
        { label: "是否少尿或无尿", model: "HasOliguriaOrAnuria" },
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
