import axiosInstance from "@/utils/axiosInstance.js";

// 上传文件通用接口
export const uploadFile = async (formData) => {
  const response = await axiosInstance.post("/common/file", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};
