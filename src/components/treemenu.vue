<template>
  <el-menu
    :default-active="activeIndex"
    active-text-color="#FFFFFF"
    text-color="#333333"
    background-color="#FFFFFF"
    class="custom-menu"
    @select="handleSelect"
    unique-opened
  >
    <el-sub-menu index="1">
      <template #title>
        <img src="../assets/menu_icons/user.svg" alt="" class="menu-icons" />
        <span>用户管理</span>
      </template>
      <!-- 仅系统管理员可见 -->
      <el-menu-item index="/user/alluser" v-if="userStore.role === '系统管理员'">
        <img src="../assets/menu_icons/all-users.svg" alt="" class="menu-icons" />
        <span>所有用户管理</span>
      </el-menu-item>
      <!-- 系统管理员、疾控中心工作人员、专职医护人员可见 -->
      <el-menu-item index="/user/password" v-if="userStore.role === '系统管理员' || userStore.role === '专职医护人员' || userStore.role === '疾控中心工作人员'">
        <img src="../assets/menu_icons/password.svg" alt="" class="menu-icons" />
        <span>个人密码修改</span>
      </el-menu-item>
    </el-sub-menu>

    <!-- 系统管理员和疾控中心工作人员可见 -->
    <el-menu-item index="/work-env" v-if="userStore.role === '系统管理员' || userStore.role === '疾控中心工作人员'">
      <img src="../assets/menu_icons/work-env.svg" alt="" class="menu-icons" />
      <span>工作环境管理</span>
    </el-menu-item>

    <!-- 统计报表：系统管理员和疾控中心工作人员可见 -->
    <el-sub-menu index="/report" v-if="userStore.role === '系统管理员' || userStore.role === '疾控中心工作人员'">
      <template #title>
        <img src="../assets/menu_icons/report.svg" alt="" class="menu-icons" />
        <span>统计报表</span>
      </template>
      <el-menu-item index="/report/check-in">
        <img src="../assets/menu_icons/checkin.svg" alt="" class="menu-icons" />
        <span>职工打卡信息</span>
      </el-menu-item>
      <el-menu-item index="/report/disease-report">
        <img src="../assets/menu_icons/virus.svg" alt="" class="menu-icons" />
        <span>疾病统计报表</span>
      </el-menu-item>
      <el-menu-item index="/report/accuracy">
        <img src="../assets/menu_icons/accuracy.svg" alt="" class="menu-icons" />
        <span>疾病诊断准确率报表</span>
      </el-menu-item>
      <el-menu-item index="/report/screen">
        <img src="../assets/menu_icons/screen.svg" alt="" class="menu-icons" />
        <span>数据大屏</span>
      </el-menu-item>
    </el-sub-menu>

    <!-- 诊断信息管理：系统管理员、专职医护人员、疾控中心工作人员可见 -->
    <el-menu-item index="/diagnosis" v-if="userStore.role === '系统管理员' || userStore.role === '专职医护人员' || userStore.role === '疾控中心工作人员'">
      <img src="../assets/menu_icons/diagnosis.svg" alt="" class="menu-icons" />
      <span>诊断信息管理</span>
    </el-menu-item>

    <!-- 检查信息管理：系统管理员、专职医护人员、疾控中心工作人员可见 -->
    <el-menu-item index="/check" v-if="userStore.role === '系统管理员' || userStore.role === '专职医护人员' || userStore.role === '疾控中心工作人员'">
      <img src="../assets/menu_icons/check.svg" alt="" class="menu-icons" />
      <span>检查信息管理</span>
    </el-menu-item>

    <!-- 系统管理：仅系统管理员可见 -->
    <el-sub-menu index="/system" v-if="userStore.role === '系统管理员'">
      <template #title>
        <img src="../assets/menu_icons/system.svg" alt="" class="menu-icons" />
        <span>系统管理</span>
      </template>
      <el-menu-item index="/system/dis-data">
        <img src="../assets/menu_icons/disease_data_management.svg" alt="" class="menu-icons" />
        <span>疾病基础数据管理</span>
      </el-menu-item>
      <el-menu-item index="/system/weight">
        <img src="../assets/menu_icons/weight_management.svg" alt="" class="menu-icons" />
        <span>权重管理</span>
      </el-menu-item>
      <el-menu-item index="/system/auto-weight">
        <img src="../assets/menu_icons/auto_weight_update.svg" alt="" class="menu-icons" />
        <span>启动自动权重更新</span>
      </el-menu-item>
      <el-menu-item index="/system/expert-AI">
        <img src="../assets/menu_icons/ExpertorAI_diagnosis_switching.svg" alt="" class="menu-icons" />
        <span>专家/AI诊断切换</span>
      </el-menu-item>
      <el-menu-item index="/system/hospital">
        <img src="../assets/menu_icons/hospital.svg" alt="" class="menu-icons" />
        <span>医院基础数据管理</span>
      </el-menu-item>
    </el-sub-menu>

    <!-- 用户反馈：仅系统管理员可见 -->
    <el-menu-item index="/feedback" v-if="userStore.role === '系统管理员'">
      <img src="../assets/menu_icons/user_feedback.svg" alt="" class="menu-icons" />
      <span>用户反馈</span>
    </el-menu-item>

    <!-- 宣传材料管理：系统管理员和疾控中心工作人员可见 -->
    <el-menu-item index="/propaganda" v-if="userStore.role === '系统管理员' || userStore.role === '疾控中心工作人员'">
      <img src="../assets/menu_icons/study.svg" alt="" class="menu-icons" />
      <span>宣传材料管理</span>
    </el-menu-item>

    <!-- 满意度调查：仅系统管理员可见 -->
    <el-menu-item index="/satisfaction" v-if="userStore.role === '系统管理员'">
      <img src="../assets/menu_icons/satisfaction.svg" alt="" class="menu-icons" />
      <span>满意度调查</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
