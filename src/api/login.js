import axiosInstance from "@/utils/axiosInstance.js";

// 用户登录接口
export const loginUser = async (params) => {
  const response = await axiosInstance.post("/user/login", params);
  return response;
};

// 修改密码接口
export const changePassword = async (data) => {
  const response = await axiosInstance.post("/medicalStaff/userpPassword/change", data);
  return response;
};
