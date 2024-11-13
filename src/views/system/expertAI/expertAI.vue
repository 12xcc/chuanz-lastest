<template>
  <div class="container">
    <div class="title-container">
      <div class="blue-box"></div>
      <span class="title-text">专家/AI诊断切换</span>
    </div>
    <div class="content">
      <el-form :model="form" label-width="70px">
        <el-form-item label="诊断方式">
          <el-radio-group v-model="form.diagnosisMethod">
            <el-radio value="expert">专家诊断</el-radio>
            <el-radio value="ai">AI诊断</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>
    <div class="status">
      当前：<span v-if="form.diagnosisMethod === 'expert'">{{ expertStatus }}</span>
      <span v-if="form.diagnosisMethod === 'ai'">{{ aiStatus }}</span>
    </div>
    <div class="button">
        <el-button
          type="primary"
          @click="handleAction"
        >
          确认切换
        </el-button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { systemChange,systemChangeSearch } from '@/api/system/expertAI'
export default {
  data() {
    return {
      form: {
        diagnosisMethod: 'expert' 
      },
      expertStatus: '专家诊断未运行',
      aiStatus: 'AI诊断未运行',
    };
  },
  methods: {
    async handleQuery() {
      const response = await systemChangeSearch();
      if (response.data.data === "AI诊断") {
        this.aiStatus = "AI诊断正在运行";
        this.expertStatus = "专家诊断未运行";
        this.form.diagnosisMethod = 'ai';
      } else {
        this.expertStatus = "专家诊断正在运行";
        this.aiStatus = "AI诊断未运行";
        this.form.diagnosisMethod = 'expert';
      }
      console.log("this.form.diagnosisMethod",this.form.diagnosisMethod)
    },

    async handleAction() {
      ElMessageBox.confirm("是否确认切换", "确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          try {
            let response;
            if(this.form.diagnosisMethod === "expert"){
              // 传false 切换为专家诊断
              response = await systemChange(false);
            }else{
              response = await systemChange(true);
            }
            if (response.data.code === 1) {
              this.$message.success("切换成功");
              this.handleQuery();
            } else {
              this.$message.error("切换失败");
              
            }
          } catch (error) {
            console.error("Error toggling status:", error);
            this.$message.error("切换失败，请重试！");
          }
        })
        .catch(() => {
          // 取消
        });
    },
  },
    mounted(){
    this.handleQuery();
  }
};
</script>

<style  scoped>
.container {
  height: 250px;
  width: 600px;
  position: absolute;
  left: 35%;
  top: 25%;
  background-color: #FFFFFF;
  border-radius: 10px;
  padding: 20px;
}
.content {
  font-size: 14px;
  margin-bottom: 20px;
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
.status {
  margin-bottom: 10px;
  font-size: 14px;
}
.status span {
  color: #486AC8;
  font-weight: bold;
}
.button {
  position: absolute;
  left: 43%;
  top: 75%;
}
</style>
