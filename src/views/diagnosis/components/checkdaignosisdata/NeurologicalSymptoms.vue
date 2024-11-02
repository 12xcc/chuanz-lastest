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
            :checked="form.hasDelirium"
            type="primary"
            @change="toggleTag('hasDelirium')"
            :disabled="allDisabled"
          >
            儋妄
          </el-check-tag>

          <el-check-tag
            :checked="form.hasConvulsion"
            type="primary"
            @change="toggleTag('hasConvulsion')"
            :disabled="allDisabled"
          >
            抽搐
          </el-check-tag>

          <el-check-tag
            :checked="form.hasDrowsiness"
            type="primary"
            @change="toggleTag('hasDrowsiness')"
            :disabled="allDisabled"
          >
            昏睡
          </el-check-tag>

          <el-check-tag
            :checked="form.hasComa"
            type="primary"
            @change="toggleTag('hasComa')"
            :disabled="allDisabled"
          >
            昏迷
          </el-check-tag>

          <el-check-tag
            :checked="form.hasStiffNeck"
            type="primary"
            @change="toggleTag('hasStiffNeck')"
            :disabled="allDisabled"
          >
            颈部强直
          </el-check-tag>

          <el-check-tag
            :checked="form.hasRestlessness"
            type="primary"
            @change="toggleTag('hasRestlessness')"
            :disabled="allDisabled"
          >
            烦躁不安
          </el-check-tag>

          <el-check-tag
            :checked="form.hasMuscleParalysisNeckShoulder"
            type="primary"
            @change="toggleTag('hasMuscleParalysisNeckShoulder')"
            :disabled="allDisabled"
          >
            颈肩部肌肉迟缓性瘫痪
          </el-check-tag>

          <el-check-tag
            :checked="form.hasMuscleParalysisLimbs"
            type="primary"
            @change="toggleTag('hasMuscleParalysisLimbs')"
            :disabled="allDisabled"
          >
            肢体肌肉迟缓性瘫痪
          </el-check-tag>

          <el-check-tag
            :checked="form.hasSwallowingDifficulty"
            type="primary"
            @change="toggleTag('hasSwallowingDifficulty')"
            :disabled="allDisabled"
          >
            吞咽困难
          </el-check-tag>

          <el-check-tag
            :checked="form.hasSpeechDisorder"
            type="primary"
            @change="toggleTag('hasSpeechDisorder')"
            :disabled="allDisabled"
          >
            语言障碍
          </el-check-tag>

          <el-check-tag
            :checked="form.hasConsciousnessDisorder"
            type="primary"
            @change="toggleTag('hasConsciousnessDisorder')"
            :disabled="allDisabled"
          >
            意识障碍或惊厥
          </el-check-tag>

          <el-check-tag
            :checked="form.hasDizziness"
            type="primary"
            @change="toggleTag('hasDizziness')"
            :disabled="allDisabled"
          >
            头晕
          </el-check-tag>

          <el-check-tag
            :checked="form.hasTinnitus"
            type="primary"
            @change="toggleTag('hasTinnitus')"
            :disabled="allDisabled"
          >
            耳鸣
          </el-check-tag>

          <el-check-tag
            :checked="form.hasHearingLoss"
            type="primary"
            @change="toggleTag('hasHearingLoss')"
            :disabled="allDisabled"
          >
            听力减退
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
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      allDisabled: true,
      visible: false, // 控制弹窗显示
      form: {
        hasDelirium: false,
        hasConvulsion: false,
        hasDrowsiness: false,
        hasComa: false,
        hasStiffNeck: false,
        hasRestlessness: false,
        hasMuscleParalysisNeckShoulder: false,
        hasMuscleParalysisLimbs: false,
        hasSwallowingDifficulty: false,
        hasSpeechDisorder: false,
        hasConsciousnessDisorder: false,
        hasDizziness: false,
        hasTinnitus: false,
        hasHearingLoss: false,
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
      this.form[field] = !this.form[field];
    },

    showDrawer(user) {
      this.form = { ...user };
      this.visible = true;
    },
    handleAble() {
      this.allDisabled = false;
    },
    handleCancel() {
      this.allDisabled = true;
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
        hasDelirium: false,
        hasConvulsion: false,
        hasDrowsiness: false,
        hasComa: false,
        hasStiffNeck: false,
        hasRestlessness: false,
        hasMuscleParalysisNeckShoulder: false,
        hasMuscleParalysisLimbs: false,
        hasSwallowingDifficulty: false,
        hasSpeechDisorder: false,
        hasConsciousnessDisorder: false,
        hasDizziness: false,
        hasTinnitus: false,
        hasHearingLoss: false,
      };
    },

    getData() {
      return this.form; // 返回当前组件的表单数据
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
