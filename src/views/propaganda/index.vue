<template>
  <div class="container">
    <!-- 表单部分 -->
    <el-form
      :model="queryParams"
      ref="queryForm"
      size="default"
      :inline="true"
      v-show="showSearch"
    >
      <el-form-item label="" prop="diseaseTypeName" size="default">
        <el-select
          v-model="queryParams.diseaseTypeName"
          placeholder="请选择疾病类型"
          clearable
          size="default"
          style="width: 200px; margin-right: -15px"
          @clear="handleQuery"
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
          <el-option value="流行性出血热" label="流行性出血热"></el-option>
          <el-option value="其他" label="其他"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          class="custom-button"
          @click="handleQuery"
          plain
          size="default"
          style="margin-left: 5px"
          >搜索</el-button
        >
        <el-button
          type="primary"
          class="custom-button"
          @click="handleAdd"
          size="default"
          style="margin-left: 5px"
          >添加宣传材料</el-button
        >
      </el-form-item>
    </el-form>

    <!-- 表格部分 -->
    <div class="usertable">
      <el-table
        :header-cell-style="{
          height: '40px',
          background: '#f5f7fa',
          color: '#333333',
        }"
        v-loading="loading"
        :data="allData"
        style="width: 100%"
        :height="tableHeight"
        :show-overflow-tooltip="true"
        :default-sort="{ prop: 'LearningNumber', order: '' }"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="SequenceNumber" label="序号" width="80" />
        <el-table-column prop="MaterialType" label="宣传材料类型" width="120" />
        <el-table-column prop="Title" label="标题" width="220" />
        <el-table-column prop="FilePath" label="文件路径" width="120" />
        <el-table-column prop="Link" label="网页链接" width="200">
          <template #default="scope">
            <el-button link type="primary" @click="openLink(scope.row.Link)">
              {{ scope.row.Link }}
            </el-button>
          </template>
        </el-table-column>

        <el-table-column prop="PublishDate" label="发布日期" width="200" />
        <el-table-column
          prop="LearningNumber"
          label="学习总次数"
          width="140"
          sortable
        />
        <el-table-column fixed="right" label="操作" min-width="260">
          <template #default="scope">
            <el-button
              link
              type="primary"
              size="large"
              @click="handleClick(scope.row.materialId)"
              >查看 / 编辑
            </el-button>
            <el-button
              link
              :type="scope.row.isDeleted ? 'danger' : 'primary'"
              size="large"
              @click="toggleStatus(scope.row)"
            >
              {{ scope.row.isDeleted ? "已禁用" : "已启用" }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页组件 -->
      <pagination
        v-show="total > 0"
        :total="total"
        v-model:current-page="queryParams.pageNum"
        v-model:page-size="queryParams.pageSize"
        @pagination="handlePagination"
      />
      <Checkmaterials ref="Checkmaterials" :form="queryParams" />
      <Addmaterials ref="Addmaterials" @update-materails="handleQuery" />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import Pagination from "@/components/pagination.vue";
import Checkmaterials from "./components/checkmaterials.vue";
import Addmaterials from "./components/addmaterials.vue";
import {
  pageSelectDiseaseLearningMaterials,
  startOrStopMaterial,
} from "@/api/propaganda/propaganda.js";

export default {
  components: {
    Pagination,
    Checkmaterials,
    Addmaterials,
  },

  data() {
    return {
      queryParams: {
        diseaseTypeName: "",
        pageNum: 1,
        pageSize: 15,
      },
      allData: [],
      loading: false,
      total: 0,
      showSearch: true,
    };
  },

  computed: {
    tableHeight() {
      return window.innerHeight - 300;
    },
  },

  methods: {
    handleClick(materialId) {
      this.$refs.Checkmaterials.showDrawer(materialId);
    },

    // 获取宣传材料列表
    async handleQuery() {
      this.loading = true;
      try {
        const params = {
          diseaseTypeName: this.queryParams.diseaseTypeName || "",
          pageNo: this.queryParams.pageNum || 1,
          pageSize: this.queryParams.pageSize || 15,
        };

        const response = await pageSelectDiseaseLearningMaterials(params);

        if (response.data.code === 1) {
          this.allData = response.data.data.records.map((item, index) => ({
            SequenceNumber:
              (this.queryParams.pageNum - 1) * this.queryParams.pageSize +
              index +
              1,
            MaterialType: item.materialType || "未知类型",
            Title: item.title || "",
            FilePath: item.filePath || "",
            Link: item.link || "",
            PublishDate: item.publishDate
              ? `${item.publishDate[0]}-${String(item.publishDate[1]).padStart(
                  2,
                  "0"
                )}-${String(item.publishDate[2]).padStart(2, "0")} ${String(
                  item.publishDate[3]
                ).padStart(2, "0")}:${String(item.publishDate[4]).padStart(
                  2,
                  "0"
                )}:${String(item.publishDate[5]).padStart(2, "0")}`
              : "无发布日期",
            LearningNumber: item.studyCount || 0,
            isDeleted: item.isDeleted,
            materialId: item.materialId,
          }));
          this.total = response.data.data.total;
        } else {
          this.$message.error(
            "获取宣传材料数据失败，请重试！" + response.data.message
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        this.$message.error("获取宣传材料数据失败，请重试！");
      } finally {
        this.loading = false;
      }
    },

    handleAdd() {
      this.$refs.Addmaterials.showDrawer();
    },

    // 切换宣传材料状态
    toggleStatus(row) {
      this.$confirm("您确定要切换材料状态吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          try {
            const newStatus = !row.isDeleted;
            const response = await startOrStopMaterial(
              row.materialId,
              newStatus
            );

            if (response.data.code === 1) {
              row.isDeleted = newStatus;
              this.handleQuery();
              this.$message.success(
                `宣传材料已${newStatus ? "禁用" : "启用"}！`
              );
            } else {
              this.$message.error("切换状态失败：" + response.data.message);
            }
          } catch (error) {
            console.error("Error toggling status:", error);
            this.$message.error("切换状态失败，请重试！");
          }
        })
        .catch(() => {
          this.$message.info("已取消状态切换");
        });
    },

    handlePagination({ page, limit }) {
      this.queryParams.pageNum = page;
      this.queryParams.pageSize = limit;
      this.handleQuery();
    },

    openLink(link){
      window.open(link, '_blank');
    }
  },

  mounted() {
    this.handleQuery();
  },
};
</script>

<style scoped>
.custom-button {
  margin: 0 5px;
}

.usertable {
  margin-top: 20px;
}

.el-table th,
.el-table td {
  text-align: center;
}

.container {
  padding: 10px;
  background-color: #ffffff;
  border-radius: 5px;
}

.el-form-item {
  margin-bottom: 10px;
}
</style>
