<template>
  <div>
    <el-upload
      v-model:file-list="files"
      action="#"
      list-type="picture-card"
      :auto-upload="false"
      :on-preview="handlePdfPreview"
      :on-remove="handleRemove"
      :on-change="handleFileChange"
      :before-upload="handleBeforeUpload"
      accept=".pdf"
      :disabled="!editable"
    >
      <el-icon v-if="editable"><Plus /></el-icon>

      <!-- 使用 slot 自定义文件显示 -->
      <template #file="{ file }">
        <div class="filestyle">
          <!-- PDF 缩略图图标 -->
          <img 
            v-if="file.raw && file.raw.type === 'application/pdf'" 
            class="el-upload-list__item-thumbnail_pdf" 
            :src="pdfIconUrl" 
            alt="PDF Icon" 
          />
          <span class="el-upload-list__item-actions">
            <!-- 预览按钮 -->
            <span class="el-upload-list__item-preview" @click="handlePdfPreview(file)">
              <el-icon><ZoomIn /></el-icon>
            </span>
            <!-- 删除按钮，仅在编辑模式下显示 -->
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

    <!-- 文件名显示在上传框下方 -->
    <div class="file-names">
      <div v-for="file in files" :key="file.uid" class="file-name">
        {{ file.name }}
      </div>
    </div>

    <!-- PDF 预览弹窗 -->
    <el-dialog v-model="dialogVisible" class="custom-dialog" :modal="true">
      <iframe
        v-if="dialogPdfUrl"
        :src="dialogPdfUrl"
        class="pdf-preview"
        frameborder="0"
      ></iframe>
    </el-dialog>
  </div>
</template>

<script lang="js" setup>
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { Plus, Delete, ZoomIn } from '@element-plus/icons-vue';
import pdfIcon from "@/assets/filesiconPDF.svg"
const props = defineProps({
  filePath: {
    type: String,
    required: false,
  },
  editable: {
    type: Boolean,
    default: false,
  },
});

// 定义 emits
const emits = defineEmits(['file-selected']);

const files = ref([]);
const dialogVisible = ref(false);
const dialogPdfUrl = ref('');
const pdfIconUrl = pdfIcon;

// 初始化文件
onMounted(() => {
  if (props.filePath) {
    files.value.push({
      name: props.filePath.split("/").pop(),
      url: props.filePath,
    });
  }
});

// 预览 PDF
const handlePdfPreview = (file) => {
  dialogPdfUrl.value = file.url || URL.createObjectURL(file.raw);
  dialogVisible.value = true;
};

// 删除 PDF
const handleRemove = (file, fileList) => {
  const index = fileList.indexOf(file);
  if (index !== -1 && props.editable) {
    fileList.splice(index, 1);
    ElMessage.success("PDF文件已删除");
  } else if (!props.editable) {
    ElMessage.warning("编辑模式下才能删除文件");
  }
};

// 防止未在编辑模式时上传文件
const handleBeforeUpload = () => {
  if (!props.editable) {
    ElMessage.warning("请先进入编辑模式");
    return false;
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
</script>



<style scoped>
.el-upload-list__item-thumbnail_pdf {
  width: 60%;
  height: 60%;
}

.el-upload-list__item-thumbnail_jpg {
  width: 70%;
  height: 70%;
  object-fit: contain;
  border-radius: 5px;
}

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
    text-align: left;
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
.custom-dialog {
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: auto;
}

.dialog-image {
  margin: 10px 0;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.pdf-preview {
  width: 100%;
  height: 500px;
}
.custom-thumbnail-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.pdf-thumbnail {
  width: 60%;
  height: auto;
  object-fit: contain;
}

</style>