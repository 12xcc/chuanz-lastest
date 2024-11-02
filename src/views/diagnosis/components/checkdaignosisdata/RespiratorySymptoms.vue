<template>
  <div class="flex gap-2">
    <!-- 表单选项 -->
    <el-check-tag
      :checked="form.hasCough"
      type="primary"
      @change="toggleTag('hasCough')"
      :disabled="allDisabled"  
    >
      咳嗽
    </el-check-tag>
    <el-check-tag
      :checked="form.hasSputum"
      type="primary"
      @change="toggleTag('hasSputum')"
      :disabled="allDisabled"  
    >
      咳痰
    </el-check-tag>
    <el-check-tag
      :checked="form.hasBloodySputum"
      type="primary"
      @change="toggleTag('hasBloodySputum')"
      :disabled="allDisabled"  
    >
      血痰
    </el-check-tag>
    <el-check-tag
      :checked="form.hasHemoptysis"
      type="primary"
      @change="toggleTag('hasHemoptysis')"
      :disabled="allDisabled"  
    >
      咳血
    </el-check-tag>
    <el-check-tag
      :checked="form.hasSoreThroat"
      type="primary"
      @change="toggleTag('hasSoreThroat')"
      :disabled="allDisabled"  
    >
      咽痛
    </el-check-tag>
    <el-check-tag
      :checked="form.hasDryThroat"
      type="primary"
      @change="toggleTag('hasDryThroat')"
      :disabled="allDisabled"  
    >
      咽干
    </el-check-tag>
    <el-check-tag
      :checked="form.hasNasalCongestion"
      type="primary"
      @change="toggleTag('hasNasalCongestion')"
      :disabled="allDisabled"  
    >
      鼻塞
    </el-check-tag>
    <el-check-tag
      :checked="form.hasRunnyNose"
      type="primary"
      @change="toggleTag('hasRunnyNose')"
      :disabled="allDisabled"  
    >
      流涕
    </el-check-tag>
    <el-check-tag
      :checked="form.hasPharyngealHyperemia"
      type="primary"
      @change="toggleTag('hasPharyngealHyperemia')"
      :disabled="allDisabled"  
    >
      咽充血
    </el-check-tag>
    <el-check-tag
      :checked="form.hasChestTightness"
      type="primary"
      @change="toggleTag('hasChestTightness')"
      :disabled="allDisabled"  
    >
      胸闷
    </el-check-tag>
    <el-check-tag
      :checked="form.hasShortnessOfBreath"
      type="primary"
      @change="toggleTag('hasShortnessOfBreath')"
      :disabled="allDisabled"  
    >
      气促
    </el-check-tag>
    <el-check-tag
      :checked="form.hasBreathingDifficulty"
      type="primary"
      @change="toggleTag('hasBreathingDifficulty')"
      :disabled="allDisabled"  
    >
      呼吸困难
    </el-check-tag>
    <el-check-tag
      :checked="form.hasHoarseness"
      type="primary"
      @change="toggleTag('hasHoarseness')"
      :disabled="allDisabled"  
    >
      声音嘶哑
    </el-check-tag>
    <el-check-tag
      :checked="form.hasBronchitis"
      type="primary"
      @change="toggleTag('hasBronchitis')"
      :disabled="allDisabled"  
    >
      支气管炎或支气管肺炎
    </el-check-tag>
    <el-check-tag
      :checked="form.hasLungRales"
      type="primary"
      @change="toggleTag('hasLungRales')"
      :disabled="allDisabled"  
    >
      听诊肺部有散在湿性罗音
    </el-check-tag>
  </div>
</template>

<script>
export default {
      props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      allDisabled:true, 
      form: {
        hasCough: false,
        hasSputum: false,
        hasBloodySputum: false,
        hasHemoptysis: false,
        hasSoreThroat: false,
        hasDryThroat: false,
        hasNasalCongestion: false,
        hasRunnyNose: false,
        hasChestTightness: false,
        hasShortnessOfBreath: false,
        hasBreathingDifficulty: false,
        hasHoarseness: false,
        hasBronchitis: false,
        hasPharyngealHyperemia: false, //咽充血
        hasLungRales: false, //是否听诊肺部有散在湿性罗音
      }
    };
  },
watch: {
  data: {
    immediate: true,
    handler(newVal) {
      console.log('Received data in RespiratorySymptoms.vue:', newVal);
      if (newVal) {
        this.form = { ...this.form, ...newVal };
        this.$forceUpdate();
      }
    },
  },
},

  methods: {
    toggleTag(field) {
     this.form[field] = !this.form[field];
    },

    handleReset() {
      this.form = this.getInitialForm();
      this.message = "";
    },
    handleAble() {
      this.allDisabled = false;
       
    },
    handleCancel(){
      this.allDisabled = true;
       
    },
    getInitialForm() {
      return {
        hasCough: false,
        hasSputum: false,
        hasBloodySputum: false,
        hasHemoptysis: false,
        hasSoreThroat: false,
        hasDryThroat: false,
        hasNasalCongestion: false,
        hasRunnyNose: false,
        hasChestTightness: false,
        hasShortnessOfBreath: false,
        hasBreathingDifficulty: false,
        hasHoarseness: false,
        hasBronchitis: false,
        hasPharyngealHyperemia: false, //咽充血
        hasLungRales: false, //是否听诊肺部有散在湿性罗音
      };
    },
    getData() {
      return this.form; // 返回当前组件的表单数据
    },
  }
};
</script>

<style scoped>
.el-check-tag{
    margin: 10px;
    font-weight: normal;
}
.el-check-tag.is-checked {
  background-color: var(--el-color-primary) !important;
  color: #fff !important;
  border-color: var(--el-color-primary) !important;
  font-weight: normal;
}
</style>
