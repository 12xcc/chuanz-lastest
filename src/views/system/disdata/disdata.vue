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
      <el-form-item label="疾病类型名" prop="check" size="default">
        <el-input
          v-model="queryParams.check"
          placeholder="请输入文本"
          clearable
          @clear="handleQuery"
          size="default"
          @keyup.enter.native="handleQuery"
          style="width: 200px !important; margin-right: -15px"
        />
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
          @click="handleExport"
          size="default"
          >导出</el-button
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
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="serialNumber" label="序号" width="80" />
        <el-table-column prop="diseaseTypeName" label="疾病类型" width="300" />
        <el-table-column prop="hasSubtype" label="是否包含子类型" width="200">
          <template #default="scope">
            <el-tag
              size="default"
              :type="scope.row.hasSubtype === '是' ? 'success' : 'primary'"
            >
              {{ scope.row.hasSubtype }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="subtypeName" label="子类型" min-width="500" />
      </el-table>

      <!-- 分页组件 -->
      <pagination
        v-show="total > 0"
        :total="total"
        v-model:current-page="queryParams.pageNum"
        v-model:page-size="queryParams.pageSize"
        @pagination="handlePagination"
      />
    </div>
  </div>
</template>

<script>
import * as XLSX from "xlsx";
import { ref, computed, onMounted } from "vue";
import Pagination from "@/components/pagination.vue";
import {
  fetchDiseaseData,
  exportDiseaseBasicData,
} from "@/api/system/disdata.js";

export default {
  components: {
    Pagination,
  },

  data() {
    return {
      queryParams: {
        check: "",
        pageNum: 1,
        pageSize: 15,
      },
      allData: [],
      showSearch: true,
      loading: false,
      total: 0,
    };
  },

  computed: {
    tableHeight() {
      return window.innerHeight - 300; // 计算表格高度
    },
  },

  methods: {
    async handleQuery() {
      this.loading = true;
      try {
        const params = {
          pageNo: this.queryParams.pageNum,
          pageSize: this.queryParams.pageSize,
          text: this.queryParams.check,
        };

        const response = await fetchDiseaseData(params);
        // console.log("API 响应:", response);

        if (response.data.code === 1) {
          const records = response.data.data.records || []; // 使用空数组，如果为 null
          this.allData = records.map((item, index) => ({
            serialNumber:
              (this.queryParams.pageNum - 1) * this.queryParams.pageSize +
              index +
              1,
            diseaseTypeName: item.diseaseTypeName,
            hasSubtype: item.hasSubtype ? "是" : "否",
            subtypeName: item.subDiseaseList
              ? item.subDiseaseList.map((sub) => sub.subtypeName).join(", ")
              : "", // 检查 subDiseaseList 是否为 null
          }));
          this.total = response.data.data.total || 0; // 如果 total 缺失，默认设置为 0
        } else {
          this.$message.error("获取疾病数据失败，请重试！" + response.data.msg);
        }
      } catch (error) {
        console.error("获取疾病数据出错:", error);
        this.$message.error("获取疾病数据失败，请重试！");
      } finally {
        this.loading = false;
      }
    },

    // 导出表格信息
    async handleExport() {
      try {
        const response = await exportDiseaseBasicData(); 
        if (response.status === 200) {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "疾病基础信息导出表.xlsx");
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          this.$message({
            message: "导出成功",
            type: "success",
          });
        } else {
          this.$message({
            message: "导出失败，请重试",
            type: "error",
          });
        }
      } catch (error) {
        console.error("导出出错:", error);
        this.$message({
          message: "导出出错，请重试",
          type: "error",
        });
      }
    },


    handlePagination({ page, limit }) {
      this.queryParams.pageNum = page;
      this.queryParams.pageSize = limit;
      this.handleQuery(); // 更新查询数据
    },
  },

  mounted() {
    this.handleQuery(); // 初始查询
  },
};
</script>

<style scoped>
.container {
  padding: 10px;
  background-color: #ffffff;
  border-radius: 5px;
}

.custom-button {
  margin-right: 10px;
}
</style>
