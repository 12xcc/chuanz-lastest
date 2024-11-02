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
      <el-form-item label="是否健康" prop="isHealth" size="default">
        <el-select
          v-model="queryParams.isHealth"
          placeholder="请选择"
          clearable
          size="default"
          style="width: 140px; margin-right: -15px"
          @change="handleQuery"
        >
          <el-option value="true" label="是"></el-option>
          <el-option value="false" label="否"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="" prop="choice">
        <el-select
          v-model="queryParams.choice"
          placeholder="请选择字段"
          clearable
          @clear="handleQuery"
          size="default"
          style="width: 180px; margin-right: -15px"
        >
          <el-option label="姓名" :value="'name'"></el-option>
          <el-option label="电话" :value="'phoneNumber'"></el-option>
          <el-option label="部门/工种" :value="'department'"></el-option>
          <el-option label="特殊职业" :value="'specificOccupation'"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="" prop="check">
        <el-input
          v-model="queryParams.check"
          placeholder="请输入文本"
          clearable
          @clear="handleQuery"
          size="default"
          @keyup.enter.native="handleQuery"
          style="width: 180px !important; margin-right: -15px"
        />
      </el-form-item>

      <el-form-item prop="date">
        <el-date-picker
          v-model="queryParams.date"
          type="daterange"
          value-format="YYYY-MM-DD"
          range-separator="到"
          start-placeholder="请选择"
          end-placeholder="打卡日期范围"
          style="width: 280px"
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
        <el-button
          type="warning"
          class="custom-button"
          @click="handleExportAI"
          size="default"
          >含AI数据导出</el-button
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
        <el-table-column prop="userType" label="用户类型" width="120" />
        <el-table-column prop="name" label="姓名" width="100" />
        <el-table-column prop="phoneNumber" label="电话" width="120" />
        <el-table-column prop="gender" label="性别" width="100" />
        <el-table-column prop="age" label="年龄" width="100" />
        <el-table-column prop="department" label="部门/工种" width="120" />
        <el-table-column prop="isHealth" label="是否健康" width="120">
          <template #default="scope">
            <el-tag :type="scope.row.isHealth === false ? 'danger' : 'success'">
              {{ scope.row.isHealth === false ? "否" : "是" }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="locationName" label="位置信息" min-width="120" />
        <el-table-column prop="checkInDate" label="打卡日期" min-width="120" />
        <el-table-column
          prop="diseaseTypeName"
          label="最有可能疾病"
          min-width="220"
        >
          <template #default="scope">
            <el-tag v-if="scope.row.isHealth === false" type="danger">
              {{ scope.row.diseaseTypeName }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" min-width="260">
          <template #default="scope">
            <el-button
              v-if="scope.row.isHealth === false"
              class="checksymptom"
              link
              type="primary"
              size="large"
              @click="handleClick(scope.row)"
            >
              查看症状
            </el-button>
            <el-button
              link
              type="primary"
              size="large"
              @click="handleClickPosition(scope.row.statusId)"
              >查看位置</el-button
            >
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

    <Checkindata ref="Checkindata" />
    <Checkinposition ref="Checkinposition" />
  </div>
</template>

<script>
import Pagination from "@/components/pagination.vue";
import Checkindata from "./components/checkindata/checkindata.vue";
import Checkinposition from "./components//checkinposition/checkinposition.vue";
import {
  pageSelectCheckin,
  getEmployeeCheckInExcelAI,
  getEmployeeCheckInExcel,
} from "@/api/report/checkin.js";
export default {
  components: {
    Pagination,
    Checkindata,
    Checkinposition,
  },
  data() {
    return {
      queryParams: {
        isHealth: null,
        check: "",
        date: [],
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
    // 检查 this.queryParams.date 是否存在且是数组
    let checkInDateBegin = "";
    let checkInDateEnd = "";

    if (
      Array.isArray(this.queryParams.date) &&
      this.queryParams.date.length === 2
    ) {
      [checkInDateBegin, checkInDateEnd] = this.queryParams.date;
    }

    const params = {
      checkInDateBegin: checkInDateBegin || "",
      checkInDateEnd: checkInDateEnd || "",
      pageNo: this.queryParams.pageNum || 1,
      pageSize: this.queryParams.pageSize || 15,
      isHealth: this.queryParams.isHealth || "",
    };

    if (this.queryParams.choice && this.queryParams.check) {
      params[this.queryParams.choice] = this.queryParams.check;
    }

    // 封装的api
    const response = await pageSelectCheckin(params);

    if (response.data.code === 1) {
      this.allData = response.data.data.records.map((item, index) => {
        // 计算序号
        const serialNumber =
          (this.queryParams.pageNum - 1) * this.queryParams.pageSize +
          index +
          1;

        // 格式化 checkInDate 为 YYYY-MM-DD 格式
        const checkInDate = item.checkInDate
          ? `${item.checkInDate[0]}-${String(item.checkInDate[1]).padStart(
              2,
              "0"
            )}-${String(item.checkInDate[2]).padStart(2, "0")}`
          : "";

        return {
          // 先解构，再映射，不然有的字段就算经过处理，也会被原始返回的数据覆盖
          ...item, // 其他字段直接解构，不做映射
          serialNumber,
          checkInDate,
          isHealth: item.isHealth,
          
        };
      });
      this.total = response.data.data.total;
    } else {
      this.$message.error(
        "获取用户数据失败，请重试！" + response.data.message
      );
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    this.$message.error("获取用户数据失败，请重试！");
  } finally {
    this.loading = false;
  }
},


    // 职工打卡信息导出表
    async handleExport() {
      try {
        this.$message({
          message: "正在导出，请稍候...",
          type: "warning",
        });
        const response = await getEmployeeCheckInExcel();
        if (response.status === 200) {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "职工打卡信息导出表.xlsx");
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

    // 职工打卡信息导出表(AI)
    async handleExportAI() {
      try {
        this.$message({
          message: "正在导出，请稍候...",
          type: "warning",
        });
        const response = await getEmployeeCheckInExcelAI();
        if (response.status === 200) {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "职工打卡信息导出表(AI).xlsx");
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
    handleClick(row) {
      this.$refs.Checkindata.showDrawer(row);
      // console.log("触发", row);
    },
    handleClickPosition(statusId) {
      this.$refs.Checkinposition.showDrawer(statusId);
    },
    handlePagination({ page, limit }) {
      this.queryParams.pageNum = page;
      this.queryParams.pageSize = limit;
      this.handleQuery();
    },
  },
  mounted() {
    this.handleQuery(); // 初始数据
  },
};
</script>

<style  scoped>
.container {
  padding: 10px;
  background-color: #ffffff;
  border-radius: 5px;
}

.custom-button {
  margin-right: 10px;
}
</style>
