<template>
  <div class="container">
    <div class="chart-container">
      <div class="chart-title">重点人员跟踪</div>
      <div class="table">
        <el-table 
          :data="displayedData" 
          :header-cell-style="{height:'15px',background:'#FFFFFF',color: '#333333'}" 
          style="width: 100%; height: 100%;"
          :show-overflow-tooltip="true" 
        >
          <el-table-column label="" width="50">
            <template #default="scope">
              <img :src="getAvatarUrl(scope.row.gender)" alt="头像" class="avatar" />
            </template>
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="60" />
          <el-table-column prop="department" label="部门/工种" width="100" />
          <el-table-column prop="statu" fixed="right" label="状态" width="70">
            <template #default="scope">
              <el-tag :type="scope.row.statu === '健康' ? 'success' : 'danger'">
                {{ scope.row.statu }}
              </el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import maleAvatar from '@/assets/avatar/male.png';
import femaleAvatar from '@/assets/avatar/female.png';
import { getImportantUserInfo } from '@/api/report/screen.js';

const getAvatarUrl = (gender) => {
  return gender === '男' ? maleAvatar : femaleAvatar; 
};

const data = ref([]);
const displayedData = ref([]);


const fetchImportantUserData = async () => {
  try {
    const response = await getImportantUserInfo();
    if (response.data.code === 1) {
      data.value = response.data.data.map(item => ({
        id: item.userId,
        name: item.name,
        department: item.department,
        statu: item.isHealth ? false : item.diagnosisDiseaseTypeName || '健康',
        gender: item.gender
      }));
      displayedData.value = [...data.value];
    } else {
      console.error("获取重点人员数据失败:", response.data.msg);
    }
  } catch (error) {
    console.error("请求出错:", error);
  }
};

// 轮播数据
const rotateData = () => {
  const firstItem = displayedData.value.shift(); // 删除并获取第一个元素
  displayedData.value.push(firstItem); // 将其添加到数组末尾
};

onMounted(() => {
  fetchImportantUserData();
  setInterval(rotateData, 3000); // 每3秒轮播一次
});
</script>


<style scoped>
.container {
  margin-top: 10px;
  width: 100%;
  height: auto;
}

.chart-container {
  width: 320px;
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

.table {
  height: 100%;
}

.el-table {
  margin-top: 25px;
}

.avatar {
  width: 24px; /* 调整头像大小 */
  height: 24px;
  border-radius: 50%; /* 圆形头像 */
  object-fit: cover; /* 保持图片比例 */
}
</style>
