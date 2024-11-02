<template>
  <div class="container">
    <div class="chart-container">
      <div class="chart-title">数据过滤和搜索</div>
      <div class="table">

        <!-- 手机号搜索框 -->
        <div style="display:flex">
          <el-form-item label="手机号" prop="check" class="search" size="large">
            <el-input
              v-model=" queryParams.check"
              placeholder="请输入手机号"
              clearable
              size="default"
              style="width: 160px !important; margin-right: -15px"
            />
          </el-form-item>
          <el-button style="margin-top:33px;margin-left:30px" @click="filterData">
            搜索
          </el-button>
        </div>

        <!-- 数据表格 -->
        <el-table 
          :data="data" 
          :header-cell-style="{height:'15px',background:'#FFFFFF',color: '#333333'}" 
          style="width: 100%; height: 100%;"
          :show-overflow-tooltip="true"
        >
        <el-table-column prop="userId" label="ID" width="60" />
          <el-table-column prop="name" label="姓名" width="80" />
          <el-table-column prop="isHealth" label="健康状况" width="80">
            <template #default="scope">
              <el-tag :type="scope.row.isHealth ? 'success' : 'danger'">
                {{ scope.row.isHealth ? '健康' : '不健康' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="diagnosisdiseaseTypeName" label="诊断结果" width="80">
            <template #default="scope">
              <el-tag :type="scope.row.diagnosisdiseaseTypeName === '健康' ? 'success' : 'danger'">
                {{ scope.row.diagnosisdiseaseTypeName }}
              </el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { getChickInInfoByText } from '@/api/report/screen.js';

export default {
  data() {
    return {
      queryParams: {
        infoNumber: 5,
      phoneNumber:null,
      check:null,
      },
      data: []
    };
  },
  methods: {
    async filterData() {
  this.loading = true;
  try {
    const params = {
      infoNumber: this.queryParams.infoNumber || 5,
      phoneNumber: this.queryParams.check,
    };

    const response = await getChickInInfoByText(params);
    
    // 假设返回的数据格式为 { code: 1, data: [...] }
    if (response.data.code === 1) {
      // 确保 data 是数组
      if (Array.isArray(response.data.data)) {
        this.data = response.data.data; 
      } else {
        this.$message.error("返回的数据格式不正确");
      }
    } else {
      this.$message.error("获取用户数据失败，请重试！" + response.data.message);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    this.$message.error("获取用户数据失败，请重试！");
  } finally {
    this.loading = false;
  }
}


  },

  mounted() {

  }
};
</script>



<style scoped>
.container {
  margin-top: 10px;
  width: 100%;
  height: auto;
}

.chart-container {
  width: 340px;
  height: 280px;
  background-color: #FAFAFA;
  border-radius: 5px;
  margin-left: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  position: relative;
  padding: 10px;
  overflow: hidden;
}

.chart-title {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 14px;
  font-weight: bold;
  color: #4A4A4A;
  background-color: #FAFAFA;
  padding: 2px 5px;
  border-radius: 3px;
  z-index: 10;
}

.search {
  margin-top: 30px;
  margin-left: 10px;
}

.table {
  height: 100%;
  
}

.el-table {
  margin-top: 0px;
}

</style>
