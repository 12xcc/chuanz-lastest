<template>
  <el-drawer
    :model-value="visible"
    direction="rtl"
    size="800px"
    :with-header="false"
    custom-class="custom-drawer"
    @close="handleCancel"
  >
    <div class="container">
      <div class="title">
        <h3>查看/编辑宣传材料</h3>
        <div class="footer">
          <el-button @click="handleCancel">取消</el-button>
          <el-button v-if="!isEditing" @click="handleEdit">编辑</el-button>
          <el-button v-if="isEditing" type="primary" @click="handleSubmit"
            >提交</el-button
          >
        </div>
      </div>
      <el-form
        :model="form"
        label-width="200px"
        class="form-container"
        ref="form"
        :rules="rules"
        label-position="left"
      >
        <div class="BaseInfo">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">宣传材料信息</span>
          </div>
          <div class="BaseInfoDetail">
            <el-form-item label="标题" prop="Title">
              <el-input
                v-model="form.Title"
                style="width: 400px"
                placeholder="请输入标题"
                @blur="$refs.form.validateField('Title')"
                clearable
                :disabled="allDisabled"
              ></el-input>
            </el-form-item>

            <el-form-item label="材料类型" prop="MaterialType">
              <el-radio-group
                v-model="form.MaterialType"
                :disabled="allDisabled"
              >
                <el-radio value="图片">图片</el-radio>
                <el-radio value="文章">文章</el-radio>
                <el-radio value="视频">视频</el-radio>
                <el-radio value="网页链接">网页链接</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="材料所属疾病类型" prop="diseaseTypeName" size="default">
              <el-select
                v-model="form.diseaseTypeName"
                placeholder=""
                clearable
                size="default"
                style="width: 400px; margin-right: -15px"
                @clear="handleQuery"
                :disabled="allDisabled"
              >
                <el-option
                  value="新型冠状病毒感染"
                  label="新型冠状病毒感染"
                ></el-option>
                <el-option value="流感" label="流感"></el-option>
                <el-option value="鼠疫" label="鼠疫"></el-option>
                <el-option value="感染性腹泻" label="感染性腹泻"></el-option>
                <el-option value="炭疽" label="炭疽"></el-option>
                <el-option value="结核病" label="结核病"></el-option>
                <el-option
                  value="登革热（蚊媒传染病）"
                  label="登革热（蚊媒传染病）"
                ></el-option>
                <el-option
                  value="疟疾（蚊媒传染病）"
                  label="疟疾（蚊媒传染病）"
                ></el-option>
                <el-option
                  value="森林脑炎（蜱媒传染病）"
                  label="森林脑炎（蜱媒传染病）"
                ></el-option>
                <el-option
                  value="发热伴血小板减少综合征（蜱媒传染病）"
                  label="发热伴血小板减少综合征（蜱媒传染病）"
                ></el-option>
                <el-option value="斑疹伤寒" label="斑疹伤寒"></el-option>
                <el-option
                  value="流行性出血热"
                  label="流行性出血热"
                ></el-option>
                <el-option value="其他" label="其他"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>

        <div class="select flex gap-2 mb-4">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">材料文件</span>
          </div>

          <!-- 文章时启用 PdfUpload，传递filePath和editable状态 -->
          <PdfUpload
            v-if="form.MaterialType === '文章'"
            :file-path="form.filePath"
            :editable="isEditing"
            ref="PdfUpload"
          />

          <!-- 图片时启用 ImageUpload，传递filePath和editable状态 -->
          <ImageUpload
            v-if="form.MaterialType === '图片'"
            :file-path="form.filePath"
            :editable="isEditing"
            ref="ImageUpload"
          />

          <!-- 视频时启用 VedioUpload，传递filePath和editable状态 -->
          <VedioUpload
            v-if="form.MaterialType === '视频'"
            :file-path="form.filePath"
            :editable="isEditing"
            ref="VedioUpload"
          />

          <!-- 网页链接时 -->
          <el-input
            :disabled="allDisabled"
            v-model="form.Link"
            v-if="form.MaterialType === '网页链接'"
            style="width: 400px"
          />
        </div>
      </el-form>
    </div>
  </el-drawer>
</template>

<script>
import { ElMessage } from "element-plus";
import PdfUpload from "./pdfUpload.vue";
import ImageUpload from "./imageUpload.vue";
import VedioUpload from "./VideoUpload.vue";
import { getMaterialById } from "@/api/propaganda/propaganda.js";

