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
import { ref, onMounted } from 'vue';
import { Delete, Plus, ZoomIn } from '@element-plus/icons-vue';
import type { UploadFile } from 'element-plus';

// 定义文件接口
interface InitialFile {
  name: string;
  url: string;
  raw?: File;
}

interface CustomFile extends UploadFile {
  uid: number; // 添加 uid 属性
}

// 从 props 中获取数据
const props = defineProps({
  'report-type': {
    type: String,
    required: true,
  },
  'specimen-type': {
    type: String,
    required: true,
  },
  initialFile: {
    type: Array as () => InitialFile[],
    default: () => [],
  },
  fetchFile: {
    type: Function,
    required: true,
  }
});

const dialogImageUrl = ref('');
const dialogVisible = ref(false);
const disabled = ref(false);
const files = ref<CustomFile[]>([]); 
const isPdf = ref(false);
const currentFilename = ref('');

// 处理文件移除
const handleRemove = (file: CustomFile, fileList: CustomFile[]) => {
  const index = fileList.indexOf(file);
  if (index !== -1) {
    fileList.splice(index, 1);
  }
}

// 处理图片预览
const handlePictureCardPreview = (file: CustomFile) => {
  dialogImageUrl.value = file.url || URL.createObjectURL(file.raw);
  isPdf.value = file.raw && file.raw.type === 'application/pdf';
  currentFilename.value = file.name;
  dialogVisible.value = true;
}

// 从后端获取文件数据并设置到文件列表
const setInitialFiles = () => {
  props.initialFile.forEach((file: InitialFile) => {
    files.value.push({
      name: file.name,
      url: file.url,
      raw: file.raw,
      uid: Date.now() + Math.random(), // 确保 uid 唯一
      status: 'success',
    } as CustomFile); // 类型断言
  });
}

// 组件挂载时设置初始文件
onMounted(() => {
  setInitialFiles();
});
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
    height: 500px; 
}
</style>
