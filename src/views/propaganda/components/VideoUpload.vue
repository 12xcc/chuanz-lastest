<template>
  <div>
    <!-- 上传组件，控制是否可编辑 -->
    <el-upload
      v-model:file-list="files"
      action="#"
      list-type="picture-card"
      :auto-upload="false"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :before-upload="handleBeforeUpload"
      :on-change="handleFileChange"
      :disabled="!editable"
      accept=".mp4"
    >
      <el-icon v-if="editable"><Plus /></el-icon>

      <!-- 自定义缩略图显示和操作按钮 -->
      <template #file="{ file }">
        <div class="filestyle">
          <img 
            v-if="file.thumbnailUrl" 
            :src="file.thumbnailUrl" 
            class="el-upload-list__item-thumbnail" 
            alt="Video Thumbnail" 
          />
          <span class="el-upload-list__item-actions">
            <!-- 预览按钮 -->
            <span
              class="el-upload-list__item-preview"
              @click="() => handlePictureCardPreview(file)"
            >
              <el-icon><ZoomIn /></el-icon>
            </span>
            <!-- 删除按钮，仅在可编辑模式下显示 -->
            <span
              v-if="editable"
              class="el-upload-list__item-delete"
              @click="() => handleRemove(file, files)"
            >
              <el-icon><Delete /></el-icon>
            </span>
          </span>
        </div>
      </template>
    </el-upload>

    <div class="file-names">
      <div v-for="file in files" :key="file.uid" class="file-name">
        {{ file.name }}
      </div>
    </div>

    <!-- 视频预览对话框 -->
    <el-dialog 
      v-model="dialogVisible" 
      class="custom-dialog" 
      :modal="true" 
      @close="stopVideo"
    >
      <template #title>
        <span>{{ currentFilename }}</span>
      </template>
      <div class="video-container">
        <div>视频下载中，请稍候...</div>
        <!-- <video 
          v-if="isVideo" 
          class="dialog-video" 
          :src="dialogImageUrl" 
          controls 
          autoplay 
          playsinline 
          muted
          @error="handleVideoError"
          @ended="stopVideo"
          ref="videoPlayer"
        /> -->
      </div>
    </el-dialog>
  </div>
</template>

<script lang="js" setup>
import { ref, watch, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { Plus, Delete, ZoomIn } from '@element-plus/icons-vue';

const props = defineProps({
  filePath: {
    type: String,
    required: false,
  },
  editable: {
    type: Boolean,
    default: false, // 控制是否处于编辑模式
  },
});
const emits = defineEmits(['file-selected']);

// 控制文件上传和预览
const dialogImageUrl = ref(''); // 存储预览的视频或图片URL
const dialogVisible = ref(false); // 控制对话框的显示
const files = ref([]); // 文件列表
const currentFilename = ref(''); // 当前文件名
const isVideo = ref(false); // 判断文件是否为视频
const videoPlayer = ref(null); // 视频播放器的引用

// 初始化文件
onMounted(() => {
  if (props.filePath) {
    files.value.push({
      name: props.filePath.split('/').pop(),
      url: props.filePath,
      status: 'success',
      uid: Date.now(),
    });
  }
});

// 预览视频或图片
const handlePictureCardPreview = (file) => {
  // // 如果是视频文件，直接使用文件的 URL 或者外部链接
  // dialogImageUrl.value = file.url || URL.createObjectURL(file.raw);
  // isVideo.value = file.raw && file.raw.type.startsWith('video/'); // 判断文件类型是否是视频
  // currentFilename.value = file.name; // 获取文件名，用于在对话框标题中显示
  // dialogVisible.value = true; // 打开对话框
  const videoUrl = file.url || URL.createObjectURL(file.raw);
  window.location.href = videoUrl;  // 使用 location.href 跳转到视频链接
};

// 删除文件
const handleRemove = (file, fileList) => {
  const index = fileList.indexOf(file);
  if (index !== -1) {
    fileList.splice(index, 1);
    ElMessage.success('视频已删除');
  }
};

// 上传文件限制
const handleBeforeUpload = () => {
  if (!props.editable) {
    ElMessage.warning('请先进入编辑模式');
    return false;
  }

  // 检查文件列表中是否已有文件
  if (files.value.length >= 1) {
    ElMessage.warning('该宣传材料只能上传一个文件');
    return false; // 取消上传
  }

  return true;
};

// 选择文件后将文件对象传递到父组件，同时限制上传数量
const handleFileChange = (file, fileList) => {
  // 检查文件列表中是否已有文件
  if (files.value.length >= 1) {
    ElMessage.warning('该宣传材料只能上传一个文件');
    fileList.pop(); // 移除新添加的文件
    return;
  }

  // 更新文件列表并生成缩略图
  files.value = fileList.map(f => ({
    name: f.name,
    url: URL.createObjectURL(f.raw),
    raw: f.raw,
    uid: f.uid,
  }));

  // 将文件传递给父组件
  if (file.raw) {
    emits('file-selected', file.raw);
  }
};

// 停止视频播放
const stopVideo = () => {
  if (videoPlayer.value) {
    videoPlayer.value.pause();
    videoPlayer.value.currentTime = 0;
  }
  isVideo.value = false;
};

// 处理视频播放错误
const handleVideoError = () => {
  console.error('视频播放错误，无法加载视频。');
};
</script>



<style scoped>
.filestyle {
    display: flex;
    justify-content: center; 
    align-items: center; 
    position: relative; 
    width: 100%;
    height: 100%; 
}

.el-upload-list__item-thumbnail {
    width: 100%;
    height: auto;
    object-fit: cover; 
    border-radius: 5px;
}

.file-names {
    margin-top: 10px; 
}

.file-name {
    text-align: left; 
    font-size: 14px; 
}

.custom-dialog {
    display: flex;
    justify-content: center; 
    align-items: center; 
    width: auto; 
    height: auto;
}

.video-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%; 
    height: auto; 
}

.dialog-video {
    max-width: 90%; 
    max-height: 80%; 
    width: auto; 
    height: auto; 
}
</style>
