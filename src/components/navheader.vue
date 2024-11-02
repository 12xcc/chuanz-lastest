<template>
  <div class="container">
    <div class="right">
      <div class="tags-container">
        <el-tag
          v-for="tag in tagsList"
          :key="tag.path"
          :closable="true"
          :class="{ active: tag.path === currentPath }"
          @close="removeTag(tag.path)"
          @click="selectTag(tag)"
        >
          {{ tag.title }}
        </el-tag>
      </div>
    </div>
    <div class="left">
      <el-button
        style="font-size: 12px; position: absolute; right: 10px; top: 5px"
        @click="handleLogout"
      >
        登出
      </el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "pinia";
import { useTagsStore } from "@/store/tags";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/userrole.js"; // 引入用户 store
import { ElMessageBox, ElMessage } from "element-plus";

export default {
  name: "NavHeader",

  computed: {
    ...mapState(useTagsStore, ["tagsList"]),
    currentPath() {
      return this.$router.currentRoute.value.path;
    },
  },

  methods: {
    selectTag(tag) {
      this.$router.push(tag.path);
    },

    removeTag(tagPath) {
      const currentTagIndex = this.tagsList.findIndex(
        (tag) => tag.path === tagPath
      );

      // 删除标签
      this.$store.removeTag(tagPath);

      // 如果删除的是当前标签
      if (tagPath === this.currentPath) {
        const previousTag = this.$store.getPreviousTag(currentTagIndex);
        if (previousTag) {
          this.$router.push(previousTag.path);
        } else {
          this.$router.push("/user/password");
        }
      }
    },

   async handleLogout() {
      const userStore = useUserStore();

      ElMessageBox.confirm(
        '您确定要退出登录吗？', 
        '确认退出', 
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
        }
      )
      .then(async () => {

        // 清除本地用户状态和存储
        userStore.$reset(); // 清空用户 Pinia 状态
        localStorage.removeItem('user'); // 清除 localStorage 中的用户信息

        // 可选：调用后端 API 进行安全登出
        // try {
        //   await fetch('/api/logout', { method: 'POST' });
        // } catch (error) {
        //   console.error("Logout API failed", error);
        // }

        ElMessage({
          type: 'success',
          message: '退出登录成功',
        });
        this.$router.push("/login");

      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '已取消登出操作',
        });
      });
    }
  },
  
  created() {
    this.$store = useTagsStore();
    this.$router = useRouter();
  },
};
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  background: #ffffff;
  height: 100%;
  padding-right: 25px;
}

.left {
  position: absolute;
  right: 0px;
  display: block;
  align-items: center;
  height: 40px;
  width: 80px;
  background: #ffffff;
}

.icon {
  width: 45px;
  height: 100%;
  color: #333333;
  background-color: #ffffff;
}

.icon:hover {
  background-color: #fafafa;
  cursor: pointer;
}

.tags-container {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  cursor: pointer;
}

.el-tag {
  color: #a6a6a6;
  border: 1px solid #a6a6a6;
  background-color: #fafafa;
  height: 30px;
  line-height: 30px;
  padding: 0 12px;
}

.el-tag.active {
  color: #285ac8;
  border: 1px solid #285ac8;
  background-color: #fafafa;
}
</style>
