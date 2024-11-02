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
        <h3>查看/编辑满意度问卷信息</h3>
        <div class="footer">
          <el-button type="primary" @click="handleSubmit">提交</el-button>
        </div>
      </div>
      <el-form
        :model="form"
        label-width="100px"
        class="form-container"
        ref="form"
      >
        <!-- 调查标题 -->
        <div class="BaseInfo">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">满意度调查标题</span>
          </div>
          <el-form-item label="" prop="surveyTitle">
            <el-input
              v-model="form.surveyTitle"
              style="width: 500px; margin-left: -60px"
              placeholder="请输入满意度调查标题"
              clearable
            ></el-input>
          </el-form-item>
        </div>

        <!-- 调查内容 -->
        <div class="BaseInfo">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">满意度调查内容</span>
          </div>
          <el-form-item label="" prop="surveyContent">
            <el-input
              v-model="form.surveyContent"
              style="width: 500px; margin-left: -60px"
              placeholder="请输入满意度调查内容"
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
import { updateSatisfaction } from "@/api/satisfaction/satisfaction.js"; // 引入API

export default {
  data() {
    return {
      visible: false, // 控制弹窗显示
      form: {
        surveyID: null,
        surveyTitle: "",
        surveyContent: "",
      },
    };
  },
  methods: {
    showDrawer(survey) {
      this.visible = true;
      this.form = { ...survey };
      this.surveyID= survey.surveyID;
    },
    handleCancel() {
      this.visible = false;
    },
    async handleSubmit() {
      try {
        const data={
          surveyID:this.form.surveyID,
          surveyContent:this.form.surveyContent,
          surveyTitle:this.form.surveyTitle,
        };
        const response = await updateSatisfaction(data);
        if (response.data.code === 1) {
          ElMessage.success("提交成功");
          this.visible = false;
          this.$emit("updateSatisfaction"); // 提交后向父组件发送事件
        } else {
          ElMessage.error(response.data.msg || "提交失败");
        }
      } catch (error) {
        ElMessage.error("网络错误，请稍后重试");
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
