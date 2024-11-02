<template>
  <div class="container">
    <div class="title-container">
      <div class="blue-box"></div>
      <span class="title-text">权重自动更新功能</span>
    </div>
    <div class="content">
      启动权重参数自动更新功能后，系统将在后台启动一个AI程序，这个程序会根据新增的诊断样例自动调整权重值。调整后的结果可以通过查看或导出为excel表进行检查。
    </div>
    <div class="content">
      本项功能需要等诊断样例足够多，并经过线下离线验证后才能启用。
    </div>
    <div class="status">
      当前：AutoAIWeightUpdater程序<span>{{ status }}</span>。
    </div>
    <div class="button">
      <el-tooltip v-if="!isEnabled" :content="enableTooltip" placement="top">
        <el-button
          type="primary"
          :disabled="isEnabled"
          @click="enable"
        >
          启用
        </el-button>
      </el-tooltip>
      <el-tooltip v-if="isEnabled" :content="disableTooltip" placement="top">
        <el-button
          type="primary"
          plain
          :disabled="!isEnabled"
          @click="disable"
        >
          禁用
        </el-button>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';

export default {
  data() {
    return {
      status: '未运行',
      isEnabled: false,
      enableTooltip: '自动更新权重功能已禁用',
      disableTooltip: '自动更新权重功能已启用'
    };
  },
  methods: {
    enable() {
      try {
        // 模拟启用操作，假设可能出现失败
        // 实际中可以替换成真实的启用逻辑
        const success = Math.random() > 0.2; // 80% 可能成功

        if (success) {
          this.status = '正在运行';
          this.isEnabled = true;
          ElMessage.success('启用成功');
        } else {
          throw new Error('启用失败');
        }
      } catch (error) {
        ElMessage.error('启用失败');
      }
    },

    disable() {
      try {
        // 模拟禁用操作，假设可能出现失败
        // 实际中可以替换成真实的禁用逻辑
        const success = Math.random() > 0.2; // 80% 可能成功

        if (success) {
          this.status = '未运行';
          this.isEnabled = false;
          ElMessage.success('禁用成功');
        } else {
          throw new Error('禁用失败');
        }
      } catch (error) {
        ElMessage.error('禁用失败');
      }
    }
  }
};
</script>

<style scoped>
.container {
  height: 320px;
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
