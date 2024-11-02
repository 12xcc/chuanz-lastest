<template>
  <div class="login-wrapper">
    <div class="container">
      <div class="login-container">
        <div class="login-title">登录</div>
        <form @submit.prevent="handleSubmit">
          <div class="input-group">
            <label for="phoneNumber">用户名</label>
            <input
              v-model="phoneNumber"
              type="text"
              id="phoneNumber"
              placeholder="手机号"
              maxlength="11"
              @input="validateAndFormatphoneNumber"
            />
            <span v-if="phoneNumberError" class="error-message">{{
              phoneNumberError
            }}</span>
          </div>
          <div class="input-group">
            <label for="password">密码</label>
            <div class="password-wrapper">
              <input
                :type="passwordFieldType"
                v-model="password"
                id="password"
                placeholder="请输入密码"
                maxlength="16"
                @input="validateAndFormatPassword"
              />
              <span class="eye-icon" @click="togglePasswordVisibility">
                <img
                  :src="
                    passwordFieldType === 'password'
                      ? passwordClose
                      : passwordOpen
                  "
                />
              </span>
            </div>
            <span v-if="passwordError" class="error-message">{{
              passwordError
            }}</span>
          </div>
          <button @click="handleSubmit" type="button">提交</button>
          <a href="#" @click.prevent="resetPassword">重置密码</a>
        </form>
      </div>
      <div class="title">
        <div>--- 川藏铁路突发传染病自主判别和现场调查管理系统 ---</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus"; 
import { loginUser } from "@/api/login.js";
import passwordOpen from "../../assets/password_close.png";
import passwordClose from "../../assets/password_open.png";
import { useUserStore } from "@/store/userrole";
import { useTagsStore } from "@/store/tags.js";

export default {
  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    const tagStore = useTagsStore();
    const phoneNumber = ref("");
    const password = ref("");
    const passwordFieldType = ref("password");
    const phoneNumberError = ref("");
    const passwordError = ref("");

    const togglePasswordVisibility = () => {
      passwordFieldType.value =
        passwordFieldType.value === "password" ? "text" : "password";
    };

    const handleSubmit = async () => {
      if (!validateAndFormatphoneNumber() || !validateAndFormatPassword()) {
        return;
      }

      const loginData = {
        phoneNumber: phoneNumber.value,
        password: password.value,
      };

      try {
        const response = await loginUser(loginData);
        const { code, data, msg } = response.data;  // 从响应中解构获取 code, data 和 msg
        if (code === 1) {
          const userRole = data.user.userType; // 获取用户角色
          
          // 检查用户角色是否为允许的角色
          if (
            userRole === '系统管理员' ||
            userRole === '专职医护人员' ||
            userRole === '疾控中心工作人员'
          ) {
            const userData = {
              phoneNumber: phoneNumber.value,
              token: data.token,
              name: data.user.name,
              role: userRole,  // 使用后端返回的 userType
            };
            userStore.login(userData);
            localStorage.setItem("user", JSON.stringify(userData)); // 保存用户数据到 localStorage
            tagStore.removeAllTag(); // 清除上次登录的 tags
            router.push("/user/password"); // 跳转到其他页面
            ElMessage.success("登录成功");
          } else {
            // 如果角色不属于允许的角色，阻止登录
            ElMessage.error("无登录权限");
          }
        } else {
          // 使用后端返回的 msg 作为错误提示，如果 msg 是 null，使用默认提示
          ElMessage.error(msg || '登录失败，请稍后再试');
        }
      } catch (error) {
        // 捕获网络错误或其他异常，并显示默认错误提示
        ElMessage.error("网络错误或服务器异常，请稍后再试");
      }
    };

    const resetPassword = () => {
      password.value = phoneNumber.value.slice(-6);
      alert("密码已重置为身份证后六位");
    };

    const validateAndFormatphoneNumber = () => {
      const phonePattern = /^[1-9]\d{10}$/; // 确保手机号为11位
      if (!phonePattern.test(phoneNumber.value)) {
        phoneNumberError.value = "请输入正确的11位手机号";
        return false;
      }
      phoneNumberError.value = "";
      return true;
    };

    const validateAndFormatPassword = () => {
      const passwordPattern = /^.{6,16}$/; // 密码应为6-16位字符，可包含字母、数字、特殊字符
      if (!passwordPattern.test(password.value)) {
        passwordError.value = "密码应为6-16位字符";
        return false;
      }
      passwordError.value = "";
      return true;
    };

    return {
      phoneNumber,
      password,
      passwordFieldType,
      passwordOpen,
      passwordClose,
      phoneNumberError,
      passwordError,
      togglePasswordVisibility,
      handleSubmit,
      resetPassword,
      validateAndFormatphoneNumber,
      validateAndFormatPassword,
    };
  },
};
</script>

<style scoped>

.login-wrapper {
  position: relative;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.login-wrapper::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("../images/background_login.jpg");
  background-size: cover;
  background-position: center;
  z-index: -1;
}

.login-wrapper::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: -1;
}

.title {
  margin-top: 40px;
  font-size: 20px;
  font-weight: bold;
  color: #ffffff;
  margin-left: -35px;
}

.login-container {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  height: 400px;
  text-align: center;
  position: relative;
  left: 16%;
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
  border: 1px solid #fafafa;
  border-radius: 4px;
  background-color: #fafafa;
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
  top: 35%;
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
