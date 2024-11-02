<template>
  <div>
    <el-upload
      v-model:file-list="files"
      action="#"
      list-type="picture-card"
      :auto-upload="false"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      accept=".jpg,.jpeg,.pdf"
    >
      <el-icon><Plus /></el-icon>

      <template #file="{ file }">
        <div class="filestyle">
          <img 
            v-if="file.raw && file.raw.type === 'application/pdf'" 
            class="el-upload-list__item-thumbnail_pdf" 
            src="@/assets/filesiconPDF.svg" 
            alt="PDF Icon" 
          />
          <img 
            v-else 
            class="el-upload-list__item-thumbnail_jpg" 
            :src="file.url || URL.createObjectURL(file.raw)" 
            alt="Image Preview" 
          />
          <span class="el-upload-list__item-actions">
            <span
              class="el-upload-list__item-preview"
              @click="() => handlePictureCardPreview(file)"
            >
              <el-icon><ZoomIn /></el-icon>
            </span>
            <span
              v-if="!disabled"
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

    <el-dialog v-model="dialogVisible" class="custom-dialog" :modal="true">
      <template #title>
        <span>{{ currentFilename }}</span>
      </template>
      <img 
        v-if="!isPdf" 
        class="dialog-image" 
        :src="dialogImageUrl" 
        alt="Preview Image" 
      />
      <iframe 
        v-if="isPdf" 
        :src="dialogImageUrl" 
        class="pdf-preview" 
        frameborder="0" 
      ></iframe>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Delete, Plus, ZoomIn } from '@element-plus/icons-vue'
import type { UploadFile, UploadProps } from 'element-plus'

const props = defineProps({
  'report-type': {
    type: String,
    required: true,
  },
  'specimen-type': {
    type: String,
    required: true,
  },
});

const dialogImageUrl = ref('');
const dialogVisible = ref(false);
const disabled = ref(false);
const files = ref<UploadFile[]>([]);
const isPdf = ref(false); // 新增变量判断是否为PDF
const currentFilename = ref(''); // 新增变量存储当前文件名

const handleRemove: UploadProps['onRemove'] = (file, fileList) => {
  const index = fileList.indexOf(file);
  if (index !== -1) {
    fileList.splice(index, 1);
  }
}

const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url || URL.createObjectURL(file.raw);
  isPdf.value = file.raw && file.raw.type === 'application/pdf'; // 判断是否为PDF
  currentFilename.value = file.name; // 获取当前文件名
  dialogVisible.value = true;
}
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

.dialog-image {
    margin: 10px 0; 
    max-width: 100%; 
    max-height: 100%; 
    object-fit: contain; 
}

.pdf-preview {
    width: 100%; 
    height: 500px; /* 你可以根据需要调整高度 */
}
</style>
