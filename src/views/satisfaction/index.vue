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
      <!-- 操作按钮 -->
      <el-form-item>
        <el-button
          type="primary"
          class="custom-button"
          @click="handleAdd"
          size="default"
          >发布满意度调查问卷</el-button
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
        <el-table-column prop="SequenceNumber" label="序号" width="200" />
        <el-table-column
          link
          type="primary"
          prop="surveyTitle"
          label="满意度调查标题"
          width="300"
        >
          <template #default="scope">
            <el-button link type="primary" @click="handleClick(scope.row)">
              {{ scope.row.surveyTitle }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="satisfaction" label="满意度" width="300">
          <template #default="scope">
            <el-tag
              :type="scope.row.satisfaction === null ? 'primary' : 'danger'"
            >
              <el-button
                link
                 :type="scope.row.satisfaction === null ? 'primary' : 'danger'"
                @click="
                  handleCheckScore(scope.row.surveyID, scope.row.surveyTitle)
                "
              >
                <!-- 当 satisfaction 为 null 时显示 "暂无满意度"，否则显示实际的满意度 -->
                {{
                  scope.row.satisfaction === null
                    ? "暂无满意度"
                    : (scope.row.satisfaction*100).toFixed(4) + "%"
                }}
              </el-button>
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column fixed="right" label="操作" min-width="300">
  <template #default="scope">
    <el-button
      link
      :type="scope.row.isOpen === true ? 'primary' : 'danger'"
      size="large"
      @click="toggleStatus(scope.row)"
    >
      {{ scope.row.isOpen === true ? '开放中' : '已关闭'}}
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
      <Checksatis ref="Checksatis" :form="queryParams" @updateSatisfaction="handleQuery"/>
      <Addsatis ref="Addsatis" @addsatis="handleQuery"/>
      <CheckSatisScore ref="CheckSatisScore" />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import Pagination from "@/components/pagination.vue";
import Checksatis from "./components/checksatis.vue";
import Addsatis from "./components/addsatis.vue";
import CheckSatisScore from "./components/checksatisscore.vue";
import {
  pageSelectSatisfactionRating,
  pageSelectSatisfactionSurvey,
  closeSatisfaction,
  openSatisfaction,
} from "@/api/satisfaction/satisfaction";

export default {
  components: {
    Pagination,
    Checksatis,
    Addsatis,
    CheckSatisScore,
  },

  data() {
    return {
      queryParams: {
        diseaseTypeName: "",
        pageNum: 1,
        pageSize: 15,
        surveyId: null,
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
    handleClick(survey) {
      this.$refs.Checksatis.showDrawer(survey);
    },

    // 分页查询满意度调查列表
    async handleQuery() {
      this.loading = true;
      try {
        const params = {
          pageNo: this.queryParams.pageNum || 1,
          pageNumber: this.queryParams.pageSize || 15,
        };

        const response = await pageSelectSatisfactionSurvey(params);

        if (response.data.code === 1) {
          this.allData = response.data.data.records.map((item, index) => ({
            SequenceNumber:
              (this.queryParams.pageNum - 1) * this.queryParams.pageSize +
              index +
              1,
            surveyID: item.surveyID,
            satisfaction: item.satisfaction,
            surveyTitle: item.surveyTitle,
            surveyContent: item.surveyContent,
            isOpen :item.isOpen,
          }));
        
          this.total = response.data.data.total;
        } else {
          this.$message.error(
            "获取满意度调查问卷数据失败，请重试！" + response.data.message
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        this.$message.error("获取满意度调查问卷数据失败，请重试！");
      } finally {
        this.loading = false;
      }
    },

    handleAdd() {
      this.$refs.Addsatis.showDrawer();
    },

async toggleStatus(row) {
  try {
    const confirmMessage = row.isOpen === true
      ? '您确定要关闭此问卷吗？'  // 当问卷开放时显示关闭确认
      : '您确定要开放此问卷吗？';  // 当问卷关闭时显示开放确认
    
    // 弹出确认框
    await this.$confirm(confirmMessage, "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    });

    // 根据状态调用不同的接口
    let response;
    if (row.isOpen === true) {
      // 如果问卷是开放状态，调用关闭接口
      response = await closeSatisfaction(row.surveyID);
    } else {
      // 如果问卷是关闭状态，调用开放接口
      response = await openSatisfaction(row.surveyID);
    }

    // 成功后刷新数据
    if (response.data.code === 1) {
      row.isOpen = row.isOpen === true ? '开放中' : '已关闭';
      this.$message.success("问卷状态切换成功！");
      this.handleQuery();
    } else {
      this.$message.error("切换状态失败：" + response.data.msg);
    }
  } catch (error) {
    
  }
},


    handleCheckScore(surveyID, title) {
      console.log(surveyID);
      this.$refs.CheckSatisScore.showDrawer(surveyID, title);
      
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
