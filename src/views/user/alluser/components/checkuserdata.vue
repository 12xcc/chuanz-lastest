<template>
  <el-drawer
    :model-value="visible"
    direction="rtl"
    size="700px"
    :with-header="false"
    custom-class="custom-drawer"
    @close="handleCancel"
  >
    <div class="container">
      <div class="title">
        <h3>查看用户</h3>
        <!-- <div class="footer">
          <el-button @click="handleCancel">取消</el-button>
          <el-button @click="handleReset">重置</el-button>
          <el-button type="primary" @click="handleSubmit">提交</el-button>
        </div> -->
      </div>
      <el-form
        :model="form"
        label-width="155px"
        class="form-container"
        ref="form"
        :rules="rules"
        disabled
      >
        <!-- 用户类型 -->
        <el-form-item label="用户类型" prop="userType" size="default">
          <el-select
            v-model="form.userType"
            placeholder="请选择用户类型"
            clearable
            size="default"
            style="width: 200px"
          >
            <el-option :key="1" label="系统管理员" :value="1"></el-option>
            <el-option :key="2" label="铁路职工" :value="2"></el-option>
            <el-option :key="3" label="疾控中心工作人员" :value="3"></el-option>
            <el-option :key="4" label="专职医护" :value="4"></el-option>
          </el-select>
        </el-form-item>

        <!-- 姓名 -->
        <el-form-item label="姓名" prop="name">
          <el-input
            v-model="form.name"
            style="width: 200px"
            placeholder="请输入姓名"
            clearable
            @blur="$refs.form.validateField('name')"
          ></el-input>
        </el-form-item>

        <!-- 性别 -->
        <el-form-item label="性别" prop="gender">
          <el-input v-model="form.gender" style="width: 200px"> </el-input>
        </el-form-item>

        <!-- 是否为孕妇 -->
        <el-form-item
          v-if="form.gender === '女'"
          label="是否为孕妇"
          prop="IsPregnant"
        >
          <el-radio-group v-model="form.IsPregnant">
            <el-radio :value="true">是</el-radio>
            <el-radio :value="false">否</el-radio>
          </el-radio-group>
          <el-form-item v-if="form.IsPregnant === true" label="孕周">
            <el-input
              v-model="form.PregnancyWeeks"
              placeholder="孕周"
              style="width: 100px"
            ></el-input>
          </el-form-item>
        </el-form-item>

        <!-- 身份证号 -->
        <el-form-item label="身份证号" prop="IDNumber">
          <el-input
            v-model="form.IDNumber"
            style="width: 200px"
            clearable
            placeholder="身份证号"
            @blur="handleAge"
          ></el-input>
        </el-form-item>

        <!-- 年龄 -->
        <el-form-item label="年龄" prop="age">
          <el-input
            v-model="form.age"
            style="width: 200px"
            placeholder=""
            clearable
          ></el-input>
        </el-form-item>

        <!-- 民族 -->
        <el-form-item label="民族" prop="ethnicity">
          <el-input v-model="form.ethnicity" style="width: 200px"> </el-input>
        </el-form-item>

        <!-- 受教育程度 -->
        <el-form-item label="受教育程度" prop="EducationLevel">
          <el-input v-model="form.EducationLevel" style="width: 200px">
          </el-input>
        </el-form-item>

        <!-- 来高原工作时间 -->
        <el-form-item
          label="来高原工作时间"
          style="display: flex; align-items: center"
          prop="WorkOnPlateauStartDate"
        >
          <div style="flex: 1">
            <el-date-picker
              type="date"
              placeholder=""
              value-format="YYYY-MM-DD"
              v-model="form.WorkOnPlateauStartDate"
              style="width: 200px"
            />
          </div>
        </el-form-item>

        <!-- 部门/工种 -->
        <el-form-item label="部门/工种" prop="department">
          <el-radio-group v-model="form.department">
            <el-radio value="安全部">安全部</el-radio>
            <el-radio value="财务部">财务部</el-radio>
            <el-radio value="测量队">测量队</el-radio>
            <el-radio value="工程技术部">工程技术部</el-radio>
            <el-radio value="合约部">合约部</el-radio>
            <el-radio value="试验室">试验室</el-radio>
            <el-radio value="物资设备部">物资设备部</el-radio>
            <el-radio value="项目管理层">项目管理层</el-radio>
            <el-radio value="征拆协调部">征拆协调部</el-radio>
            <el-radio value="综合管理部">综合管理部</el-radio>
          </el-radio-group>
        </el-form-item>

        <!-- 是否为特定职业人群 -->
        <el-form-item label="是否为特定职业人群" prop="SpecificOccupation">
          <el-radio-group v-model="form.SpecificOccupation">
            <el-radio value="否">否</el-radio>
            <el-radio value="医务人员">医务人员</el-radio>
            <el-radio value="病原微生物检测人员">病原微生物检测人员</el-radio>
            <el-radio value="野生动物接触相关人员"
              >野生动物接触相关人员</el-radio
            >
            <el-radio value="家禽、家畜养殖人员">家禽、家畜养殖人员</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          v-if="form.SpecificOccupation === '医务人员'"
          label="医务人员具体工作性质"
          prop="MedicalPersonnelType"
        >
          <el-radio-group v-model="form.MedicalPersonnelType">
            <el-radio value="医生">医生</el-radio>
            <el-radio value="护士">护士</el-radio>
            <el-radio value="疾控现场工作人员">疾控现场工作人员</el-radio>
            <el-radio value="实验室检测人员">实验室检测人员</el-radio>
            <el-radio value="其他">其他</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          v-if="form.MedicalPersonnelType === '其他'"
          label="其他工作性质名称"
          prop="OtherPositionname"
        >
          <el-input v-model="form.OtherPositionname" style="width: 200px" />
        </el-form-item>

        <!-- 联系电话 -->
        <el-form-item label="联系电话" prop="phoneNumber">
          <el-input
            style="width: 200px"
            v-model="form.phoneNumber"
            placeholder="无"
            clearable
          ></el-input>
        </el-form-item>

        <!-- 其他联系电话 -->
        <el-form-item label="其他联系电话" prop="OtherphoneNumber">
          <el-input
            style="width: 200px"
            v-model="form.OtherphoneNumber"
            placeholder="无"
            clearable
          ></el-input>
        </el-form-item>

        <!-- 紧急联系人姓名 -->
        <el-form-item label="紧急联系人姓名" prop="EmergencyContactname">
          <el-input
            style="width: 200px"
            v-model="form.EmergencyContactname"
            placeholder="无"
            clearable
          ></el-input>
        </el-form-item>

        <!-- 紧急联系人电话 -->
        <el-form-item label="紧急联系人电话" prop="EmergencyContactphoneNumber">
          <el-input
            style="width: 200px"
            v-model="form.EmergencyContactphoneNumber"
            placeholder="无"
            clearable
          ></el-input>
        </el-form-item>

        <!-- 与其关系 -->
        <el-form-item label="与其关系" prop="EmergencyContactRelation">
          <el-input
            style="width: 200px"
            v-model="form.EmergencyContactRelation"
            placeholder="无"
            clearable
          ></el-input>
        </el-form-item>

        <!-- 既往病史和基本情况 -->
        <el-form-item label="既往病史和基本情况" prop="hasMedicalHistory">
          <el-radio-group v-model="form.hasMedicalHistory">
            <el-radio :value="true">有</el-radio>
            <el-radio :value="false">无</el-radio>
          </el-radio-group>

          <!-- 当选择“有”时，显示疾病选项 -->
          <div v-if="form.hasMedicalHistory">
            <el-checkbox v-model="form.hasHypertension" label="高血压"
              >高血压</el-checkbox
            >
            <el-checkbox v-model="form.hasDiabetes" label="糖尿病"
              >糖尿病</el-checkbox
            >
            <el-checkbox v-model="form.hasHyperlipidemia" label="高脂血症"
              >高脂血症</el-checkbox
            >
            <el-checkbox v-model="form.hasHyperuricemia" label="高尿酸"
              >高尿酸</el-checkbox
            >
            <el-checkbox v-model="form.hasCoronaryHeartDisease" label="冠心病"
              >冠心病</el-checkbox
            >
            <el-checkbox v-model="form.hasStroke" label="脑卒中"
              >脑卒中</el-checkbox
            >
            <el-checkbox
              v-model="form.hasOtherCardiovascularDiseases"
              label="其他心脑血管疾病"
              >其他心脑血管疾病</el-checkbox
            >
            <el-checkbox v-model="form.hasAsthma" label="哮喘"
              >哮喘</el-checkbox
            >
            <el-checkbox v-model="form.hasCOPD" label="慢性阻塞性肺部疾病"
              >慢性阻塞性肺部疾病</el-checkbox
            >
            <el-checkbox v-model="form.hasPepticUlcer" label="消化性溃疡"
              >消化性溃疡</el-checkbox
            >

            <!-- 恶性肿瘤 -->
            <el-form-item>
              <el-checkbox v-model="form.hasMalignantTumor" label="恶性肿瘤">
                恶性肿瘤
              </el-checkbox>
              <!-- 恶性肿瘤子选项 -->
              <div v-if="form.hasMalignantTumor" class="othercancer">
                <el-checkbox v-model="form.hasLungCancer" label="肺癌"
                  >肺癌</el-checkbox
                >
                <el-checkbox v-model="form.hasOtherCancer" label="其他"
                  >其他</el-checkbox
                >
                <!-- 其他恶性肿瘤请输入框 -->
                <el-input
                  v-if="form.hasOtherCancer"
                  v-model="form.OtherCancername"
                  placeholder="请输入其他恶性肿瘤"
                  clearable
                  prop="OtherCancername"
                ></el-input>
              </div>
            </el-form-item>

            <!-- 其他疾病选项 -->
            <el-checkbox
              v-model="form.hasSevereMentalDisorders"
              label="严重精神障碍"
              >严重精神障碍</el-checkbox
            >
            <el-checkbox v-model="form.hasTuberculosis" label="结核病"
              >结核病</el-checkbox
            >
            <el-checkbox v-model="form.hasHepatitis" label="肝炎"
              >肝炎</el-checkbox
            >
            <el-checkbox v-model="form.hasOccupationalDisease" label="职业病"
              >职业病</el-checkbox
            >
            <el-checkbox v-model="form.hasChronicKidneyDisease" label="慢性肾病"
              >慢性肾病</el-checkbox
            >
            <el-checkbox v-model="form.hasChronicLiverDisease" label="慢性肝病"
              >慢性肝病</el-checkbox
            >
            <el-checkbox
              v-model="form.hasImmunodeficiency"
              label="免疫缺陷类疾病"
              >免疫缺陷类疾病</el-checkbox
            >
            <el-checkbox v-model="form.hasTyphus" label="斑疹伤寒"
              >斑疹伤寒</el-checkbox
            >
            <el-checkbox
              v-model="form.IsPostpartumInSixWeeks"
              label="产后（6周以内）"
              >产后（6周以内）</el-checkbox
            >
            <el-checkbox v-model="form.hasDustExposure" label="粉尘接触史"
              >粉尘接触史</el-checkbox
            >
            <el-checkbox v-model="form.hasOtherDiseases" label="其他"
              >其他</el-checkbox
            >
          </div>
        </el-form-item>

        <!-- 吸烟史 -->
        <el-form-item label="吸烟史" prop="SmokingStatus">
          <el-radio-group v-model="form.SmokingStatus">
            <el-radio value="现在吸">现在吸</el-radio>
            <el-radio value="以前吸">以前吸</el-radio>
            <el-radio value="从不吸">从不吸</el-radio>
          </el-radio-group>
        </el-form-item>

        <!-- 饮酒史 -->
        <el-form-item label="饮酒史" prop="DrinkingStatus">
          <el-radio-group v-model="form.DrinkingStatus">
            <el-radio value="不喝酒">不喝酒</el-radio>
            <el-radio value="偶尔喝酒（小于3次/周）"
              >偶尔喝酒（小于3次/周）</el-radio
            >
            <el-radio value="经常喝酒（大于等于3次/周）"
              >经常喝酒（大于等于3次/周）</el-radio
            >
            <el-radio value="经常大量喝酒（白酒≥3次/周，每次≥2两）"
              >经常大量喝酒（白酒≥3次/周，每次≥2两）</el-radio
            >
          </el-radio-group>
        </el-form-item>

        <!-- 身高 -->
        <el-form-item label="身高(cm)" prop="Height">
          <el-input
            v-model="form.Height"
            style="width: 200px"
            placeholder="请输入身高"
            clearable
          ></el-input>
        </el-form-item>

        <!-- 体重 -->
        <el-form-item label="体重(kg)" prop="Weight">
          <el-input
            v-model="form.Weight"
            style="width: 200px"
            placeholder="请输入体重"
            clearable
          ></el-input>
        </el-form-item>

        <!-- 疫苗接种情况 -->
        <el-form-item label="疫苗接种情况">
          <el-checkbox v-model="form.IsVaccinatedForCOVID" label="新冠疫苗"
            >新冠疫苗</el-checkbox
          >
          <el-checkbox v-model="form.IsVaccinatedForFlu" label="流感疫苗"
            >流感疫苗</el-checkbox
          >
          <el-checkbox v-model="form.IsVaccinatedForPlague" label="鼠疫疫苗"
            >鼠疫疫苗</el-checkbox
          >
          <el-checkbox v-model="form.IsVaccinatedForBCG" label="卡介苗"
            >卡介苗</el-checkbox
          >
          <el-checkbox v-model="form.IsVaccinatedForHepatitis" label="肝炎疫苗"
            >肝炎疫苗</el-checkbox
          >
        </el-form-item>
      </el-form>
    </div>
  </el-drawer>
