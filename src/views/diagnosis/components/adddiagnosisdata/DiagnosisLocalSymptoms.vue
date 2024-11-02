<template>
  <div class="container">
    <el-form
      :model="form"
      label-width="80px"
      class="form-container"
      ref="form"
      :rules="rules"
    >
      <div class="GeneralSymptoms">
        <div class="Condition">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">症状</span>
          </div>
          <el-check-tag
            :checked="form.hasConjunctivitis"
            type="primary"
            @change="toggleTag('hasConjunctivitis')"
          >
            结膜炎
          </el-check-tag>

          <el-check-tag
            :checked="form.hasConjunctivalCongestion"
            type="primary"
            @change="toggleTag('hasConjunctivalCongestion')"
          >
            眼结膜充血、肿胀疼痛
          </el-check-tag>

          <el-check-tag
            :checked="form.hasEyelidEdema"
            type="primary"
            @change="toggleTag('hasEyelidEdema')"
          >
            上下眼睑水肿
          </el-check-tag>

          <el-check-tag
            :checked="form.hasSmellTasteLoss"
            type="primary"
            @change="toggleTag('hasSmellTasteLoss')"
          >
            嗅觉味觉减退或丧失
          </el-check-tag>

          <el-check-tag
            :checked="form.hasFacialRednessOrPallor"
            type="primary"
            @change="toggleTag('hasFacialRednessOrPallor')"
          >
            颜面潮红或苍白
          </el-check-tag>

          <el-check-tag
            :checked="form.hasRednessNeckChest"
            type="primary"
            @change="toggleTag('hasRednessNeckChest')"
          >
            潮红（颈部、胸部）
          </el-check-tag>

          <el-check-tag
            :checked="form.hasLipCyanosis"
            type="primary"
            @change="toggleTag('hasLipCyanosis')"
          >
            口唇发绀
          </el-check-tag>

          <el-check-tag
            :checked="form.hasSkinPallorOrBruising"
            type="primary"
            @change="toggleTag('hasSkinPallorOrBruising')"
          >
            皮肤苍白或带青紫
          </el-check-tag>

          <el-check-tag
            :checked="form.hasGumBleeding"
            type="primary"
            @change="toggleTag('hasGumBleeding')"
          >
            牙龈出血
          </el-check-tag>

          <el-check-tag
            :checked="form.hasKidneyPain"
            type="primary"
            @change="toggleTag('hasKidneyPain')"
          >
            肾区疼痛
          </el-check-tag>

          <el-check-tag
            :checked="form.hasLowBackPain"
            type="primary"
            @change="toggleTag('hasLowBackPain')"
          >
            腰痛
          </el-check-tag>

          <el-check-tag
            :checked="form.hasOrbitalPain"
            type="primary"
            @change="toggleTag('hasOrbitalPain')"
          >
            眼眶痛
          </el-check-tag>

          <el-check-tag
            :checked="form.hasHepatomegaly"
            type="primary"
            @change="toggleTag('hasHepatomegaly')"
          >
            肝肿大
          </el-check-tag>

          <el-check-tag
            :checked="form.hasSplenomegaly"
            type="primary"
            @change="toggleTag('hasSplenomegaly')"
          >
            脾肿大
          </el-check-tag>

          <el-check-tag
            :checked="form.hasMucosalBleedingInOralOrNasal"
            type="primary"
            @change="toggleTag('hasMucosalBleedingInOralOrNasal')"
          >
            口腔、鼻腔等处黏膜有出血点
          </el-check-tag>

          <el-check-tag
            :checked="form.hasSkinBleedingPoints"
            type="primary"
            @change="toggleTag('hasSkinBleedingPoints')"
          >
            腋下/上臂/胸部或其它部位有皮肤出血点
          </el-check-tag>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
import Dateselection from "@/components/date_selection.vue";
export default {
  components: {
    Dateselection,
  },
  data() {
    return {
      visible: false, // 控制弹窗显示
      form: {
        hasConjunctivitis: false, // 是否结膜炎
        hasConjunctivalCongestion: false, // 是否眼结膜充血、肿胀疼痛
        hasEyelidEdema: false, // 是否上下眼睑水肿
        hasSmellTasteLoss: false, // 是否味觉丧失或减退
        hasFacialRednessOrPallor: false,
        hasRednessNeckChest: false,
        hasLipCyanosis: false,
        hasSkinPallorOrBruising: false,
        hasGumBleeding: false,
        hasKidneyPain: false,
        hasLowBackPain: false,
        hasOrbitalPain: false,
        hasMucosalBleedingInOralOrNasal: false,
        hasSkinBleedingPoints: false,
        hasHepatomegaly: false, // BOOLEAN, -- 是否肝肿大
        hasSplenomegaly: false, // BOOLEAN, -- 是否脾肿大
      },

      rules: {},
    };
  },
  methods: {
    toggleTag(field) {
      this.form[field] = !this.form[field];
    },
    showDrawer(user) {
      this.form = { ...user };
      this.visible = true;
    },
    handleCancel() {
      this.visible = false;
      this.handleReset();
    },
    handleSubmit() {
      console.log("触发");
      this.$refs.form.validate((valid) => {
        console.log("Form is valid:", valid);
        if (valid) {
          console.log("Form data:", this.form);
          this.visible = false;
          ElMessage({
            message: "提交成功",
            type: "success",
          });
          this.handleReset();
        } else {
          console.log("表单验证失败");
          ElMessage({
            message: "提交失败",
            type: "error",
          });
          return false;
        }
      });
    },
    handleReset() {
      this.form = this.getInitialForm();
      this.message = "";
    },
    getInitialForm() {
      return {
        hasConjunctivitis: false, // 是否结膜炎
        hasConjunctivalCongestion: false, // 是否眼结膜充血、肿胀疼痛
        hasEyelidEdema: false, // 是否上下眼睑水肿
        hasSmellTasteLoss: false, // 是否味觉丧失或减退
        hasFacialRednessOrPallor: false,
        hasRednessNeckChest: false,
        hasLipCyanosis: false,
        hasSkinPallorOrBruising: false,
        hasGumBleeding: false,
        hasKidneyPain: false,
        hasLowBackPain: false,
        hasOrbitalPain: false,
        hasMucosalBleedingInOralOrNasal: false,
        hasSkinBleedingPoints: false,
        hasHepatomegaly: false, // BOOLEAN, -- 是否肝肿大
        hasSplenomegaly: false, // BOOLEAN, -- 是否脾肿大
      };
    },
    getData() {
      return this.form; 
    },
  },
};
</script>



<style scoped>
.custom-drawer {
  height: 100%;
}
.form-container {
  margin-top: 10px;
}
.title {
  position: fixed;
  top: 0;
  right: 0;
  width: 700px;
  background: #ffffff;
  padding-bottom: 25px;
  z-index: 100;
  border: 3px solid #fafafa;
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
  background-color: #285ac8 !important;
  color: #fff !important;
  font-weight: normal;
}
.GeneralSymptoms {
  margin-top: 20px;
  margin-left: 20px;
}
.Condition {
  margin-top: 20px;
}
</style>
