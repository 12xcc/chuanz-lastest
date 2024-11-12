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
      当前：AutoAIWeightUpdater程序<span>{{ status }}</span
      >。
    </div>
    <div class="button">
      <el-tooltip v-if="!isEnabled" :content="enableTooltip" placement="top">
        <el-button type="primary" :disabled="isEnabled" @click="enable">
          启用
        </el-button>
      </el-tooltip>
      <el-tooltip v-if="isEnabled" :content="disableTooltip" placement="top">
        <el-button type="primary" plain :disabled="!isEnabled" @click="disable">
          禁用
        </el-button>
      </el-tooltip>
      <el-button type="warning" @click="handleInstant"
        >立即执行自动权重更新</el-button
      >
    </div>
  </div>
</template>

<script>
import { ref} from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import {
  startAI,
  updateAutoAIWeightUpdater,
  getAutoAIWeightUpdater,
} from "@/api/system/autoweight";
export default {
  data() {
    return {
      status: "未运行",
      isEnabled: false,
      enableTooltip: "自动更新权重功能已禁用，点击按钮启用",
      disableTooltip: "自动更新权重功能已启用，点击按钮禁用",
      autoAIWeightUpdater1: true,
      autoAIWeightUpdater2: false,
    };
  },
  methods: {
    async handleQuery() {
      const response = await getAutoAIWeightUpdater();
      if (response.data.data) {
        this.status = "正在运行";
        this.isEnabled = true;
      } else {
        this.status = "未运行";
        this.isEnabled = false;
      }
    },
    async enable() {
      try {
        const response = await updateAutoAIWeightUpdater(
          this.autoAIWeightUpdater1
        );
        if (response.data.code === 1) {
          this.isEnabled = true;
          ElMessage.success("启用成功");
          this.handleQuery();
        } else {
          throw new Error("启用失败");
        }
      } catch (error) {
        ElMessage.error("启用失败");
      }
    },

    async disable() {
      try {
        const response = await updateAutoAIWeightUpdater(
          this.autoAIWeightUpdater2
        );
        if (response.data.code === 1) {
          this.isEnabled = false;
          ElMessage.success("禁用成功");
          this.handleQuery();
        } else {
          throw new Error("禁用失败");
        }
      } catch (error) {
        ElMessage.error("禁用失败");
      }
    },

    async handleInstant() {
      ElMessageBox.confirm("确定立即执行？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          try {
            const response = await startAI();
            if (response.data.code === 1) {
              this.$message.success("执行成功");
            } else {
              this.$message.error("执行失败：" + response.data.message);
            }
          } catch (error) {
            console.error("Error toggling status:", error);
            this.$message.error("执行失败，请重试！");
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

<style scoped>
.container {
  height: 320px;
  width: 600px;
  position: absolute;
  left: 35%;
  top: 25%;
  background-color: #ffffff;
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
  color: #486ac8;
  font-weight: bold;
}
.button {
  position: absolute;
  left: 30%;
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
