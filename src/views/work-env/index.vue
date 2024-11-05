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
      <el-form-item label="工作地点名" prop="workStationName" size="default">
        <el-input
          v-model="queryParams.workStationName"
          placeholder="请输入文本"
          clearable
          @clear="handleQuery"
          size="default"
          @keyup.enter.native="handleQuery"
          style="width: 200px !important; margin-right: -15px"
        />
      </el-form-item>
      <!-- 格式：YYYY-MM-DD -->
      <!-- <el-form-item prop="date">
        <el-date-picker
          v-model="queryParams.date"
          type="daterange"
          range-separator="到"
          start-placeholder="请选择"
          end-placeholder="提交日期范围"
          style="width: 300px"
        />
      </el-form-item> -->

      <!-- 格式：YYYY-MM -->
      <el-form-item prop="date">
        <el-date-picker
          v-model="queryParams.date"
          type="monthrange"
          range-separator="到"
          start-placeholder="提交时间月份"
          end-placeholder=""
          value-format="YYYY-MM"
          style="width: 300px"
          @clear="handleQuery"
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
        <el-table-column
          prop="serialNumber"
          label="序号"
          width="80"
          height="48"
        />
        <el-table-column prop="name" label="姓名" width="100" />
        <el-table-column
          prop="workStationName"
          label="工务段名称"
          width="200"
        />
        <el-table-column
          prop="WorkStationAltitude"
          label="海拔高度(米)"
          width="200"
        />
        <el-table-column
          prop="AvgMonthlyPressure"
          label="当月平均气压(kpa)"
          width="200"
        />
        <el-table-column
          prop="MaxTemperature"
          label="当月最高气温(℃)"
          width="200"
        />
        <el-table-column
          prop="MinTemperature"
          label="当月最低气温(℃)"
          width="200"
        />
        <el-table-column prop="SubmissionTime" label="提交时间" width="120" />
        <el-table-column fixed="right" label="操作" min-width="140">
          <template #default="scope">
            <el-button
              link
              type="primary"
              size="large"
              @click="handleClick(scope.row.environmentId)"
            >
              查看
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
  </div>
  <Envdata ref="Envdata" />
</template>

<script>
import * as XLSX from "xlsx";
import { ref, computed, onMounted } from "vue";
import Pagination from "@/components/pagination.vue";
import Envdata from "./components/envdata.vue";
import { fetchWorkenvData,exportWorkenvData } from "@/api/workenv/workenv.js";

export default {
  components: {
    Pagination,
    Envdata,
  },

  data() {
    return {
      queryParams: {
        workStationName: "",
        date: [],
        pageNum: 1,
        pageSize: 15,
      },
      allData: [],
      tableData: [],
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
    // 格式化提交时间
    formatDate(submissionTime) {
      // 暂时不加时间数组长度判断
      const [year, month, day, hour, minute, second = 0] = submissionTime;
      return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(
        2,
        "0"
      )} ${String(hour).padStart(2, "0")}:${String(minute).padStart(
        2,
        "0"
      )}:${String(second).padStart(2, "0")}`;
    },

    async handleQuery() {
  this.loading = true;

  try {
    // 检查 this.queryParams.date 是否存在且是数组
    let beginYearMonth = "";
    let endYearMonth = "";

    if (Array.isArray(this.queryParams.date) && this.queryParams.date.length === 2) {
      [beginYearMonth, endYearMonth] = this.queryParams.date;
    }

    // 设置请求参数
    const params = {
      beginYearMonth: beginYearMonth || "",
      endYearMonth: endYearMonth || "",
      pageNo: this.queryParams.pageNum || 1,
      pageSize: this.queryParams.pageSize || 15,
      workStationName: this.queryParams.workStationName || "",
    };
    
    const response = await fetchWorkenvData(params);

    if (response.data.code === 1) {
      this.allData = response.data.data.records.map((item, index) => ({
        serialNumber:
          (this.queryParams.pageNum - 1) * this.queryParams.pageSize +
          index +
          1,
        name: item.name,
        workStationName: item.workStationName,
        WorkStationAltitude: item.workStationAltitude,
        AvgMonthlyPressure: item.avgMonthlyPressure,
        MaxTemperature: item.maxTemperature,
        MinTemperature: item.minTemperature,
        SubmissionTime: this.formatDate(item.submissionTime),
        environmentId: item.environmentId,
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
        const response = await exportWorkenvData(); 
        if (response.status === 200) {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "工作环境信息导出表.xlsx");
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
    handleClick(environmentId) {
      this.$refs.Envdata.showDrawer(environmentId);
      // console.log("触发", row);
      // this.$router.push({ name: "userdata", params: { id: serialNumber } });
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
