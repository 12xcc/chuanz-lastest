<template>
  <div class="container">
    <el-form
      :model="form"
      label-width="200px"
      class="form-container"
      ref="form"
      :rules="rules"
      :disabled="allDisabled"
    >
      <div class="GeneralSymptoms">
        <div class="Condition">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">症状</span>
          </div>
          <el-check-tag
            :checked="form.hasSuddenOnset"
            type="primary"
            @change="toggleTag('hasSuddenOnset')"
            :disabled="allDisabled"
          >
            突然发病
          </el-check-tag>

          <el-check-tag
            :checked="form.hasRapidProgress"
            type="primary"
            @change="toggleTag('hasRapidProgress')"
            :disabled="allDisabled"
          >
            病情进展迅速
          </el-check-tag>

          <el-check-tag
            :checked="form.hasPeriodicAttack"
            type="primary"
            @change="toggleTag('hasPeriodicAttack')"
            :disabled="allDisabled"
          >
            周期性发作
          </el-check-tag>

          <el-check-tag
            :checked="form.hasForcedPosture"
            type="primary"
            @change="toggleTag('hasForcedPosture')"
            :disabled="allDisabled"
          >
            强迫体位
          </el-check-tag>

          <el-check-tag
            :checked="form.hasCalfMusclePain"
            type="primary"
            @change="toggleTag('hasCalfMusclePain')"
            :disabled="allDisabled"
          >
            腓肠肌疼痛
          </el-check-tag>
        </div>

        <div class="Condition">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">生活情况</span>
          </div>
          <el-form-item label="睡眠状况" label-position="left">
            <el-radio-group v-model="form.sleepQuality">
              <el-radio :value="'好'">好</el-radio>
              <el-radio :value="'一般'">一般</el-radio>
              <el-radio :value="'差'">差</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="营养状况" label-position="left">
            <el-radio-group v-model="form.nutritionStatus">
              <el-radio :value="'好'">好</el-radio>
              <el-radio :value="'一般'">一般</el-radio>
              <el-radio :value="'差'">差</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="工作和生活压力" label-position="left">
            <el-radio-group v-model="form.workLifeStress">
              <el-radio :value="'大'">大</el-radio>
              <el-radio :value="'一般'">一般</el-radio>
              <el-radio :value="'小'">小</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="自我感觉症状的严重程度" label-position="left">
            <el-radio-group v-model="form.symptomSeverity">
              <el-radio :value="'轻'">轻</el-radio>
              <el-radio :value="'中'">中</el-radio>
              <el-radio :value="'重'">重</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>

        <div class="Condition">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">其他症状</span>
          </div>
          <el-check-tag
            :checked="form.hasOtherSymptoms"
            type="primary"
            @change="toggleTag('hasOtherSymptoms')"
            :disabled="allDisabled"
          >
            其他
          </el-check-tag>
          <div class="NextContainer">
            <el-form-item
              v-if="form.hasOtherSymptoms"
              label="其他症状"
              style="
                margin-left: -100px;
                margin-top: 10px;
                padding: 15px 0 15px 0;
              "
            >
              <el-input
                v-model="form.otherSymptomsName"
                placeholder="请输入其他症状"
                clearable
                size="default"
                style="margin-left: 100px; width: 250px"
              />
            </el-form-item>
          </div>
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
         hasSuddenOnset: false,
        hasRapidProgress: false,
        hasPeriodicAttack: false,
        hasForcedPosture: false,
        hasCalfMusclePain: false,
        sleepQuality:null,
        nutritionStatus: null,
        workLifeStress: null,
        symptomSeverity:null,
        hasOtherSymptoms: false,
        otherSymptomsName: null,
      },

      rules: {},
    };
  },

  watch: {
    data: {
      immediate: true,
      handler(newVal) {
        console.log("子组件接收:", newVal); // 打印传入的数据
        if (newVal) {
          // 将所有数据映射到 form
          this.form = { ...this.form, ...newVal };
          // 强制更新渲染视图
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
      if (!this.form.hasOtherSymptoms) {
        this.form.otherSymptomsName = "";
      }
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
         hasSuddenOnset: false,
        hasRapidProgress: false,
        hasPeriodicAttack: false,
        hasForcedPosture: false,
        hasCalfMusclePain: false,
        sleepQuality:null,
        nutritionStatus: null,
        workLifeStress: null,
        symptomSeverity:null,
        hasOtherSymptoms: false,
        otherSymptomsName: null,
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
.el-form-item {
  display: flex;
  margin-left: 20px;
  /* flex-direction: column; */
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
.NextContainer {
  width: 500px;
}
</style>
