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
      <el-form-item label="姓名" prop="namecheck" size="default">
        <el-input
          v-model="queryParams.namecheck"
          placeholder="请输入姓名"
          clearable
          @clear="handleQuery"
          size="default"
          @keyup.enter.native="handleQuery"
          style="width: 200px !important; margin-right: -15px"
        />
      </el-form-item>
      <el-form-item label="联系电话" prop="phoneNumbercheck" size="default">
        <el-input
          v-model="queryParams.phoneNumbercheck"
          placeholder="请输入联系电话"
          clearable
          @clear="handleQuery"
          size="default"
          @keyup.enter.native="handleQuery"
          style="width: 200px !important; margin-right: -15px"
        />
      </el-form-item>
      <el-form-item label="意见标题" prop="titlecheck" size="default">
        <el-input
          v-model="queryParams.titlecheck"
          placeholder="请输入意见标题"
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
        :default-sort="{ prop: 'feedbackId', order: '' }"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="serialNumber" label="序号" width="80" sortable />
        <el-table-column prop="name" label="姓名" width="100" />
        <el-table-column prop="phoneNumber" label="联系电话" width="160" />
        <el-table-column prop="feedbackTitle" label="意见标题" width="200" />
        <el-table-column prop="feedbackText" label="反馈意见" width="240" />
        <el-table-column prop="feedbackDate" label="提交日期" width="200" />
        <el-table-column fixed="right" label="操作" min-width="100">
          <template #default="scope">
            <el-button
              link
              type="primary"
              size="large"
              @click="handleClick(scope.row.feedbackId)"
            >
              查看
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination
        v-show="total > 0"
        :total="total"
        v-model:current-page="queryParams.pageNum"
        v-model:page-size="queryParams.pageSize"
        @pagination="handlePagination"
      />
    </div>
  </div>
  <Feedbackdata ref="Feedbackdata" />
</template>

<script>
import Pagination from "@/components/pagination.vue";
import Feedbackdata from "./components/feedbackdata.vue";
import {
  fetchFeedbackData,
  exportFeedbackData,
} from "@/api/feedback/feedback.js";

export default {
  components: {
    Pagination,
    Feedbackdata,
  },

  data() {
    return {
      queryParams: {
        namecheck: "",
        phoneNumbercheck: "",
        titlecheck: "",
        pageNum: 1,
        pageSize: 15,
      },
      allData: [],
      total: 0,
      showSearch: true,
      loading: false,
    };
  },

  computed: {
    tableHeight() {
      return window.innerHeight - 300;
    },
  },

  methods: {
    // 格式化反馈日期
    formatDate(feedbackDate) {
      // if (!feedbackDate || feedbackDate.length < 5) return "";
      const [year, month, day, hour, minute, second = 0] = feedbackDate;
      return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(
        2,
        "0"
      )} ${String(hour).padStart(2, "0")}:${String(minute).padStart(
        2,
        "0"
      )}:${String(second).padStart(2, "0")}`;
    },

    // 获取反馈信息列表api
    async handleQuery() {
      this.loading = true;
      try {
        const params = {
          feedbackTitle: this.queryParams.titlecheck || "",
          name: this.queryParams.namecheck || "",
          phoneNumber: this.queryParams.phoneNumbercheck || "",
          pageNo: this.queryParams.pageNum,
          pageSize: this.queryParams.pageSize,
        };
        const response = await fetchFeedbackData(params);

        if (response.data.code === 1) {
          // 格式化反馈日期
          this.allData = response.data.data.records.map((item, index) => ({
            ...item,
            serialNumber:
              (this.queryParams.pageNum - 1) * this.queryParams.pageSize +
              index +
              1,
            feedbackDate: this.formatDate(item.feedbackDate), // 格式化日期
          }));
          this.total = response.data.data.total;
        } else {
          this.$message.error(
            "获取用户数据失败，请重试！" + response.data.message
          );
        }
      } catch (error) {
        console.error(
          "Error fetching data:",
          error.response ? error.response.data : error.message
        );
        this.$message.error(
          "获取用户数据失败，请重试！" +
            (error.response ? error.response.data.message : error.message)
        );
      } finally {
        this.loading = false;
      }
    },

    // 导出表格信息
    async handleExport() {
      try {
        const response = await exportFeedbackData();
        if (response.status === 200) {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "反馈信息导出表.xlsx");
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

    // 查看反馈信息
    handleClick(feedbackId) {
      this.$refs.Feedbackdata.showDrawer(feedbackId);
    },

    handlePagination({ page, limit }) {
      this.queryParams.pageNum = page;
      this.queryParams.pageSize = limit;
      this.handleQuery();
    },
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
</style>
