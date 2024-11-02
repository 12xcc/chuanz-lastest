<template>
  <div class="login-wrapper">
    <div class="login-container">
      <div class="login-title">修改密码</div>
      <form @submit.prevent="handleSubmit">
        <!-- 原密码输入框 -->
        <div class="input-group">
          <label for="oldPassword">原密码</label>
          <div class="password-wrapper">
          <input
            :type="oldPasswordFieldType"
            v-model="oldPassword"
            id="oldPassword"
            placeholder="请输入原密码"
            maxlength="16"
            @input="validateAndFormatOldPassword"
          />
          <span class="eye-icon" @click="togglePasswordVisibility('oldPassword')">
            <img :src="oldPasswordFieldType === 'password' ? passwordCloseIcon : passwordOpenIcon" />
          </span>
          <span v-if="oldPasswordError" class="error-message">{{ oldPasswordError }}</span>
          </div>
        </div>

        <!-- 新密码输入框 -->
        <div class="input-group">
          <label for="newPassword">新密码</label>
          <div class="password-wrapper">
            <input
              :type="newPasswordFieldType"
              v-model="newPassword"
              id="newPassword"
              placeholder="请输入新密码"
              maxlength="16"
              @input="validateAndFormatNewPassword"
            />
            <span class="eye-icon" @click="togglePasswordVisibility('newPassword')">
              <img :src="newPasswordFieldType === 'password' ? passwordCloseIcon : passwordOpenIcon" />
            </span>
            <span v-if="newPasswordError" class="error-message">{{ newPasswordError }}</span>
          </div>
        </div>

        <!-- 确认密码输入框 -->
        <div class="input-group">
          <label for="confirm-password">确认密码</label>
          <div class="password-wrapper">
            <input
              :type="confirmPasswordFieldType"
              v-model="confirmPassword"
              id="confirm-password"
              placeholder="再次请输入新密码"
              maxlength="16"
              @input="validateAndFormatConfirmPassword"
            />
            <span class="eye-icon" @click="togglePasswordVisibility('confirmPassword')">
              <img :src="confirmPasswordFieldType === 'password' ? passwordCloseIcon : passwordOpenIcon" />
            </span>
            <span v-if="confirmPasswordError" class="error-message">{{ confirmPasswordError }}</span>
          </div>
        </div>

        <button type="button" @click="handleSubmit">提交</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { changePassword } from "@/api/login.js"; // 引入修改密码 API
import passwordOpenIcon from "@/assets/password_open.png";  // 确保路径正确
import passwordCloseIcon from "@/assets/password_close.png";  // 确保路径正确

export default {
  setup() {
    const oldPassword = ref("");
    const newPassword = ref("");
    const confirmPassword = ref("");
    const oldPasswordFieldType = ref("password"); // 原密码的字段类型
    const newPasswordFieldType = ref("password"); // 新密码的字段类型
    const confirmPasswordFieldType = ref("password"); // 确认密码的字段类型
    const oldPasswordError = ref("");
    const newPasswordError = ref("");
    const confirmPasswordError = ref("");

    // 切换密码可见性
    const togglePasswordVisibility = (type) => {
      if (type === "oldPassword") {
        oldPasswordFieldType.value = oldPasswordFieldType.value === "password" ? "text" : "password";
      } else if (type === "newPassword") {
        newPasswordFieldType.value = newPasswordFieldType.value === "password" ? "text" : "password";
      } else if (type === "confirmPassword") {
        confirmPasswordFieldType.value = confirmPasswordFieldType.value === "password" ? "text" : "password";
      }
    };

    // 提交表单
    const handleSubmit = async () => {
      if (validatePasswords()) {
        const changePasswordDTO = {
          oldPassword: oldPassword.value,
          newPassword: newPassword.value,
          confirmPassword: confirmPassword.value
        };

        try {
          const response = await changePassword(changePasswordDTO);
          const { code, msg } = response.data;
          if (code === 1) {
            ElMessage.success("密码修改成功");
          } else {
            ElMessage.error(msg || "密码修改失败");
          }
        } catch (error) {
          ElMessage.error("网络错误或服务器异常，请稍后再试");
        }
      }
    };

    // 验证密码
    const validatePasswords = () => {
      validateAndFormatOldPassword();
      validateAndFormatNewPassword();
      validateAndFormatConfirmPassword();
      return !oldPasswordError.value && !newPasswordError.value && !confirmPasswordError.value;
    };

    const validateAndFormatOldPassword = () => {
      oldPasswordError.value = oldPassword.value ? "" : "请输入原密码";
    };

    const validateAndFormatNewPassword = () => {
      const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
      newPasswordError.value = passwordPattern.test(newPassword.value)
        ? ""
        : "密码必须为8-16位字符，包括大小写字母、数字和特殊符号";
    };

    const validateAndFormatConfirmPassword = () => {
      confirmPasswordError.value = confirmPassword.value === newPassword.value ? "" : "两次密码不一致";
    };

    return {
      oldPassword,
      newPassword,
      confirmPassword,
      oldPasswordFieldType,
      newPasswordFieldType,
      confirmPasswordFieldType,
      oldPasswordError,
      newPasswordError,
      confirmPasswordError,
      passwordOpenIcon, // 确保模板中引用了正确的变量
      passwordCloseIcon, // 确保模板中引用了正确的变量
      togglePasswordVisibility,
      handleSubmit,
      validateAndFormatOldPassword,
      validateAndFormatNewPassword,
      validateAndFormatConfirmPassword
    };
  }
};
</script>




<style scoped>
.login-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  height: 100%;
}

.login-container {
  /* background-color: #FFFFFF; */
  padding: 50px;
  border-radius: 8px;
  width: 500px;
  height: auto;
  text-align: center;
  position: relative;
}

.login-title {
  color: #333333;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}

.input-group {
  margin-bottom: 30px;
  text-align: left;
}
#phoneNumber {
  background-color: #f4f4f4 !important;
  color: #a6a6a6;
  font-size: 16px;
  border: 2px solid #f4f4f4;
}
label {
  color: #333333;
  font-size: 14px;
  margin-bottom: 5px;
  display: block;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  height: 50px;
  line-height: 50px;
  padding: 10px;
  border: 1px solid #ffffff;
  border-radius: 4px;
  background-color: #ffffff;
  color: #333333;
  box-sizing: border-box;
  outline: none;
  transition: box-shadow 0.2s ease-in-out;
}

input::-webkit-input-placeholder {
  color: #a6a6a6;
  font-size: 14px;
}

input:focus {
  outline: none;
  border: 1px solid #285ac8;
  /* box-shadow: 1px 10px 20px rgba(56,56,56,0.05); */
}

.password-wrapper {
  position: relative;
}

.eye-icon {
  transform: scale(0.5) translateY(-50%);
  position: absolute;
  right: 10px;
  top: 15px;
  cursor: pointer;
}

button {
  width: 100%;
  height: 50px;
  padding: 10px;
  background-color: #285ac8;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  box-shadow: 0.8px 0.8px 24px 0.8px rgba(40, 90, 200, 0.3);
}

button:hover {
  background-color: #1d45a5;
}

a {
  display: block;
  margin-top: 15px;
  color: #285ac8;
  text-decoration: none;
  font-size: 14px;
}

a:hover {
  text-decoration: underline;
}

.error-message {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}
</style>
