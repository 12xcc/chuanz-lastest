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
        <h3>查看反馈信息</h3>
      </div>
      <el-form
        :model="form"
        label-width="100px"
        class="form-container"
        ref="form"
        disabled
      >
        <div class="BaseInofo">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">反馈人姓名</span>
          </div>
          <el-form-item label="" prop="name">
            <el-input
              v-model="form.name"
              style="width: 200px;margin-left: -60px;"
              placeholder=""
              clearable
            ></el-input>
          </el-form-item>

          <div class="BaseInofo">
            <div class="title-container">
              <div class="blue-box"></div>
              <span class="title-text">反馈人联系电话</span>
            </div>
           <el-form-item label="" prop="phoneNumber">
            <el-input
              v-model="form.phoneNumber"
              style="width: 200px;margin-left: -60px;"
              placeholder=""
              clearable
            ></el-input>
          </el-form-item>
          </div>

          <div class="BaseInofo">
            <div class="title-container">
              <div class="blue-box"></div>
              <span class="title-text">意见标题</span>
            </div>
            <el-form-item label="" prop="feedbackTitle">
              <el-input
                v-model="form.feedbackTitle"
                style="width: 500px; margin-left: -60px"
                placeholder=""
                clearable
              ></el-input>
            </el-form-item>
          </div>

          <div class="BaseInofo">
            <div class="title-container">
              <div class="blue-box"></div>
              <span class="title-text">意见内容</span>
            </div>
            <el-form-item label="" prop="feedbackText">
              <el-input
                v-model="form.feedbackText"
                style="width: 500px; margin-left: -60px"
                placeholder=""
                type="textarea"
                clearable
                row="4"
              ></el-input>
            </el-form-item>
          </div>
        </div>
      </el-form>
    </div>
  </el-drawer>
</template>

<script>
import { ElMessage } from "element-plus";
import Dateselection from "@/components/date_selection.vue";
import {fetchFeedbackDataById} from "@/api/feedback/feedback.js"
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
        feedbackTitle: "",
        feedbackText: "",
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

      async fetchFeedbackById(feedbackId){
        try{
            const response = await fetchFeedbackDataById(feedbackId); 
            
            if(response.data.code === 1){
              const data =response.data.data;
              this.form = data;
            }else {
          console.error("获取反馈信息失败:", response.data.msg);
        }

        }catch(error){
           console.error("请求出错:", error);
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
  padding-bottom: 25px;
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
