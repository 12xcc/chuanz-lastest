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
          <span class="title-text">危险因素与暴露史权重表</span>
        </div>

        <div
          class="slider-demo-block"
          v-for="(score, index) in scoreLabels"
          :key="index"
        >
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
        ContactWithFeverPatient: { weightScore: 0, symptomWeightingId: null }, 
        ContactWithDiarrheaPatient: { weightScore: 0, symptomWeightingId: null },
        ContactWithRashPatient: { weightScore: 0, symptomWeightingId: null },
        ContactWithTuberculosisPatient: { weightScore: 0, symptomWeightingId: null },
        HasDrinkingRawWater: { weightScore: 0, symptomWeightingId: null }, 
        HasEatingRawFood: { weightScore: 0, symptomWeightingId: null }, 
        HasEatingColdCookedFood: { weightScore: 0, symptomWeightingId: null },
        HasEatingSeafood: { weightScore: 0, symptomWeightingId: null }, 
        GroupOutbreak: { weightScore: 0, symptomWeightingId: null },
        OutdoorStayOrWorkWithinMonth: { weightScore: 0, symptomWeightingId: null },
          PlagueArea: { weightScore: 0, symptomWeightingId: null },
    AnthraxArea: { weightScore: 0, symptomWeightingId: null },
    MalariaArea: { weightScore: 0, symptomWeightingId: null },
    ContactWithAnimalProducts: { weightScore: 0, symptomWeightingId: null },
    ContactWithAnimals : { weightScore: 0, symptomWeightingId: null },

        IsHillyOrMountainous: { weightScore: 0, symptomWeightingId: null }, 
        IsPlain: { weightScore: 0, symptomWeightingId: null },
        HasMosquitoBite: { weightScore: 0, symptomWeightingId: null },
        TickBite: { weightScore: 0, symptomWeightingId: null }, 
        FleaBite: { weightScore: 0, symptomWeightingId: null }, 
        ContactWithRatIn2Months: { weightScore: 0, symptomWeightingId: null },
        EatenFoodContaminatedByRatFeces: { weightScore: 0, symptomWeightingId: null },
        DrunkWaterFromDitchesOrPonds: { weightScore: 0, symptomWeightingId: null }, 
        RestedNearRatHoles: { weightScore: 0, symptomWeightingId: null }, 
        RatOrRatDroppingsAtWorkplace: { weightScore: 0, symptomWeightingId: null },
        ContactWithPatientExcreta: { weightScore: 0, symptomWeightingId: null },
      },
      rules: {},
      scoreLabels: [
        { label: "接触过发热患者", model: "ContactWithFeverPatient" },
        { label: "接触过腹泻患者", model: "ContactWithDiarrheaPatient" },
        { label: "接触过皮疹患者", model: "ContactWithRashPatient" },
        { label: "接触过结核病患者", model: "ContactWithTuberculosisPatient" },
        { label: "饮生水", model: "HasDrinkingRawWater" },
        { label: "吃生冷食品", model: "HasEatingRawFood" },
        { label: "熟食冷吃", model: "HasEatingColdCookedFood" },
        { label: "吃海水产品", model: "HasEatingSeafood" },
        { label: "同一家庭、办公室、车间等集体单位是否有聚集性发病", model: "GroupOutbreak" },
        { label: "发病前1月内在野外住宿或工作", model: "OutdoorStayOrWorkWithinMonth" },
        {label :"到过鼠疫流行区",model:"PlagueArea"},
        { label: "到过炭疽流行区", model: "AnthraxArea" },
        { label: "到过疟疾流行区", model: "MalariaArea" },
        { label: "接触过动物制品", model: "ContactWithAnimalProducts" },
        { label: "接触过动物", model: "ContactWithAnimals" },
        { label: "居住在丘陵或山区", model: "IsHillyOrMountainous" },
        { label: "居住在平原", model: "IsPlain" },
        { label: "14天内被蚊虫叮咬过", model: "HasMosquitoBite" },
        { label: "发病前2周内被蜱叮咬过", model: "TickBite" },
        { label: "发病是否被跳蚤叮咬过", model: "FleaBite" },
        { label: "发病前2个月内接触鼠类", model: "ContactWithRatIn2Months" },
        { label: "发病前1月内吃过被鼠排泄物污染的食物", model: "EatenFoodContaminatedByRatFeces" },
        { label: "发病前1月内在野外喝过沟水", model: "DrunkWaterFromDitchesOrPonds" },
        { label: "发病前9天内在鼠洞附近坐卧", model: "RestedNearRatHoles" },
        { label: "工作场所有鼠或鼠排泄物", model: "RatOrRatDroppingsAtWorkplace" },
        { label: "发病前1月内接触病人排泄物", model: "ContactWithPatientExcreta" },
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
