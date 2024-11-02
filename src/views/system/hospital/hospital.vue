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
      <el-form-item label="医院名称" prop="check" size="default">
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
          @click="handleImport"
          size="default"
          >导入</el-button
        >
        <el-button
          type="warning"
          class="custom-button"
          @click="handleDownload"
          size="default"
          >导入模板下载</el-button
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
        <el-table-column prop="hospitalName" label="医院名" width="300" />
        <el-table-column
          prop="hospitalPhoneNumber"
          label="联系电话"
          width="200"
        />
        <el-table-column prop="Address" label="地址" min-width="500" />
        <el-table-column fixed="right" label="操作" min-width="260">
          <template #default="scope">
            <el-button
              link
              type="primary"
              size="large"
              @click="handleClick(scope.row.HospitalID)"
            >
              修改
            </el-button>
            <el-button
              link
              type="danger"
              size="large"
              @click="handleDelete(scope.row.HospitalID)"
            >
              删除
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
    </div>

    <!-- 医院信息弹窗 -->
    <Hospitaldata ref="Hospitaldata" @update-success="handleQuery" />
    <!-- 批量导入 -->
    <BatchImport ref="BatchImport" @update-success="handleQuery" />
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import Pagination from "@/components/pagination.vue";
import Hospitaldata from "./components/hospitaldata.vue";
import BatchImport from "./components/batchImport.vue";
import {
  fetchHospitalData,
  exportHospitalData,
  getExcelHospitalTemplate,
  deleteHospitalInfo,
} from "@/api/system/hospital.js";
import { ElMessage } from "element-plus";

export default {
  components: {
    Pagination,
    Hospitaldata,
    BatchImport,
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
      return window.innerHeight - 300;
    },
  },

  methods: {
    async handleQuery() {
      this.loading = true;
      try {
        const params = {
          hospitalName: this.queryParams.check || "",
          pageNo: this.queryParams.pageNum || 1,
          pageSize: this.queryParams.pageSize || 15,
        };

        // console.log('请求参数:', params); // 调试请求参数
        const response = await fetchHospitalData(params);
        // console.log('响应:', response); // 调试响应内容

        if (response.data.code === 1) {
          this.allData = response.data.data.records.map((item, index) => ({
            serialNumber:
              (this.queryParams.pageNum - 1) * this.queryParams.pageSize +
              index +
              1,
            HospitalID: item.hospitalId,
            hospitalName: item.hospitalName,
            hospitalPhoneNumber: item.hospitalPhoneNumber,
            Address: item.address,
          }));

          this.total = response.data.data.total;
        } else {
          ElMessage.error("获取医院数据失败，请重试！" + response.data.message);
        }
      } catch (error) {
        console.error("Error fetching hospital data:", error);
        ElMessage.error("获取医院数据失败，请重试！");
      } finally {
        this.loading = false;
      }
    },

    // 批量导入
    handleImport() {
      this.$refs.BatchImport.showDialog();
    },

    // 下载导入模板
    async handleDownload() {
      try {
        const response = await getExcelHospitalTemplate();
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "医院基础信息导入模板.xlsx");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        ElMessage({
          message: "下载成功",
          type: "success",
        });
      } catch (error) {
        console.error("下载出错:", error);
        ElMessage({
          message: "下载出错，请重试",
          type: "error",
        });
      }
    },

    // 导出医院信息
    async handleExport() {
      try {
        const response = await exportHospitalData();
        if (response.status === 200) {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "医院信息导出表.xlsx");
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          ElMessage({
            message: "导出成功",
            type: "success",
          });
        } else {
          ElMessage({
            message: "导出失败，请重试",
            type: "error",
          });
        }
      } catch (error) {
        console.error("导出出错:", error);
        ElMessage({
          message: "导出出错，请重试",
          type: "error",
        });
      }
    },

    // 查看医院详情
    handleClick(HospitalID) {
      this.$refs.Hospitaldata.showDrawer(HospitalID);
    },

    // 删除医院
    async handleDelete(HospitalID) {
      this.$confirm("您确定要删除该医院吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          try {
            const response = await deleteHospitalInfo(HospitalID);
            if (response.data.code === 1) {
              this.handleQuery();
              ElMessage({
                message: "删除成功",
                type: "success",
              });
            } else {
              ElMessage.error("删除失败：" + response.data.message);
            }
          } catch (error) {
            ElMessage.error("删除失败，请重试！");
          }
        })
        .catch(() => {
          // 处理取消操作
          // this.$message.info("已取消状态切换");
        });
    },

    // 分页
    handlePagination({ page, limit }) {
      this.queryParams.pageNum = page;
      this.queryParams.pageSize = limit;
      this.handleQuery();
    },

    // 处理批量导入的数据
    async handleImportData(importedData) {},
  },

  mounted() {
    this.handleQuery();
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

.usertable {
  margin-top: 20px;
}

.el-table th,
.el-table td {
  text-align: center;
}

.el-form-item {
  margin-bottom: 10px;
}
</style>