import { useUserStore } from '@/store/userrole'; // 确保路径正确
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useTagsStore } from '@/store/tags';

export default {
  name: 'TreeMenu',
  data() {
    return {
      activeIndex: this.$route.path,
      userStore: useUserStore() // 使用用户 store
    };
  },
  methods: {
    handleSelect(key) {
      this.activeIndex = key;
      const tag = {
        path: key,
        title: this.getTitleByPath(key) // 根据路径获取标签的标题
      };
      this.$tagsStore.addTag(tag); // 添加标签
      this.$router.push(key);
    },
    getTitleByPath(path) {
      const menuMap = {
        '/user/alluser': '所有用户管理',
        '/user/password': '个人密码修改',
        '/work-env': '工作环境管理',
        '/report/check-in': '职工打卡信息',
        '/report/disease-report': '疾病统计报表',
        '/report/screen': '数据大屏',
        '/diagnosis': '诊断信息管理',
        '/check': '检查信息管理',
        '/system/dis-data': '疾病基础数据管理',
        '/system/weight': '权重管理',
        '/system/auto-weight': '启动自动权重更新',
        '/system/expert-AI': '专家/AI诊断切换',
        '/system/hospital': '医院基础数据管理',
        '/feedback': '用户反馈',
        '/propaganda': '宣传材料管理',
        '/satisfaction': '满意度调查',
        '/report/accuracy' : '疾病诊断准确率报表'
      };
      return menuMap[path] || '未知标题';
    }
  },
  created() {
    this.$tagsStore = useTagsStore();
    this.$router = useRouter();
    this.$route = useRoute();

    // 监听路由路径变化以更新活动菜单项
    this.$watch(() => this.$route.path, (newPath) => {
      this.activeIndex = newPath;
    });
  }
};
</script>



<style scoped>
.el-menu {
  border-right: 1px solid #FFFFFF; 
  font-size: 18px;
  width: 210px;
}
ul.el-menu.el-menu--vertical {
  --el-menu-hover-bg-color: #F5F5F5 !important;
}
.menu-icons {
  width: 16px;
  height: 16px;
  margin-right: 8px;
  vertical-align: middle;
  filter: grayscale(100%) brightness(0) invert(0) sepia(1) hue-rotate(0deg) saturate(1000%) brightness(80%);
  transition: filter 0.3s ease;
}
.el-menu-item.is-active {
  background-color: #FFFFFF !important;
  color: #285AC8 !important;
}
.el-menu-item.is-active .menu-icons {
  filter: grayscale(0) brightness(0) invert(27%) sepia(85%) saturate(500%) hue-rotate(180deg) brightness(100%);
}
.el-menu-item:not(.is-active):hover .menu-icons {
  filter: grayscale(0) brightness(0) invert(20%) sepia(85%) saturate(300%) hue-rotate(150deg) brightness(90%);
}
.el-menu-item:not(.is-active):hover {
  background-color: #F5F5F5 !important;
}
</style>
