<template>
  <el-drawer
    :model-value="visible"
    direction="rtl"
    size="700px"
    :with-header="false"
    custom-class="custom-drawer"
    @close="handleCancel"
  >
    <div class="container">
      <div class="title">
        <div class="title">
          <h3>发布满意度问卷</h3>
          <div class="footer">
            <el-button @click="handleCancel">取消</el-button>
            <el-button type="primary" @click="handleSubmit">提交</el-button>
          </div>
        </div>
      </div>
      <el-form
        :model="form"
        label-width="100px"
        class="form-container"
        ref="form"
      >
        <div class="BaseInofo">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">满意度调查标题</span>
          </div>
          <el-form-item label="" prop="surveyTitle">
            <el-input
              v-model="form.surveyTitle"
              style="width: 500px; margin-left: -60px"
              placeholder=""
              clearable
            ></el-input>
          </el-form-item>
        </div>

        <div class="BaseInofo">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">满意度调查内容</span>
          </div>
          <el-form-item label="" prop="surveyContent">
            <el-input
              v-model="form.surveyContent"
              style="width: 500px; margin-left: -60px"
              placeholder=""
              type="textarea"
              clearable
              row="4"
            ></el-input>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </el-drawer>
</template>

<script>
import { ElMessage } from "element-plus";
import Dateselection from "@/components/date_selection.vue";
import { addSatisfactionSurvey } from "@/api/satisfaction/satisfaction";
export default {
  components: {
    Dateselection,
  },
  data() {
    return {
      visible: false, // 控制弹窗显示
      form: {
        name: "",
        phoneNumber: "",
        surveyTitle: "",
        surveyContent: "",
      },
    };
  },
  methods: {
    showDrawer(feedbackId) {
      this.visible = true;
      this.fetchFeedbackById(feedbackId);
    },
    handleCancel() {
      this.visible = false;
    },

    async handleSubmit() {
      try {
        const requestData = {
          surveyContent: this.form.surveyContent,
          surveyTitle: this.form.surveyTitle,
        };

        // 调用接口提交用户信息
        const response = await addSatisfactionSurvey(requestData);

        // 判断响应
        if (response.data.code === 1) {
          ElMessage({
            message: "提交成功",
            type: "success",
          });
          this.visible = false; // 关闭弹窗
          this.$emit("addsatis"); // 提交后向父组件发送事件
        } else {
          ElMessage({
            message: "提交失败：" + response.data.msg,
            type: "error",
          });
        }
      } catch (error) {
        console.error("提交出错:", error);
        ElMessage({
          message: "提交出错，请重试",
          type: "error",
        });
      }
    },
  },
};
</script>



<style  scoped>
.custom-drawer {
  height: 100%;
}
.form-container {
  padding: 20px;
  margin-top: 70px;
}
.title {
  position: fixed;
  top: 0;
  right: 0;
  width: 700px;
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

.Dormitory {
  display: flex;
}
.DormitoryRoomNumber {
  margin-left: -60px;
}
.DormitoryOccupants {
  margin-left: -60px;
}

.BaseInfo {
  margin-top: 30px;
  margin-bottom: 30px;
}

p {
  font-size: 14px;
  margin-bottom: 15px;
}
.highlight {
  color: #285ac8;
  font-weight: bold;
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
