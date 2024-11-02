import axiosInstance from "@/utils/axiosInstance.js";

// 分页查询疾病基础信息
export const fetchDiseaseData = async (params) => {
  const response = await axiosInstance.post(
    "/admin/systemDiseaseData/pageSelectDiseaseType",
    params,
    {
      headers: {
        'Content-Type': 'application/json', 
      },
    }
  );
  return response;
};

// 导出疾病基础数据接口
export const exportDiseaseBasicData = async () => {
  const response = await axiosInstance.get(
    "/admin/systemDiseaseData/getExcelDiseaseBasicDataExportTable",
    {
      responseType: 'blob', 
    }
  );
  return response;
};
