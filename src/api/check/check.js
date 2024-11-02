import axiosInstance from "@/utils/axiosInstance.js";

// 根据用户名，电话，部门，时间分页查询用户检查信息
export const pageSelectLabTest = async (data) => {
  const response = await axiosInstance.post(
    "/medicalStaff/labTestManager/pageSelectLabTest",
    data
  );
  return response;
};

// 导出检测信息导出表
export const getDetectionInformationExportFormExcel = async () => {
  const response = await axiosInstance.get(
    "/medicalStaff/labTestManager/getDetectionInformationExportFormExcel",
    { responseType: "blob" }
  );
  return response;
};

// 根据用户名，性别，联系电话，年龄查找对应用户信息
export const getUserByBaseInfo = async (data) => {
  const response = await axiosInstance.post(
    "/medicalStaff/labTestManager/getUserByBaseInfo",
    data
  );
  return response;
};

// 添加检查信息
export const saveLabTestReport = async (data,userId) => {
  const response = await axiosInstance.post(
    "/medicalStaff/labTestManager/saveLabTestReport",
    data,
    {
      params: {
        userId: userId, // 请求头中传递 userId
      },
    }
  );
  return response;
};

// 根据诊断ID查询检查信息
export const selectLabTest = async (labTestReportID) => {
  const response = await axiosInstance.get(
    `/medicalStaff/labTestManager/selectLabTest/${labTestReportID}`
  );
  return response;
};

// 上传文件通用接口
export const saveLabTestFile = (formData) => {
  return axios.post('/common/file/saveLabTestFile', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};


// 根据检查文件id获取检查文件
export const getLabTestFile = async (labTestId) => {
  const response = await axiosInstance.get(
    `/common/file/getLabTestFile/${labTestId}`,
    { responseType: "blob" }
  );
  return response;
};

// 根据id更新检查信息
export const updateLabTest = async (data) => {
  const response = await axiosInstance.post(
    "/medicalStaff/labTestManager/updateLabTest",
    data
  );
  return response;
};