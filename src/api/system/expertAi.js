import axiosInstance from "@/utils/axiosInstance.js";

export const systemChange = async () => {
    const response = await axiosInstance.get(
      "/admin/systemChange",
    );
    return response;
  };