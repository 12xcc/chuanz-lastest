import axiosInstance from "@/utils/axiosInstance.js";

export const startAI = async () => {
  const response = await axiosInstance.put("/ai/startAI");
  return response;
};

export const updateAutoAIWeightUpdater = async (autoAIWeightUpdater) => {
  const response = await axiosInstance.put(
    `/ai/updateAutoAIWeightUpdater/${autoAIWeightUpdater}`
  );
  return response;
};

export const getAutoAIWeightUpdater = async () => {
  const response = await axiosInstance.get("/ai/getAutoAIWeightUpdater");
  return response;
};
