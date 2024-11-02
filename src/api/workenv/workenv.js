import axiosInstance from "@/utils/axiosInstance.js";

// 获取工作环境列表
export const fetchWorkenvData = async (params) => {
  const response = await axiosInstance.post(
    "/cdcStaff/workEnvironment/pageSelectWorkEnvironment",
    params,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};

// 查看工作环境 根据id获取
export const checkWorkenvDataById = async (workId) => {
  const response = await axiosInstance.get(
    `/cdcStaff/workEnvironment/getWorkInfoById/${workId}`,
  );
  return response;
};

// 导出环境信息
export const exportWorkenvData = async () => {
    const response = await axiosInstance.get(
      "/cdcStaff/workEnvironment/queryAllWorkEnvironmentInfoToExcel",
      {
        responseType: 'blob', 
      }
    );
    return response;
  };