import axiosInstance from "@/utils/axiosInstance.js";

export const systemChange = async (isAI) => {
  const response = await axiosInstance.put(`/admin/systemChange/${isAI}`);
  return response;
};

export const systemChangeSearch = async () => {
  const response = await axiosInstance.get("/admin/systemChange");
  return response;
};