</template>

<script>
import { ElMessage } from "element-plus";
import Dateselection from "@/components/date.vue";
import { fetchUserInfoById } from "@/api/user/alluser.js"; // 引入封装好的接口方法

export default {
  components: {
    Dateselection,
  },
  data() {
    return {
      visible: false, // 控制弹窗显示
      form: {
        userType: null, // 用户类型
        name: null, // 姓名
        gender: null, // 性别
        IsPregnant: false, // 是否怀孕
        PregnancyWeeks: null, // 怀孕周数
        IDNumber: null, // 身份证号
        age: null, // 年龄
        ethnicity: null, // 民族
        EducationLevel: null, // 文化程度
        WorkOnPlateauStartDate: null, //高原工作时间
        department: null, // 部门/工种
        SpecificOccupation: null, // 具体职业
        MedicalPersonnelType: null, // 医护人员类型
        OtherPositionname: null, //其他名称
        phoneNumber: null, // 手机号码
        OtherphoneNumber: null, // 其他电话号码
        EmergencyContactname: null, // 紧急联系人姓名
        EmergencyContactphoneNumber: null, // 紧急联系人电话
        EmergencyContactRelation: null, // 紧急联系人关系

        // 既往病史字段
        hasMedicalHistoryRadio: null, // 是否有既往病史（“有”或“无”）
        hasMedicalHistory: false, // 既往病史疾病选项
        hasHypertension: false, // 高血压
        hasDiabetes: false, // 糖尿病
        hasHyperlipidemia: false, // 高脂血症
        hasHyperuricemia: false, // 高尿酸
        hasCoronaryHeartDisease: false, // 冠心病
        hasStroke: false, // 脑卒中
        hasOtherCardiovascularDiseases: false, // 其他心脑血管疾病
        hasAsthma: false, // 哮喘
        hasCOPD: false, // 慢性阻塞性肺疾病
        hasPepticUlcer: false, // 消化性溃疡
        hasMalignantTumor: false, // 恶性肿瘤
        hasLungCancer: false, // 肺癌
        hasOtherCancer: false, // 其他癌症
        OtherCancername: null, // 其他恶性肿瘤名称
        hasSevereMentalDisorders: false, // 严重精神障碍
        hasTuberculosis: false, // 结核病
        hasHepatitis: false, // 肝炎
        hasOccupationalDisease: false, // 职业病
        hasChronicKidneyDisease: false, // 慢性肾病
        hasChronicLiverDisease: false, // 慢性肝病
        hasImmunodeficiency: false, // 免疫缺陷类疾病
        hasTyphus: false, // 斑疹伤寒
        IsPostpartumInSixWeeks: false, // 产后6周以内
        hasDustExposure: false, // 粉尘接触史
        hasOtherDiseases: false, // 有其他疾病
        OtherDiseasesname: null, // 其他疾病名称

        SmokingStatus: null, // 吸烟史
        DrinkingStatus: null, // 饮酒史
        Height: null, // 身高
        Weight: null, // 体重
        IsVaccinatedForCOVID: false,
        IsVaccinatedForFlu: false,
        IsVaccinatedForPlague: false,
        IsVaccinatedForBCG: false,
        IsVaccinatedForHepatitis: false,
      },

      rules: {},
    };
  },
  methods: {
    showDrawer(userId) {
      this.visible = true;
      this.fetchUserInfo(userId);
    },

    // 根据id获取用户信息
    async fetchUserInfo(userId) {
      try {
        const response = await fetchUserInfoById(userId);

        if (response.data.code === 1) {
          const data = response.data.data;

          // 映射数据到表单中
          this.form.userType = data.userType; // 用户类型
          this.form.name = data.name; // 姓名
          this.form.age = data.age; // 年龄
          this.form.gender = data.gender; // 性别
          this.form.IsPregnant = data.isPregnant; // 是否怀孕
          this.form.PregnancyWeeks = data.pregnancyWeeks; // 怀孕周数
          this.form.IDNumber = data.idNumber; // 身份证号
          this.form.ethnicity = data.ethnicity; // 民族
          this.form.EducationLevel = data.educationLevel; // 文化程度
          this.form.department = data.department; // 部门/工种
          this.form.SpecificOccupation = data.specificOccupation; // 具体职业
          this.form.MedicalPersonnelType = data.medicalPersonnelType; // 医务人员具体工作性质
          this.form.OtherPositionname = data.otherPositionname;
          this.form.phoneNumber = data.phoneNumber; // 手机号码
          this.form.OtherphoneNumber = data.otherphoneNumber; // 其他电话号码
          this.form.EmergencyContactname = data.emergencyContactname; // 紧急联系人姓名
          this.form.EmergencyContactphoneNumber =
            data.emergencyContactphoneNumber; // 紧急联系人电话
          this.form.EmergencyContactRelation = data.emergencyContactRelation; // 紧急联系人关系
          this.form.Height = data.height; // 身高
          this.form.Weight = data.weight; // 体重

          // 格式化 WorkOnPlateauStartDate
          if (
            data.workOnPlateauStartDate &&
            data.workOnPlateauStartDate.length === 3
          ) {
            const [year, month, day] = data.workOnPlateauStartDate;
            this.form.WorkOnPlateauStartDate = `${year}-${String(
              month
            ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          } else {
            this.form.WorkOnPlateauStartDate = "";
          }

          // 既往病史映射
          this.form.hasMedicalHistory = data.hasMedicalHistory;
          this.form.hasHypertension = data.hasHypertension;
          this.form.hasDiabetes = data.hasDiabetes;
          this.form.hasHyperlipidemia = data.hasHyperlipidemia;
          this.form.hasHyperuricemia = data.hasHyperuricemia;
          this.form.hasCoronaryHeartDisease = data.hasCoronaryHeartDisease;
          this.form.hasStroke = data.hasStroke;
          this.form.hasAsthma = data.hasAsthma;
          this.form.hasCOPD = data.hasCOPD;
          this.form.hasMalignantTumor = data.hasMalignantTumor;
          this.form.hasLungCancer = data.hasLungCancer;
          this.form.hasOtherCancer = data.hasOtherCancer;
          this.form.hasOtherDiseases = data.hasOtherDiseases;
          this.form.OtherDiseasesname = data.otherDiseasesname; // 其他疾病名称

          this.form.IsVaccinatedForCOVID = data.isVaccinatedForCOVID;
          this.form.IsVaccinatedForFlu = data.isVaccinatedForFlu;
          this.form.IsVaccinatedForPlague = data.isVaccinatedForPlague;
          this.form.IsVaccinatedForBCG = data.isVaccinatedForBCG;
          this.form.IsVaccinatedForHepatitis = data.isVaccinatedForHepatitis;

          this.form.SmokingStatus = data.smokingStatus; // 吸烟史
          this.form.DrinkingStatus = data.drinkingStatus; // 饮酒史
        } else {
          console.error("获取用户信息失败:", response.data.msg);
        }
      } catch (error) {
        console.error("请求出错:", error);
      }
    },

    handleCancel() {
      this.visible = false;
    },

    // 根据当前年份动态修改年龄 待修改
    handleAge() {
      const idNumber = this.form.IDNumber;
      // 长度必须为18位
      if (idNumber.length !== 18) {
        this.form.age = "身份证号格式不正确";
        return;
      }

      // 验证生日格式
      const birthYear = parseInt(idNumber.slice(6, 10));
      const birthMonth = parseInt(idNumber.slice(10, 12)) - 1;
      const birthDay = parseInt(idNumber.slice(12, 14));

      const birthDate = new Date(birthYear, birthMonth, birthDay);

      // 计算年龄
      const today = new Date();
      let age = today.getFullYear() - birthYear;
      if (
        today.getMonth() < birthMonth ||
        (today.getMonth() === birthMonth && today.getDate() < birthDay)
      ) {
        age--;
      }
      this.form.age = age;
      console.log(this.form.age);
    },

    handleSubmit() {
      console.log("触发");
      this.$refs.form.validate((valid) => {
        console.log("Form is valid:", valid);
        if (valid) {
          console.log("Form data:", this.form);
          this.visible = false;
          ElMessage({
            message: "提交成功",
            type: "success",
          });
        } else {
          console.log("表单验证失败");
          ElMessage({
            message: "提交失败",
            type: "error",
          });
          return false;
        }
      });
    },
  },
};
</script>




<style scoped>
.custom-drawer {
  height: 100%;
}
.form-container {
  padding: 20px;
  margin-top: 70px;
}
.title {
  position: fixed;
  top: 0;
  right: 0;
  width: 700px;
  background: #ffffff;
  padding-bottom: 20px;
  z-index: 100;
  border: 3px solid #fafafa;
}

.footer {
  display: flex;
  justify-content: flex-end;
  margin-top: -25px;
  margin-right: 10px;
  margin-bottom: 20px;
}
h3 {
  margin-top: 20px;
  font-size: 16px;
  color: #333333;
  margin-left: 30px;
}
.custom-input {
  margin-bottom: 10px;
}
.el-dropdown-link:focus {
  outline: none;
}
.othercancer {
  margin-left: 20px;
}
.yiwu {
  margin-top: 10px;
  margin-left: -120px;
}
</style>
