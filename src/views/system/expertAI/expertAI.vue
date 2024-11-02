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
      <el-tooltip v-if="form.diagnosisMethod === 'expert'" :content="expertButtonTooltip" placement="top">
        <el-button
          type="primary"
          :disabled="expertButtonDisabled"
          @click="handleExpertAction"
        >
          {{ expertButtonText }}
        </el-button>
      </el-tooltip>
      <el-tooltip v-if="form.diagnosisMethod === 'ai'" :content="aiButtonTooltip" placement="top">
        <el-button
          type="primary"
          plain
          :disabled="aiButtonDisabled"
          @click="handleAIAction"
        >
          {{ aiButtonText }}
        </el-button>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
// import { systemChange } from '@/api/system/exportAi.js'
export default {
  data() {
    return {
      form: {
        diagnosisMethod: 'expert' // 默认选项
      },
      expertStatus: '专家诊断未运行',
      aiStatus: 'AI诊断未运行',
      expertButtonText: '启用',
      aiButtonText: '启用',
      expertButtonTooltip: '专家诊断已禁用',
      aiButtonTooltip: 'AI诊断已禁用',
      expertButtonDisabled: false,
      aiButtonDisabled: false
    };
  },
  methods: {
    async handleExpertAction() {
      const action = this.expertButtonText === '启用' ? 'enable' : 'disable';
      const confirmMessage = action === 'enable' ? '确认要启用专家诊断吗？' : '确认要禁用专家诊断吗？';
      const successMessage = action === 'enable' ? '专家诊断启用成功' : '专家诊断禁用成功';
      const failureMessage = action === 'enable' ? '专家诊断启用失败' : '专家诊断禁用失败';

      try {
        await ElMessageBox.confirm(confirmMessage, '确认', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        });
        if (action === 'enable') {
          this.enableExpert(successMessage, failureMessage);
        } else {
          this.disableExpert(successMessage, failureMessage);
        }
      } catch {
        //取消
      }
    },

    async handleAIAction() {
      const action = this.aiButtonText === '启用' ? 'enable' : 'disable';
      const confirmMessage = action === 'enable' ? '确认要启用AI诊断吗？' : '确认要禁用AI诊断吗？';
      const successMessage = action === 'enable' ? 'AI诊断启用成功' : 'AI诊断禁用成功';
      const failureMessage = action === 'enable' ? 'AI诊断启用失败' : 'AI诊断禁用失败';

      try {
        await ElMessageBox.confirm(confirmMessage, '确认', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        });
        if (action === 'enable') {
          this.enableAI(successMessage, failureMessage);
        } else {
          this.disableAI(successMessage, failureMessage);
        }
      } catch {
        // 取消
      }
    },

    enableExpert(successMessage, failureMessage) {
      // 模拟启用操作
      const success = Math.random() > 0.2; // 80% 可能成功

      if (success) {
        this.expertStatus = '专家诊断正在运行';
        this.expertButtonText = '禁用';
        this.expertButtonTooltip = '专家诊断已启用';
        this.expertButtonDisabled = false;
        ElMessage.success(successMessage);
      } else {
        ElMessage.error(failureMessage);
      }
    },

    disableExpert(successMessage, failureMessage) {
      // 模拟禁用操作
      const success = Math.random() > 0.2; // 80% 可能成功

      if (success) {
        this.expertStatus = '专家诊断未运行';
        this.expertButtonText = '启用';
        this.expertButtonTooltip = '专家诊断已禁用';
        this.expertButtonDisabled = false;
        ElMessage.success(successMessage);
      } else {
        ElMessage.error(failureMessage);
      }
    },

    enableAI(successMessage, failureMessage) {
      // 模拟启用操作
      const success = Math.random() > 0.2; // 80% 可能成功

      if (success) {
        this.aiStatus = 'AI诊断正在运行';
        this.aiButtonText = '禁用';
        this.aiButtonTooltip = 'AI诊断已启用';
        this.aiButtonDisabled = false;
        ElMessage.success(successMessage);
      } else {
        ElMessage.error(failureMessage);
      }
    },

    disableAI(successMessage, failureMessage) {
      // 模拟禁用操作
      const success = Math.random() > 0.2; // 80% 可能成功

      if (success) {
        this.aiStatus = 'AI诊断未运行';
        this.aiButtonText = '启用';
        this.aiButtonTooltip = 'AI诊断已禁用';
        this.aiButtonDisabled = false;
        ElMessage.success(successMessage);
      } else {
        ElMessage.error(failureMessage);
      }
    }
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
