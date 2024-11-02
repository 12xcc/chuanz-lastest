import axiosInstance from "@/utils/axiosInstance.js";

// 获取反馈信息列表
export const fetchFeedbackData = async (data) => {
  const response = await axiosInstance.post(
    "/admin/feedBackManager/pageSelectFeedBack",
    data,
  );
  return response;
};

// 根据userId查看反馈信息
export const fetchFeedbackDataById = async (feedbackId) => {
  const response = await axiosInstance.get(
    `/admin/feedBackManager/getUserFeedBack/${feedbackId} `
  );
  return response;
};

// 导出反馈信息表
export const exportFeedbackData = async () => {
  const response = await axiosInstance.get(
    "/admin/feedBackManager/getExcelUserFeedbackInformationExportTable",
    { responseType: "blob" }
  );

  return response;
};
