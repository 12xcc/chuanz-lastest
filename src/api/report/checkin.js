import axiosInstance from "@/utils/axiosInstance.js";

// 分页查询疾病基础信息
export const pageSelectCheckin = async (params) => {
  const response = await axiosInstance.post(
    "/cdcStaff/statisticsCheckin/pageSelectCheckin",
    params,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};

// 导出职工打卡信息导出表
export const getEmployeeCheckInExcel = async () => {
  const response = await axiosInstance.get(
    "/cdcStaff/statisticsCheckin/getEmployeeCheckInExcel",
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      responseType: "blob",
    }
  );
  return response;
};

// 导出职工打卡信息导出表（AI）
export const getEmployeeCheckInExcelAI = async () => {
  const response = await axiosInstance.get(
    "/cdcStaff/statisticsCheckin/getEmployeeCheckInExcelAI",
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      responseType: "blob",
    }
  );
  return response;
};

// 根据id获取用户打卡位置信息
export const selectCheckinInfoById = async (dailyHealthId) => {
  const response = await axiosInstance.get(
    `/cdcStaff/statisticsCheckin/selectCheckinInfoById/${dailyHealthId}`,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return response;
};

// 根据id获取打卡信息

export const selectCheckinById = async (dailyHealthId) => {
  const response = await axiosInstance.get(
    `/cdcStaff/statisticsCheckin/selectCheckinById/${dailyHealthId}`
  );
  return response;
};