export default {
  components: {
    PdfUpload,
    ImageUpload,
    VedioUpload,
  },
  data() {
    return {
      allDisabled: true, // 控制是否处于只读模式
      visible: false, // 控制弹窗的显示
      isEditing: false, // 控制编辑状态
      form: {}, // 表单数据
      rules: {}, // 表单验证规则
      diseaseTypeName: null, // 疾病类型名称
    };
  },
  watch: {
    // 监听材料类型的变更
    "form.MaterialType"(newType, oldType) {
      if (newType !== oldType && this.form.filePath) {
        const fileExtension = this.form.filePath.split(".").pop().toLowerCase();

        // 切换到图片类型，但文件不是图片格式，清空文件
        if (
          newType === "图片" &&
          !["jpg", "png", "jpeg"].includes(fileExtension)
        ) {
          this.form.filePath = "";
        }
        // 切换到文章类型，但文件不是 PDF，清空文件
        else if (newType === "文章" && fileExtension !== "pdf") {
          this.form.filePath = "";
        }
        // 切换到视频类型，但文件不是视频格式，清空文件
        else if (newType === "视频" && fileExtension !== "mp4") {
          this.form.filePath = "";
        }
      }
    },
  },
  methods: {
    // 展示抽屉，并加载资料信息
    showDrawer(materialId) {
      this.fetchMaterialById(materialId);
      this.visible = true;
    },

    // 根据 materialId 获取资料信息
    async fetchMaterialById(materialId) {
      try {
        const response = await getMaterialById(materialId);

        if (response.data.code === 1) {
          const data = response.data.data;
          this.form.Title = data.title;
          this.form.MaterialType = data.materialType;
          this.form.Link = data.link;
          this.form.diseaseTypeName = data.diseaseTypeName;

          // const baseUrl = "http://43.138.213.55:8080";
          const baseUrl = "https://ds.sccdc.cn";

          // 判断文件后缀并拼接文件路径
          if (data.filePath) {
            const fileExtension = data.filePath.split(".").pop().toLowerCase();

            if (["jpg", "png", "jpeg"].includes(fileExtension)) {
              // 图片类型
              this.form.filePath = `${baseUrl}/common/file/getLearningMaterialFile/${data.filePath}`;
              if (this.form.MaterialType !== "图片") {
                // 如果当前材料类型不是图片，清空 filePath
                this.form.filePath = "";
              }
            } else if (fileExtension === "pdf") {
              // 文章类型
              this.form.filePath = `${baseUrl}/common/file/getLearningMaterialFile/${data.filePath}`;
              if (this.form.MaterialType !== "文章") {
                // 如果当前材料类型不是文章，清空 filePath
                this.form.filePath = "";
              }
            } else if (fileExtension === "mp4") {
              // 视频类型
              this.form.filePath = `${baseUrl}/common/file/getLearningMaterialFile/${data.filePath}`;
              if (this.form.MaterialType !== "视频") {
                // 如果当前材料类型不是视频，清空 filePath
                this.form.filePath = "";
              }
            } else {
              // 其他文件类型，不显示
              this.form.filePath = "";
            }
          } else {
            this.form.filePath = ""; // 没有文件路径时清空 filePath
          }
        } else {
          console.error("获取资料信息失败:", response.data.msg);
        }
      } catch (error) {
        console.error("请求出错:", error);
      }
    },

    // 取消操作，退出编辑模式
    handleCancel() {
      this.visible = false;
      this.isEditing = false;
      this.allDisabled = true;
    },

    // 进入编辑模式
    handleEdit() {
      this.allDisabled = false;
      this.isEditing = true;
    },

    // 提交编辑后的资料
    async handleSubmit() {
      try {
        this.visible = false;
        ElMessage({
          message: "提交成功",
          type: "success",
        });
      } catch (error) {
        ElMessage({
          message: error.message,
          type: "error",
        });
      }
    },
  },
};
</script>



<style scoped>
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
  width: 800px;
  background: #ffffff;
  padding: 3px;
  z-index: 100;
  border: 3px solid #fafafa;
}
.footer {
  display: flex;
  justify-content: flex-end;
  margin-top: -25px;
  margin-right: 10px;
  margin-bottom: 20px;
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

.BaseInfo {
  margin-bottom: 50px;
}
.el-check-tag {
  margin: 10px;
  font-weight: normal;
}
.el-check-tag.is-checked {
  background-color: #333333 !important;
  color: #ffffff;
  font-weight: normal;
}
.select {
  margin-top: 10px;
  margin-bottom: 20px;
}
.LabTestReport {
  /* margin-left: -60px; */
  margin-top: 20px;
}
</style>
