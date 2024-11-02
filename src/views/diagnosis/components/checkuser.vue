<template>
  <el-drawer
    title="查找用户"
    v-model="dialogVisible"
    size="800px"
    direction="rtl"
    :with-header="false"
    custom-class="custom-drawer"
    @close="handleCancel"
  >
    <div class="container">
      <div class="title">
        <h3>查找用户</h3>
        <div class="footer">
          <el-button @click="handleCancel">取消</el-button>
        </div>
      </div>
      <el-form label-width="160px" class="form-container" ref="form">
        <div>
          <el-form-item label="姓名">
            <el-input v-model="name" placeholder="请输入姓名" clearable />
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input
              v-model="phoneNumber"
              placeholder="请输入联系电话"
              clearable
            />
          </el-form-item>
        </div>

        <div>
          <el-form-item label="性别">
            <el-select v-model="gender" placeholder="选择性别" clearable>
              <el-option label="男" value="男" />
              <el-option label="女" value="女" />
            </el-select>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="age" placeholder="请输入年龄" clearable />
          </el-form-item>
        </div>
      </el-form>
      <div style="margin-left: 620px">
        <el-form-item>
          <el-button type="primary" @click="searchUsers" :loading="loading"
            >查找</el-button
          >
        </el-form-item>
      </div>
    </div>

    <!-- 映射后的表格 -->
    <el-table
      v-if="filteredUsers.length > 0"
      :data="filteredUsers"
      style="margin-top: 20px; margin-left: 40px; width: 700px"
    >
      <el-table-column prop="name" label="姓名" width="100" />
      <el-table-column prop="gender" label="性别" width="60" />
      <el-table-column prop="age" label="年龄" width="60" />
      <el-table-column prop="ethnicity" label="民族" width="80" />
      <el-table-column prop="department" label="部门/工种" width="120" />
      <el-table-column prop="phoneNumber" label="电话" width="120" />
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button @click="selectUser(row)">添加诊断数据</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div
      v-if="filteredUsers.length === 0"
      style="margin-top: 20px; font-size: 13px; text-align: center; color: #999"
    >
      暂无数据
    </div>
  </el-drawer>
  <Adddiagnosisdata ref="Adddiagnosisdata" @update="handleQuery"/>
</template>

<script>
import Adddiagnosisdata from "./adddiagnosisdata/adddiagnosisdata.vue";
import { getUserByBaseInfo } from "@/api/check/check";

export default {
  components: {
    Adddiagnosisdata,
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["update:visible", "user-selected"],
  data() {
    return {
      name: "",
      phoneNumber: "",
      gender: "",
      age: null,
      selectedUser: null,
      filteredUsers: [], // 存储后端返回的用户数据
      dialogVisible: this.visible, // 初始状态与 props 绑定
      loading: false, // 控制按钮的加载状态
    };
  },
  methods: {
    showDialog() {
      this.dialogVisible = true;
    },
    // 查找用户
    async searchUsers() {
      this.loading = true;
      try {
        const params = {
          name: this.name,
          gender: this.gender,
          phoneNumber: this.phoneNumber,
          age: this.age,
        };

        const response = await getUserByBaseInfo(params);

        const userData = response.data.data;
        // userData 是对象而不是数组，将其转换为数组
        if (response.data.code === 1 && userData) {
          this.filteredUsers = [userData]; // 将对象放入数组中
        } else {
          this.filteredUsers = [];
          this.$message.error(
           response.data.msg
      );
        }
        
      } catch (error) {
        console.error("查找用户时发生错误:", error);
        this.$message.error("查找用户失败，请稍后重试");
      } finally {
        this.loading = false;
      }
    },
    selectUser(row) {
      this.selectedUser = row;
      this.$refs.Adddiagnosisdata.showDrawer(row);
    },
    confirmSelection() {
      this.$emit("user-selected", this.selectedUser);
      this.$emit("update:visible", false); // 关闭对话框
    },
    resetForm() {
      this.name = "";
      this.phoneNumber = "";
      this.gender = "";
      this.age = null;
      this.filteredUsers = [];
      this.selectedUser = null;
    },
    handleCancel() {
      this.dialogVisible = false;
      this.resetForm();
    },
    handleQuery(){
      this.$emit("update");
    }
  },
  watch: {
    visible(val) {
      this.dialogVisible = val; // 监听 props.visible 变化
      if (!val) {
        this.resetForm(); // 重置表单
      }
    },
  },
};
</script>




<style scoped>
.el-dialog {
  max-width: 800px;
}
.custom-drawer {
  height: 100%;
}
.form-container {
  padding: 20px;
  margin-top: 70px;
}
.title {
  position: fixed;
  top: 0;
  right: 0;
  width: 800px;
  background: #ffffff;
  padding: 3px;
  z-index: 100;
  border: 3px solid #fafafa;
}
.footer {
  display: flex;
  justify-content: flex-end;
  margin-top: -25px;
  margin-right: 10px;
  margin-bottom: 20px;
}
h3 {
  margin-top: 20px;
  font-size: 16px;
  color: #333333;
  margin-left: 30px;
}
.custom-input {
  margin-bottom: 10px;
}
.el-dropdown-link:focus {
  outline: none;
}

.title-container {
  display: flex;
  margin-left: 0px;
  margin-bottom: 20px;
  margin-top: 20px;
}

.blue-box {
  width: 6px;
  height: 18px;
  background-color: #285ac8;
  margin-right: 10px;
}

.title-text {
  font-size: 12px;
  font-weight: bold;
  color: #4a4a4a;
}
.el-form {
  margin-top: 100px;
  display: flex;
  margin-left: -60px;
}
.el-input {
  width: 200px;
}
.el-select {
  width: 200px;
}
</style>
