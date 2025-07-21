import axiosInstance from "@/utils/axiosInstance.js";

// 获取当日疾病分布
export const getDiseaseDataToday = (date) => {
  return axiosInstance.get('/cdcStaff/statisticsDataView/getDiseaseDataToday', {
    params: { date }
  });
};

// 获取一段时间内的打卡分布
export const getCheckInDailyNumber = async (dateList) => {
  const response = await axiosInstance.post(
    "/cdcStaff/statisticsDataView/getCheckInDailyNumber",
    dateList
  );
  return response;
};

export const getStatisticsData = async (date) => {
  const response = await axiosInstance.get(
    "/cdcStaff/statisticsDataView/getStatisticsData",
    { params: { date } } // 传递query参数
  );
  return response;
};



// 根据手机号筛选
export const getChickInInfoByText = async (params) => {
  const response = await axiosInstance.get(
    "/cdcStaff/statisticsDataView/getChickInInfoByText",
    { params }
  );
  return response;
};

// 重点人员跟踪
export const getImportantUserInfo = async () => {
  const response = await axiosInstance.get(
    "/cdcStaff/statisticsDataView/getImportantUserInfo"
  );
  return response;
};

// 获取全部用户地理位置信息
export const getUserStation = async (date) => {
  const response = await axiosInstance.get("/cdcStaff/statisticsDataView/getUserStation", {
    params: { date }
  });
  return response;
};


export const getDiseaseStatisticsListInfo = async (dateBegin, dateEnd, diseaseList, sourceType) => {
  console.log("Params:", {
    dateBegin,
    dateEnd,
    diseaseList,
    sourceType
  });
  const response = await axiosInstance.get("/cdcStaff/statisticsDisease/getDiseaseStatisticsListInfo", {
    params: {
      dateBegin,
      dateEnd,
      diseaseList: diseaseList.join(","), // 将数组转为逗号分隔字符串
      sourceType
    }
  });
  return response;
};

// 准确率
export const getstrike = async (params) => {
  const response = await axiosInstance.get(
    "/cdcStaff/statisticsDiagnosticAccuracy/strike",
    { params }
  );
  return response;
};


// 更改准确率参数
export const JudgmentsPredictorNumber = async (range) => {
  const response = await axiosInstance.get(
    `/cdcStaff/statisticsDiagnosticAccuracy/JudgmentsPredictorNumber/${range}`
  );
  return response;
};
