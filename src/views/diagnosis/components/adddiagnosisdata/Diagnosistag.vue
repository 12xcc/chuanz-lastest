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
            <span class="title-text">检测报告</span>
          </div>

          <el-check-tag
            :checked="form.hasBloodTest"
            type="primary"
            @change="toggleTag('hasBloodTest')"
          >
            血常规
          </el-check-tag>

          <el-check-tag
            :checked="form.hasUrineTest"
            type="primary"
            @change="toggleTag('hasUrineTest')"
          >
            尿常规
          </el-check-tag>

          <el-check-tag
            :checked="form.hasStoolTest"
            type="primary"
            @change="toggleTag('hasStoolTest')"
          >
            粪便常规
          </el-check-tag>

          <el-check-tag
            :checked="form.hasImaging"
            type="primary"
            @change="toggleTag('hasImaging')"
          >
            影像学检查
          </el-check-tag>

          <el-check-tag
            :checked="form.hasUltrasound"
            type="primary"
            @change="toggleTag('hasUltrasound')"
          >
            B超
          </el-check-tag>
        </div>

        <div class="DiagnosisExaminations">
          <DiagnosisExaminations ref="DiagnosisExaminations" />
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
import DiagnosisExaminations from './DiagnosisExaminations .vue'

export default {
  components: {
    DiagnosisExaminations,
  },
  data() {
    return {
      visible: false, // 控制弹窗显示
      form: {
        hasBloodTest: false,
        hasUrineTest: false,
        hasStoolTest: false,
        hasImaging: false,
        hasUltrasound: false,
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
        hasBloodTest: false,
        hasUrineTest: false,
        hasStoolTest: false,
        hasImaging: false,
        hasUltrasound: false,
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
