import axiosInstance from "@/utils/axiosInstance.js";

// 获取权重总分
export const getAllWeightScoringInfo = async (params) => {
    const response = await axiosInstance.get("/admin/systemValueManager/getAllWeightScoringInfo", {
      params,
    });
    return response;
  };

// 导出文件：传染病初始权重打分表加工
export const getExcelInitialWeightScoringTableForInfectiousDiseases = async () => {
  const response = await axiosInstance.get("/admin/systemValueManager/getExcelInitialWeightScoringTableForInfectiousDiseases", {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    responseType: "blob",
  });
  return response;
};

// 根据疾病id批量更新疾病权重信息 可以只传修改过的几条数据
export const updateBatchWeightScoring = async (params) => {
  const response = await axiosInstance.post("/admin/systemValueManager/updateBatchWeightScoring", params);
  return response;
};
