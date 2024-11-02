<template>
  <div class="container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      size="default"
      :inline="true"
      v-show="showSearch"
    >
      <el-form-item label="" prop="choice">
        <el-select
          v-model="queryParams.choice"
          placeholder="请选择字段"
          clearable
          size="default"
          style="width: 200px; margin-right: -15px"
        >
          <el-option :key="1" label="姓名" :value="1"></el-option>
          <el-option :key="2" label="电话" :value="2"></el-option>
          <el-option :key="3" label="部门/工种" :value="3"></el-option>
          <el-option :key="4" label="特殊职业" :value="4"></el-option>
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
          style="width: 200px !important; margin-right: -15px"
        />
      </el-form-item>

      <el-form-item prop="date">
        <el-date-picker
          v-model="queryParams.date"
          type="daterange"
          range-separator="到"
          start-placeholder="请选择"
          end-placeholder="检测日期范围"
          value-format="YYYY-MM-DD"
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
        <el-button
          type="warning"
          class="custom-button"
          @click="handleExportAI"
          size="default"
          >含检测报告导出</el-button
        >
        <el-button
          type="primary"
          class="custom-button"
          @click="handleSubmitCheck"
          size="default"
          >提交检测报告</el-button
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
        <el-table-column prop="userType" label="用户类型" width="120" />
        <el-table-column prop="name" label="姓名" width="100">
          <template #default="scope">
            <el-button
              v-if="isNurse()"
              type="text"
              @click="handleCheckuser(scope.row.userId)"
            >
              {{ scope.row.name }}
            </el-button>
            <span v-else>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="phoneNumber" label="电话" width="120" />
        <el-table-column prop="gender" label="性别" width="100" />
        <el-table-column prop="age" label="年龄" width="100" />
        <el-table-column prop="department" label="部门/工种" width="120" />
        <el-table-column
          prop="isVirusAntigenTestDone"
          label="病毒抗原检测"
          width="120"
        >
          <template #default="scope">
            <el-tag v-if="scope.row.isVirusAntigenTestDone" type="success">
              √
            </el-tag>
            <span v-else></span>
          </template>
        </el-table-column>

        <el-table-column
          prop="isVirusNucleicAcidTestDone"
          label="病毒核酸检测"
          width="120"
        >
          <template #default="scope">
            <el-tag v-if="scope.row.isVirusNucleicAcidTestDone" type="success">
              √
            </el-tag>
            <span v-else></span>
          </template>
        </el-table-column>

        <el-table-column
          prop="isVirusCultureIsolationDone"
          label="病毒培养分离"
          width="120"
        >
          <template #default="scope">
            <el-tag v-if="scope.row.isVirusCultureIsolationDone" type="success">
              √
            </el-tag>
            <span v-else></span>
          </template>
        </el-table-column>

        <el-table-column
          prop="isSerologicalTestDone"
          label="血清学检测"
          width="120"
        >
          <template #default="scope">
            <el-tag v-if="scope.row.isSerologicalTestDone" type="success">
              √
            </el-tag>
            <span v-else></span>
          </template>
        </el-table-column>

        <el-table-column prop="uploadDate" label="上传日期" width="120">
          <template #default="scope">
            {{ scope.row.uploadDate }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" min-width="260">
          <template #default="scope">
            <el-button
              link
              type="primary"
              size="large"
              @click="handleCheck(scope.row)"
              >查看 / 编辑</el-button
            >
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
    <Checkuser
      ref="Checkuser"
      :users="allData"
      :visible="checkUserVisible"
    />
    <Checkcheckdata ref="Checkcheckdata" @updatecheck="handleQuery"/>
    <Checkuserdata ref="Checkuserdata" />
  </div>
</template>

<script>
import { useUserStore } from "@/store/userrole.js"; // 引入用户角色存储
import Checkuser from "./components/checkuser.vue";
import Checkcheckdata from "./components/checkcheckdata/checkchekcdata.vue";
import Checkuserdata from "../user/alluser/components/checkuserdata.vue";
import {
  pageSelectLabTest,
  getDetectionInformationExportFormExcel,
  getUserByBaseInfo,
  saveLabTestReport,
  selectLabTest,
} from "@/api/check/check";
export default {
  components: {
    Checkuser,
    Checkcheckdata,
    Checkuserdata,
  },
  data() {
    return {
      checkUserVisible: false,
      queryParams: {
        isHealth: "",
        check: "",
        date: [],
        pageNum: 1,
        pageSize: 15,
        date: "",
      },
      allData: [],
      showSearch: true,
      loading: false,
      total: 0,
    };
  },
  setup() {
    const userStore = useUserStore(); // 使用用户角色存储
    return { userStore };
  },
  computed: {
    tableHeight() {
      return window.innerHeight - 300;
      // return `${this.filteredData.length > 0 ? this.filteredData.length * 48 : 500}px`; // 动态计算表格高度
    },
  },

  methods: {
    isNurse() {
      return this.userStore.isNurse(); // 用户角色存储的 isNurse 方法
    },
    async handleQuery() {
      this.loading = true;
      try {
        let beginDate = "";
        let endDate = "";

        if (
          Array.isArray(this.queryParams.date) &&
          this.queryParams.date.length === 2
        ) {
          [beginDate, endDate] = this.queryParams.date;
        }

        const params = {
          beginDate: beginDate || "",
          endDate: endDate || "",
          name: this.queryParams.choice === 1 ? this.queryParams.check : "",
          phoneNumber:
            this.queryParams.choice === 2 ? this.queryParams.check : "",
          department:
            this.queryParams.choice === 3 ? this.queryParams.check : "",
          pageNo: this.queryParams.pageNum || 1,
          pageSize: this.queryParams.pageSize || 15,
        };

        const response = await pageSelectLabTest(params);

        if (response.data.code === 1) {
          this.allData = response.data.data.records.map((item, index) => {
            const serialNumber =
              (this.queryParams.pageNum - 1) * this.queryParams.pageSize +
              index +
              1;

            // 日期格式化，将数组转为 'YYYY-MM-DD'
            const formatDate = (dateArray) => {
              if (!Array.isArray(dateArray) || dateArray.length !== 3) {
                return "";
              }
              const [year, month, day] = dateArray;
              return `${year}-${String(month).padStart(2, "0")}-${String(
                day
              ).padStart(2, "0")}`;
            };

            // 深拷贝并格式化数据
            const formattedItem = {
              ...item,
              serialNumber, // 自定义字段
              uploadDate: formatDate(item.uploadDate),
            };

            return formattedItem; // 返回格式化后的数据
          });

          this.total = response.data.data.total;
        } else {
          ElMessage.error("获取诊断信息失败，请重试！" + response.data.message);
        }
      } catch (error) {
        console.error("Error fetching diagnosis data:", error);
        ElMessage.error("获取诊断信息失败，请重试！");
      } finally {
        this.loading = false;
      }
    },

    // 导出表格信息
    async handleExport() {
      try {
        this.$message({
          message: "正在导出，请稍候...",
          type: "warning",
        });
        const response = await getDetectionInformationExportFormExcel();
        if (response.status === 200) {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "检查信息导出表.xlsx");
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

    // 含AI数据导出
    async handleExportAI() {
      try {
        this.$message({
          message: "正在导出，请稍候...",
          type: "warning",
        });
        const response = await getDetectionInformationExportFormExcel();
        if (response.status === 200) {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "检查信息导出表(AI).xlsx");
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
    handleCheck(user) {
      this.$refs.Checkcheckdata.showDrawer(user);
    },
    handleCheckuser(userId) {
      this.$refs.Checkuserdata.showDrawer(userId);
    },
    handleSubmitCheck() {
      this.$refs.Checkuser.showDialog();
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
