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
          <span class="title-text">全身症状权重表</span>
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
        HasFever: { weightScore: 0, symptomWeightingId: null },
        HasChills: { weightScore: 0, symptomWeightingId: null },
        HasSweating: { weightScore: 0, symptomWeightingId: null },
        HasFatigue: { weightScore: 0, symptomWeightingId: null },
        HasHeadache: { weightScore: 0, symptomWeightingId: null },
        HasMusclePain: { weightScore: 0, symptomWeightingId: null },
        HasJointPain: { weightScore: 0, symptomWeightingId: null },
        HasLymphNodeSwelling: { weightScore: 0, symptomWeightingId: null },
        HasCyanosis: { weightScore: 0, symptomWeightingId: null },
        HasSubcutaneousAndMucosalBleedingSpots: {
          weightScore: 0,
          symptomWeightingId: null,
        },
        HasPainfulRedRash: { weightScore: 0, symptomWeightingId: null },
        HasBloodBlisters: { weightScore: 0, symptomWeightingId: null },
        HasSkinUlcer: { weightScore: 0, symptomWeightingId: null },
        HasCongestiveOrPetechialRash: {
          weightScore: 0,
          symptomWeightingId: null,
        },
        HasPressureInsensitiveRash: {
          weightScore: 0,
          symptomWeightingId: null,
        },
        HasDehydration: { weightScore: 0, symptomWeightingId: null },
        HasItchyRash: { weightScore: 0, symptomWeightingId: null },
        HasEdema: { weightScore: 0, symptomWeightingId: null },
        HasNightSweats: { weightScore: 0, symptomWeightingId: null },
        HasWeightLoss: { weightScore: 0, symptomWeightingId: null },
        HasExhaustion: { weightScore: 0, symptomWeightingId: null },
      },

      rules: {}, // 表单验证规则
      scoreLabels: [
        { label: "发热", model: "HasFever" },
        { label: "寒战", model: "HasChills" },
        { label: "大汗", model: "HasSweating" },
        { label: "乏力", model: "HasFatigue" },
        { label: "头痛", model: "HasHeadache" },
        { label: "肌肉酸痛", model: "HasMusclePain" },
        { label: "关节酸痛", model: "HasJointPain" },
        { label: "淋巴结肿大", model: "HasLymphNodeSwelling" },
        { label: "发绀", model: "HasCyanosis" },
        {
          label: "皮下及黏膜出血",
          model: "HasSubcutaneousAndMucosalBleedingSpots",
        },
        { label: "红色丘疹", model: "HasPainfulRedRash" },
        { label: "血性水泡", model: "HasBloodBlisters" },
        { label: "溃疡", model: "HasSkinUlcer" },
        { label: "点状出血疹", model: "HasCongestiveOrPetechialRash" },
        { label: "压之不退", model: "HasPressureInsensitiveRash" },
        { label: "脱水", model: "HasDehydration" },
        { label: "瘙痒性丘疹", model: "HasItchyRash" },
        { label: "水肿", model: "HasEdema" },
        { label: "盗汗", model: "HasNightSweats" },
        { label: "消瘦", model: "HasWeightLoss" },
        { label: "虚脱", model: "HasExhaustion" },
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
            this.symptoms[fieldname].symptomWeightingId =
              item.symptomWeightingId;
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


