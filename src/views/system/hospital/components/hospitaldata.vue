<template>
  <el-drawer
    :model-value="visible"
    direction="rtl"
    size="700px"
    :with-header="false"
    custom-class="custom-drawer"
    @close="handleCancel"
  >
    <div class="container">
      <div class="title">
        <h3>修改医院信息</h3>
        <div class="footer">
          <el-button @click="handleCancel">取消</el-button>
          <el-button @click="handleReset">重置</el-button>
          <el-button type="primary" @click="handleSubmit">提交</el-button>
        </div>
      </div>
      <el-form
        :model="form"
        label-width="120px"
        class="form-container"
        ref="form"
        :rules="rules"
      >
        <el-form-item label="医院名称" prop="hospitalName">
          <el-input
            v-model="form.hospitalName"
            style="width: 200px"
            placeholder="请输入医院名称"
            @blur="$refs.form.validateField('hospitalName')"
          ></el-input>
        </el-form-item>

        <el-form-item label="联系电话" prop="hospitalPhoneNumber">
          <el-input
            v-model="form.hospitalPhoneNumber"
            style="width: 200px"
            placeholder="请输入医院电话"
            @blur="$refs.form.validateField('hospitalPhoneNumber')"
          ></el-input>
        </el-form-item>

        <el-form-item label="医院地址" prop="Address">
          <el-input
            v-model="form.Address"
            style="width: 200px"
            placeholder="请输入医院地址"
            @blur="$refs.form.validateField('Address')"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
  </el-drawer>
</template>

<script>
import { ElMessage } from "element-plus";
import { fetchHospitalDataById,editHospitalDataById } from "@/api/system/hospital.js"; 

export default {
  components: {
  },
  data() {
    return {
      currentHospitalId :"",
      visible: false, // 控制弹窗显示
      form: {
        hospitalName: '',
        hospitalPhoneNumber: '',
        Address: '',
      },

      rules: {
        hospitalName: [{ required: true, message: '请输入医院名称', trigger: 'blur' }],
        hospitalPhoneNumber: [{ required: true, message: '请输入联系电话', trigger: 'blur' }],
        Address: [{ required: true, message: '请输入医院地址', trigger: 'blur' }],
      },
    };
  },
  methods: {

    // 根据id获取医院信息
    async getHospitalDataById(hospitalId) {
      try {
        const response = await fetchHospitalDataById(hospitalId);
        if (response.data.code === 1) {
          // 将后端数据映射到表单
          this.form = {
            hospitalName: response.data.data.hospitalName,
            hospitalPhoneNumber: response.data.data.hospitalPhoneNumber,
            Address: response.data.data.address,
          };
        } else {
          console.error("获取医院信息失败:", response.data.msg);
          ElMessage({
            message: `获取医院信息失败: ${response.data.msg}`,
            type: "error",
          });
        }
      } catch (error) {
        console.error("请求出错:", error);
        ElMessage({
          message: "请求出错",
          type: "error",
        });
      }
    },


    showDrawer(hospitalId) {
      this.currentHospitalId = hospitalId;
      this.visible = true;
      this.getHospitalDataById(hospitalId); 
    },

    handleCancel() {
      this.visible = false;
    },

     handleSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          try {
            const params = {
               hospitalId: this.currentHospitalId,
               hospitalName: this.form.hospitalName,
               hospitalPhoneNumber:this.form.hospitalPhoneNumber,
               address:this.form.Address,
            };

            const response = await editHospitalDataById(params); 

            if (response.data.code === 1) {
              ElMessage({
                message: "提交成功",
                type: "success",
              });
              this.visible = false;
               this.$emit('update-success'); 
            } else {
              ElMessage({
                message: "提交失败：" + response.data.msg,
                type: "error",
              });
            }
          } catch (error) {
            console.error("提交出错:", error);
            ElMessage({
              message: "提交出错，请重试",
              type: "error",
            });
          }
        } else {
          console.log("表单验证失败");
          ElMessage({
            message: "提交失败，表单验证未通过",
            type: "error",
          });
        }
      });
    },

    handleReset() {
      this.form = this.getInitialForm();
      this.message = "";
    },

    getInitialForm() {
      return {
        hospitalName: '',
        hospitalPhoneNumber: '',
        Address: '',
      };
    },
  },
};
</script>

<style scoped>
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
  width: 700px;
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
</style>
