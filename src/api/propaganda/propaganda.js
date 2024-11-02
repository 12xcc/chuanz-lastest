import axiosInstance from "@/utils/axiosInstance.js";

// 获取用户列表
export const pageSelectDiseaseLearningMaterials = async (params) => {
  const response = await axiosInstance.post("/cdcStaff/promotionalMaterialsManager/pageSelectDiseaseLearningMaterials", 
    params,
    {
        headers: {
          'Content-Type': 'application/json', 
        },
    }
  );
  return response;
};

// 切换材料状态
export const startOrStopMaterial = async (materialId, isDelete) => {
  const response = await axiosInstance.put("/cdcStaff/promotionalMaterialsManager/startOrStopMaterial", 
    null,
    {
      params: { materialId, isDelete }, // 传递参数
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response;
};

// 根据id获取宣传材料
export const getMaterialById = async (materialId) => {
  const response = await axiosInstance.get(
    `/cdcStaff/promotionalMaterialsManager/getMaterialById/${materialId}`,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return response;
};

// 根据文件名获取疾病宣传资料文件
export const getLearningMaterialFile = async (filename) => {
  const baseUrl = "http://43.138.213.55:8080";
  const response = await axiosInstance.get(
    `${baseUrl}/common/file/getLearningMaterialFile/${filename}`,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      }
    }
  );
  return response;
};

// 添加宣传材料
export const saveMaterial = async (data) => {
  const response = await axiosInstance.post(
    "/cdcStaff/promotionalMaterialsManager/saveMaterial",
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response;
};