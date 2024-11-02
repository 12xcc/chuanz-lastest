<template>
  <div class="container">
    <el-form
      :model="form"
      label-width="80px"
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
            :checked="form.hasArrhythmia"
            type="primary"
            @change="toggleTag('hasArrhythmia')"
            :disabled="allDisabled"
          >
            心律不齐
          </el-check-tag>
          <el-check-tag
            :checked="form.hasChestPain"
            type="primary"
            @change="toggleTag('hasChestPain')"
            :disabled="allDisabled"
          >
            胸痛
          </el-check-tag>
          <el-check-tag
            :checked="form.hasRapidPulse"
            type="primary"
            @change="toggleTag('hasRapidPulse')"
            :disabled="allDisabled"
          >
            脉搏细速
          </el-check-tag>
          <el-check-tag
            :checked="form.hasPalpitation"
            type="primary"
            @change="toggleTag('hasPalpitation')"
            :disabled="allDisabled"
          >
            心悸
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
        hasArrhythmia: false,
        hasChestPain: false,
        hasRapidPulse: false,
        hasPalpitation: false,
      },

      rules: {},
    };
  },
  watch: {
    data: {
      immediate: true,
      handler(newVal) {
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
        hasArrhythmia: false,
        hasChestPain: false,
        hasRapidPulse: false,
        hasPalpitation: false,
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
