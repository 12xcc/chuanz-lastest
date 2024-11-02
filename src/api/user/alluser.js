import axiosInstance from "@/utils/axiosInstance.js";

// 获取用户列表
export const fetchUserData = async (params) => {
  const response = await axiosInstance.get("/admin/userManager/pageSelectUser", {
    params,
  });
  return response;
};

// 切换用户状态
export const toggleUserStatus = async (userId) => {
  const url = `/admin/userManager/changeUserActive/${userId}`;
  const response = await axiosInstance.put(url);
  return response;
};

// 初始化用户密码
export const initializeUserPassword = async (userId) => {
  const url = `/admin/userManager/initPassword/${userId}`;
  const response = await axiosInstance.put(url);
  return response;
};

// 导出用户信息
export const exportUserData = async () => {
  const response = await axiosInstance.get("/admin/userManager/queryAllUserToExcel", {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    responseType: "blob",
  });
  return response;
};

// 批量导入用户
export const importUsersByExcel = async (formData) => {
  const response = await axiosInstance.post(
    "/admin/userManager/addManyUserByExcel",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response;
};

// 根据用户ID获取用户信息
export const fetchUserInfoById = async (userId) => {
  const response = await axiosInstance.get(
    `/admin/userManager/getInfoByUserId/${userId}`,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return response;
};

// 更新用户信息
export const updateUserInfo = async (requestData) => {
  const response = await axiosInstance.post(
    "/admin/userManager/updateUserInfo",
    requestData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};

// 修改密码
`/medicalStaff/userpPassword/change`

// 下载导入模板
export const queryAllUserToExcel = async () => {
  const response = await axiosInstance.get("/admin/userManager/queryAllUserToExcel", {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    responseType: "blob",
  });
  return response;
};