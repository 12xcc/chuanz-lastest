<template>
  <div class="global-header">
    <el-container>
      <el-header class="header">
        <img src="@/assets/banner.svg" alt="">
      </el-header>
    </el-container>
  </div>
  <div class="common-layout">
    <el-container>
      <el-aside class="aside">
        <Aside />
      </el-aside>
      <el-container class="main-container">
        <el-header class="main-header">
          <Navheader />
        </el-header>
        <el-main class="main-content">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside from '@/components/aside.vue'
import Navheader from '@/components/navheader.vue'

export default{
  component: {
    Aside,
    Navheader,
  }
}
</script>

<style lang="less" scoped>
.global-header {
  position: fixed;
  top: 0;
  width: 100%;
  height: 60px;
  z-index: 10; 
  background-color: #ffffff;
}

.header {
  height: 100%;
}

.common-layout {
  display: flex;
  height: 100vh; 
  margin-top: 60px; 
}

.aside {
  position: fixed;
  width: 200px;
  top: 60px; 
  bottom: 0;
  overflow: hidden;
  z-index: 10; 
  background-color: #f4f4f4; 
}

.main-container {
  margin-left: 200px; 
  height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
}

.main-header {
  height: 60px; 
}

.main-content {
  flex: 1;
  overflow-y: auto; 
}
</style>
