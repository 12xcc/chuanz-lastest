import axiosInstance from "@/utils/axiosInstance.js";

// 立即执行自动更新
export const startAI = async () => {
  const response = await axiosInstance.put("/ai/startAI");
  return response;
};

// 启用/禁用自动更新
export const updateAutoAIWeightUpdater = async (autoAIWeightUpdater) => {
  const response = await axiosInstance.put(
    `/ai/updateAutoAIWeightUpdater/${autoAIWeightUpdater}`
  );
  return response;
};

// 获取当前自动更新状态
export const getAutoAIWeightUpdater = async () => {
  const response = await axiosInstance.get("/ai/getAutoAIWeightUpdater");
  return response;
};
