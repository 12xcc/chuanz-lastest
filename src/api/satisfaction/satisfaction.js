import axiosInstance from "@/utils/axiosInstance.js";


// 发布满意度问卷
export const addSatisfactionSurvey = async (data) => {
  const response = await axiosInstance.post(
    "/admin/satisfaction/addSatisfactionSurvey",
    data
  );
  return response;
};

// 根据ID关闭满意度调查
export const closeSatisfaction = async (surveyID) => {
  const response = await axiosInstance.put(
    `/admin/satisfaction/closeSatisfaction/${surveyID}`
  );
  return response;
};

// 根据ID开放满意度调查
export const openSatisfaction = async (surveyID) => {
  const response = await axiosInstance.put(
    `/admin/satisfaction/openSatisfaction/${surveyID}`
  );
  return response;
};

// 统计满意度打分人数信息
export const getSatisfactionNumberInfo = async (surveyID) => {
  const response = await axiosInstance.get(
    `/admin/satisfaction/getNumberInfo/${surveyID}`,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "*/*",
      },
    }
  );
  return response;
};


// 分页查询调查列表
export const pageSelectSatisfactionSurvey = async (params) => {
  const response = await axiosInstance.get(
    "/admin/satisfaction/pageSelectSatisfactionSurvey",
    { params }
  );
  return response;
};

// 分页查询满意度打分表
export const pageSelectSatisfactionRating = async (params) => {
  const response = await axiosInstance.get(
    "/admin/satisfaction/pageSelectSatisfactionRating",
    { params }
  );
  return response;
};

// 更新满意度调查
export const updateSatisfaction = async (data) => {
  const response = await axiosInstance.post(
    "/admin/satisfaction/updateSatisfaction",
    data
  );
  return response;
};
