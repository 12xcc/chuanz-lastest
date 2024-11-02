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
      <!-- 用户类型选择 -->
      <el-form-item label="" prop="userType" size="default">
        <el-select
          v-model="queryParams.userType"
          placeholder="请选择用户类型"
          clearable
          @clear="handleQuery"
          size="default"
          style="width: 200px; margin-right: -15px"
          @change="handleuserTypeChange"
        >
          <el-option label="系统管理员" value="系统管理员"></el-option>
          <el-option label="铁路职工" value="铁路职工"></el-option>
          <el-option
            label="疾控中心工作人员"
            value="疾控中心工作人员"
          ></el-option>
          <el-option label="专职医护" value="专职医护"></el-option>
        </el-select>
      </el-form-item>

      <!-- 字段选择 -->
      <el-form-item label="" prop="choice" size="default">
        <el-select
          v-model="queryParams.choice"
          placeholder="请选择字段"
          clearable
          size="default"
          style="width: 200px; margin-right: -15px"
        >
          <el-option label="姓名" :value="'name'"></el-option>
          <el-option label="电话" :value="'phoneNumber'"></el-option>
          <el-option label="部门/工种" :value="'department'"></el-option>
          <el-option label="特殊职业" :value="'specificOccupation'"></el-option>
        </el-select>
      </el-form-item>

      <!-- 搜索框 -->
      <el-form-item label="" prop="check" size="default">
        <el-input
          v-model="queryParams.check"
          placeholder="请输入搜索内容"
          clearable
          @clear="handleQuery"
          size="default"
          @keyup.enter.native="handleQuery"
          style="width: 200px !important; margin-right: -15px"
        />
      </el-form-item>

      <!-- 操作按钮 -->
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
          >添加用户</el-button
        >
        <el-button
          type="primary"
          class="custom-button"
          @click="handleImport"
          size="default"
          >批量导入</el-button
        >
        <el-button
          type="warning"
          class="custom-button"
          @click="handleDownload"
          size="default"
          >下载导入模板</el-button
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
        <el-table-column prop="userType" label="用户类型" width="150" />
        <el-table-column prop="name" label="姓名" width="150" />
        <el-table-column prop="phoneNumber" label="电话" width="120" />
        <el-table-column prop="gender" label="性别" width="100" />
        <el-table-column prop="age" label="年龄" width="100" />
        <el-table-column prop="ethnicity" label="民族" width="120" />
        <el-table-column prop="EducationLevel" label="学历" width="120" />
        <el-table-column
          prop="WorkOnPlateauStartDate"
          label="高原工作时间"
          width="120"
        />
        <el-table-column prop="department" label="部门/工种" width="120" />
        <el-table-column
          prop="SpecificOccupation"
          label="特殊职业"
          min-width="120"
        />
        <el-table-column fixed="right" label="操作" min-width="260">
          <template #default="scope">
            <el-button
              link
              type="primary"
              size="large"
              @click="handleClick(scope.row.userId)"
            >
              查看
            </el-button>
            <el-button
              link
              type="primary"
              size="large"
              @click="handleClickEdit(scope.row.userId)"
              >编辑</el-button
            >
            <el-button
              link
              :type="scope.row.isActive ? 'primary' : 'danger'"
              size="large"
              @click="toggleStatus(scope.row)"
            >
              {{ scope.row.isActive ? "可用" : "禁用" }}
            </el-button>
            <template v-if="scope.row.isActive">
              <el-button
                link
                type="primary"
                size="large"
                @click="initializePassword(scope.row)"
              >
                初始化密码
              </el-button>
            </template>
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
  <AddUserDialog ref="AddUserDialog" @add-user="handleAdd" />
  <BatchImportDialog ref="batchImportDialog" @import="handleImportData" @update-success="handleQuery"/>
  <Checkuserdata ref="Checkuserdata" />
  <Editdata ref="Editdata" @update-success="handleQuery" />
</template>
<script>
import * as XLSX from "xlsx";
import { ref, computed, onMounted } from "vue";
import Pagination from "@/components/pagination.vue";
import AddUserDialog from "./components/adduserdialog.vue";
import BatchImportDialog from "./components/batchimportdialog.vue";
import Checkuserdata from "./components/checkuserdata.vue";
import Editdata from "./components/editdata.vue";
import {
  fetchUserData,
  toggleUserStatus,
  initializeUserPassword,
  exportUserData,
  queryAllUserToExcel,
} from "@/api/user/alluser.js"; // 导入封装的 API

