<template>
  <el-menu
    default-active="2"
    class="aside-container"
    @open="handleOpen"
    @close="handleClose"
  >
    <p class="logo-lg">{{ getTitle() }}</p> <!-- 动态显示标题 -->
    <TreeMenu/>
  </el-menu>
</template>

<script setup>
import TreeMenu from './treemenu.vue';
import { useUserStore } from '@/store/userrole'; // 引入用户角色 store

const userStore = useUserStore(); // 使用用户 store

const handleClose = () => {};
const handleOpen = () => {};

// 根据角色返回不同的标题
const getTitle = () => {
  const name = userStore.name || ''; 

  if (userStore.role === '系统管理员') {
    return `系统管理员-${name}`;
  } else if (userStore.role === '专职医护人员') {
    return `专职医护人员-${name}`; 
  } else if (userStore.role === '疾控中心工作人员') {
    return `疾控中心工作人员-${name}`;
  }

  return `用户-${name}`; // 默认标题
};
</script>


<style lang="less" scoped>
.aside-container {
  height: 100%;
  width: auto;
  overflow-y: auto !important;
  overflow-x: hidden !important;
  margin-right: -15px;
  padding-right: 15px; 
}

/* 隐藏滚动条，但保留滚动功能 */
.aside-container::-webkit-scrollbar {
  display: none; /* 隐藏滚动条 */
}

.logo-lg {
  font-style: normal;
  font-size: 16px;
  text-align: center;
  height: 50px;
  line-height: 50px;
  color: #333333;
  font-weight: bold;
}
</style>
