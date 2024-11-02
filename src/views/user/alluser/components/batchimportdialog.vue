<template>
  <el-dialog
    v-model="dialogVisible"
    title="批量导入"
    width="500px"
    right
  >
    <el-upload
      class="upload-demo"
      action="/systemUser/userManager/addManyUserByExcel"
      :show-file-list="true"
      :file-list="fileList"
      :on-change="handleChange"
      :on-remove="handleRemove"
      :auto-upload="false"
      multiple
      drag
    >
      <img class="el-icon--upload" src="@/assets/excel.png">
      <div class="el-upload__text">
        拖拽文件到这里或 <em>点击上传</em>
      </div>
      <template #tip>
        <div class="el-upload__tip">
          允许格式：.xlsx
        </div>
      </template>
    </el-upload>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确认</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script>
import { ElMessage } from 'element-plus';
import { importUsersByExcel } from '@/api/user/alluser.js';

export default {
  name: 'BatchImportDialog',
  data() {
    return {
      dialogVisible: false,
      fileList: [],
      uploadFailed: false,
    };
  },
  methods: {
    // 控制弹窗显示
    showDialog() {
      this.dialogVisible = true;
      this.uploadFailed = false; // 重置上传状态
      this.fileList = []; // 清空文件列表
    },
    
    // 关闭弹窗
    handleClose() {
      this.dialogVisible = false;
      this.fileList = []; // 关闭时清空文件列表
    },

    // 添加文件
    handleChange(file) {
      if (file.status === 'finished') {
        ElMessage.success('文件已添加');
      }
      this.fileList.push(file);
    },

    // 删除文件
    handleRemove(file) {
      const index = this.fileList.indexOf(file);
      if (index > -1) {
        this.fileList.splice(index, 1); // 从列表中删除文件
      }
    },

    // 提交 调用批量上传用户api
        // 批量上传医院信息
    async handleConfirm() {
      if (this.fileList.length === 0) {
        ElMessage.warning("请上传文件");
        return;
      }

      const formData = new FormData();
      this.fileList.forEach((file) => {
        formData.append("file", file.raw); // 上传文件
      });

      try {
        const response = await importUsersByExcel(formData);
        if (response.data.code === 1) {
          ElMessage.success("上传成功");
          this.uploadFailed = false; // 上传成功
           this.$emit('update-success');  //触发刷新
        }else{
            ElMessage.error(`上传失败: ${response.data.msg || "未知错误"}`);
        this.uploadFailed = true; // 上传失败
        }
      } catch (error) {
        ElMessage.error(`上传失败: ${response.data.msg || "服务器错误"}`);
        this.uploadFailed = true; // 上传失败
      } finally {
        this.dialogVisible = false; // 关闭对话框
        if (this.uploadFailed) {
          this.fileList = []; // 仅在上传失败时清空文件列表
        }
      }
    },
  },
};
</script>

<style scoped>
.el-button {
  margin-left: 20px;
  margin-right: 20px;
}
.dialog-footer {
  display: flex;
  justify-content: center;
}
.el-icon--upload {
  width: 120px;
  height: 50%;
}
</style>