export default {
  components: {
    Pagination,
    AddUserDialog,
    BatchImportDialog,
    Checkuserdata,
    Editdata,
  },

  data() {
    return {
      queryParams: {
        userType: "",
        choice: "", // 选择的字段
        check: "", // 搜索关键词
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
    // 获取用户列表
    async fetchUserData() {
      // console.log("Fetching user data...");
      this.loading = true;
      try {
        const params = {
          userType: this.queryParams.userType || "",
          pageNo: this.queryParams.pageNum || 1,
          pageSize: this.queryParams.pageSize || 15,
        };

        if (this.queryParams.choice && this.queryParams.check) {
          params[this.queryParams.choice] = this.queryParams.check;
        }

        // 封装的api
        const response = await fetchUserData(params);

        if (response.data.code === 1) {
          this.allData = response.data.data.records.map((item, index) => ({
            serialNumber:
              (this.queryParams.pageNum - 1) * this.queryParams.pageSize +
              index +
              1,
            userType: item.userType,
            name: item.name,
            phoneNumber: item.phoneNumber,
            gender: item.gender,
            age: item.age,
            ethnicity: item.ethnicity,
            EducationLevel: item.educationLevel,

            // 日期格式转换
            WorkOnPlateauStartDate: item.workOnPlateauStartDate
              ? `${item.workOnPlateauStartDate[0]}-${String(
                  item.workOnPlateauStartDate[1]
                ).padStart(2, "0")}-${String(
                  item.workOnPlateauStartDate[2]
                ).padStart(2, "0")}`
              : "",

            department: item.department,
            SpecificOccupation: item.specificOccupation,
            isActive: item.isActived,
            userId: item.userId,
          }));
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

    // 添加用户
    handleAdd() {
      this.$refs.AddUserDialog.showDrawer();
    },

    // 批量导入
    handleImport() {
      this.$refs.batchImportDialog.showDialog();
    },

    // 下载导入模板
    // handleDownload() {
    //   const link = document.createElement("a");
    //   link.href = "/template.xlsx"; // 指向 public 目录下的文件
    //   link.download = "用户信息导入模板.xlsx"; // 下载时的文件名
    //   document.body.appendChild(link); // 将链接添加到文档中
    //   link.click(); // 触发点击事件下载文件
    //   document.body.removeChild(link); // 下载后移除链接
    //   this.$message({
    //     message: "下载成功",
    //     type: "success",
    //   });
    // },
    async handleDownload() {
      try {
        const response = await queryAllUserToExcel();
        if (response.status === 200) {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "用户导入模板.xlsx");
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          this.$message({
            message: "下载成功",
            type: "success",
          });
        } else {
          this.$message({
            message: "下载失败，请重试",
            type: "error",
          });
        }
      } catch (error) {
        console.error("下载出错:", error);
        this.$message({
          message: "下载出错，请重试",
          type: "error",
        });
      }
    },
    // 导出用户信息
    async handleExport() {
      try {
        const response = await exportUserData();
        if (response.status === 200) {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "用户信息导出表.xlsx");
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

    // 查看用户
    handleClick(userId) {
      this.$refs.Checkuserdata.showDrawer(userId);
    },

    // 编辑用户
    handleClickEdit(userId) {
      this.$refs.Editdata.showDrawer(userId);
    },

    // 切换用户状态
    toggleStatus(row) {
      this.$confirm("您确定要切换用户状态吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          try {
            const response = await toggleUserStatus(row.userId);
            if (response.data.code === 1) {
              row.isActive = !row.isActive;
              this.fetchUserData();
            } else {
              this.$message.error("切换状态失败：" + response.data.message);
            }
          } catch (error) {
            console.error("Error toggling status:", error);
            this.$message.error("切换状态失败，请重试！");
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
      this.fetchUserData();
    },

    // 初始化密码
    async initializePassword(row) {
      try {
        const response = await initializeUserPassword(row.userId);
        if (response.data.code === 1) {
          this.$message.success(`初始化密码成功，为身份证后六位`);
        } else {
          this.$message.error("初始化密码失败：" + response.data.message);
        }
      } catch (error) {
        console.error("Error initializing password:", error);
        this.$message.error("初始化密码失败，请重试！");
      }
    },

    // 处理批量导入的数据
    handleImportData(importedData) {
      // this.allData.push(importedData);
      // this.fetchUserData();
    },

    // 用户类型变化时触发查询
    handleuserTypeChange() {
      this.queryParams.pageNum = 1; // 重置为第一页
      this.fetchUserData();
    },

    // 搜索查询
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.fetchUserData();
    },
  },

  mounted() {
    // console.log("Component mounted");
    this.fetchUserData();
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
