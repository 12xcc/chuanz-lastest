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
        <h3>添加用户</h3>
        <div class="footer">
          <el-button @click="handleCancel">取消</el-button>
          <el-button @click="handleReset">重置</el-button>
          <el-button type="primary" @click="handleSubmit">提交</el-button>
        </div>
      </div>
      <el-form
        :model="form"
        label-width="155px"
        class="form-container"
        ref="form"
        :rules="rules"
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
            @blur="$refs.form.validateField('name')"
          ></el-input>
        </el-form-item>

        <!-- 性别 -->
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="form.gender">
            <el-radio value="男">男</el-radio>
            <el-radio value="女">女</el-radio>
          </el-radio-group>
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
            placeholder="请输入身份证号"
            @change="handleAge"
          ></el-input>
        </el-form-item>

        <!-- 年龄 -->
        <el-form-item label="年龄" prop="age">
          <el-input
            v-model="form.age"
            style="width: 200px"
            placeholder="根据身份证号生成"
          ></el-input>
        </el-form-item>

        <!-- 民族 -->
        <el-form-item label="民族" prop="ethnicity">
          <el-radio-group v-model="form.ethnicity">
            <el-radio value="汉族">汉族</el-radio>
            <el-radio value="藏族">藏族</el-radio>
            <el-radio value="彝族">彝族</el-radio>
            <el-radio value="其他少数民族">其他少数民族</el-radio>
          </el-radio-group>
        </el-form-item>

        <!-- 受教育程度 -->
        <el-form-item label="受教育程度" prop="EducationLevel">
          <el-radio-group v-model="form.EducationLevel">
            <el-radio value="小学及以下">小学及以下</el-radio>
            <el-radio value="初中">初中</el-radio>
            <el-radio value="中专/高中">中专/高中</el-radio>
            <el-radio value="大专/本科">大专/本科</el-radio>
            <el-radio value="硕士及以上">硕士及以上</el-radio>
          </el-radio-group>
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
          <el-radio-group
            v-model="form.SpecificOccupation"
            @change="SpecificOccupationChange"
          >
            <el-radio value="否">否</el-radio>
            <el-radio value="医务人员">医务人员</el-radio>
            <el-radio value="病原微生物检测人员">病原微生物检测人员</el-radio>
            <el-radio value="野生动物接触相关人员"
              >野生动物接触相关人员</el-radio
            >
            <el-radio value="家禽、家畜养殖人员">家禽、家畜养殖人员</el-radio>
          </el-radio-group>
          <el-form-item
            v-if="form.SpecificOccupation === '医务人员'"
            label="医务人员具体工作性质"
            class="yiwu"
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
            placeholder="手机"
          ></el-input>
        </el-form-item>

        <!-- 其他联系电话 -->
        <el-form-item label="其他联系电话" prop="OtherphoneNumber">
          <el-input
            style="width: 200px"
            v-model="form.OtherphoneNumber"
            placeholder="其他联系电话"
          ></el-input>
        </el-form-item>

        <!-- 紧急联系人姓名 -->
        <el-form-item label="紧急联系人姓名" prop="EmergencyContactname">
          <el-input
            style="width: 200px"
            v-model="form.EmergencyContactname"
            placeholder="姓名"
          ></el-input>
        </el-form-item>

        <!-- 紧急联系人电话 -->
        <el-form-item label="紧急联系人电话" prop="EmergencyContactphoneNumber">
          <el-input
            style="width: 200px"
            v-model="form.EmergencyContactphoneNumber"
            placeholder="联系电话"
          ></el-input>
        </el-form-item>

        <!-- 与其关系 -->
        <el-form-item label="与其关系" prop="EmergencyContactRelation">
          <el-input
            style="width: 200px"
            v-model="form.EmergencyContactRelation"
            placeholder="关系"
          ></el-input>
        </el-form-item>

        <!-- 既往病史和基本情况 -->
        <el-form-item label="既往病史和基本情况" prop="hasMedicalHistory">
          <el-radio-group
            v-model="form.hasMedicalHistory"
            @change="handleMedicalHistoryChange"
          >
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
              <el-checkbox
                v-model="form.hasMalignantTumor"
                @change="handleCancerChange"
                label="恶性肿瘤"
              >
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
          ></el-input>
        </el-form-item>

        <!-- 体重 -->
        <el-form-item label="体重(kg)" prop="Weight">
          <el-input
            v-model="form.Weight"
            style="width: 200px"
            placeholder="请输入体重"
          ></el-input>
        </el-form-item>

        <!-- 疫苗接种情况 -->
        <el-form-item label="疫苗接种情况">
          <el-checkbox v-model="form.IsVaccinatedForCOVID" value="新冠疫苗"
            >新冠疫苗</el-checkbox
          >
          <el-checkbox v-model="form.IsVaccinatedForFlu" value="流感疫苗"
            >流感疫苗</el-checkbox
          >
          <el-checkbox v-model="form.IsVaccinatedForPlague" value="鼠疫疫苗"
            >鼠疫疫苗</el-checkbox
          >
          <el-checkbox v-model="form.IsVaccinatedForBCG" value="卡介苗"
            >卡介苗</el-checkbox
          >
          <el-checkbox v-model="form.IsVaccinatedForHepatitis" value="肝炎疫苗"
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
import axiosInstance from "@/utils/axiosInstance.js";
// 导入封装的接口 暂时没用到
// import { addOneUser } from "@/api/user/alluser.js" 
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
        // CancerType: [], // 恶性肿瘤子选项（肺癌和其他）
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

      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        gender: [{ required: true, message: "请选择性别", trigger: "change" }],
        IDNumber: [
          { required: true, message: "请输入身份证号", trigger: "blur" },
          {
            pattern: /^[0-9]{17}[0-9Xx]$/,
            message: "身份证号格式不正确",
            trigger: "blur",
          },
        ],
        age: [
          { required: true, message: "请输入年龄", trigger: "blur" },
          { pattern: /^[0-9]+$/, message: "年龄必须为数字", trigger: "blur" },
        ],
        ethnicity: [
          { required: true, message: "请选择民族", trigger: "change" },
        ],
        EducationLevel: [
          { required: true, message: "请选择受教育程度", trigger: "change" },
        ],
        WorkStart: [
          { required: true, message: "请选择来高原工作时间", trigger: "blur" },
        ],
        department: [
          { required: true, message: "请选择部门/工种", trigger: "change" },
        ],
        SpecificOccupation: [
          {
            required: true,
            message: "请选择是否为特定职业",
            trigger: "change",
          },
        ],
        phoneNumber: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: "联系电话格式不正确",
            trigger: "blur",
          },
        ],
        OtherphoneNumber: [
          { required: false, message: "请输入其他联系电话", trigger: "blur" },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: "联系电话格式不正确",
            trigger: "blur",
          },
        ],
        hasMedicalHistory: [
          {
            required: true,
            message: "请选择是否有既往病史",
            trigger: "change",
          },
        ],
        IsPregnant: [
          { required: false, message: "请选择是否为孕妇", trigger: "change" },
        ],
        PregnancyWeeks: [
          { required: false, message: "请输入孕周", trigger: "blur" },
          { pattern: /^[0-9]+$/, message: "孕周必须为数字", trigger: "blur" },
        ],
        Height: [
          { required: false, message: "请输入身高", trigger: "blur" },
          { pattern: /^[0-9]+$/, message: "身高必须为数字", trigger: "blur" },
        ],
        Weight: [
          { required: false, message: "请输入体重", trigger: "blur" },
          { pattern: /^[0-9]+$/, message: "体重必须为数字", trigger: "blur" },
        ],
        OtherCancername: [
          {
            required: false,
            message: "请输入其他恶性肿瘤名称",
            trigger: "blur",
          },
        ],
        OtherDiseasesname: [
          { required: true, message: "请输入其他疾病名称", trigger: "blur" },
        ],
        SmokingStatus: [
          { required: true, message: "请选择吸烟史", trigger: "blur" },
        ],
        DrinkingStatus: [
          { required: true, message: "请选择饮酒史", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    showDrawer() {
      this.visible = true;
    },
    handleCancel() {
      this.visible = false;
      this.handleReset();
    },
    // 调用增加用户api
    handleSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          try {
            // 处理必要数据，构造请求体
            const requestData = {
              age: this.form.age,
              birthDate: this.form.BirthDate,
              department: this.form.department,
              drinkingStatus: this.form.DrinkingStatus,
              educationLevel: this.form.EducationLevel,
              emergencyContactname: this.form.EmergencyContactname,
              emergencyContactphoneNumber:
                this.form.EmergencyContactphoneNumber,
              emergencyContactRelation: this.form.EmergencyContactRelation,
              ethnicity: this.form.ethnicity,
              gender: this.form.gender,
              hasAsthma: this.form.hasAsthma,
              hasCOPD: this.form.hasCOPD,
              hasChronicKidneyDisease: this.form.hasChronicKidneyDisease,
              hasChronicLiverDisease: this.form.hasChronicLiverDisease,
              hasCoronaryHeartDisease: this.form.hasCoronaryHeartDisease,
              hasDiabetes: this.form.hasDiabetes,
              hasDustExposure: this.form.hasDustExposure,
              hasHepatitis: this.form.hasHepatitis,
              hasHyperlipidemia: this.form.hasHyperlipidemia,
              hasHypertension: this.form.hasHypertension,
              hasHyperuricemia: this.form.hasHyperuricemia,
              hasImmunodeficiency: this.form.hasImmunodeficiency,
              hasLungCancer: this.form.hasLungCancer,
              hasMalignantTumor: this.form.hasMalignantTumor,
              hasMedicalHistory: this.form.hasMedicalHistory,
              hasOccupationalDisease: this.form.hasOccupationalDisease,
              hasOtherCancer: this.form.hasOtherCancer,
              hasOtherCardiovascularDiseases:
                this.form.hasOtherCardiovascularDiseases,
              hasOtherDiseases: this.form.hasOtherDiseases,
              hasPepticUlcer: this.form.hasPepticUlcer,
              hasSevereMentalDisorders: this.form.hasSevereMentalDisorders,
              hasStroke: this.form.hasStroke,
              hasTuberculosis: this.form.hasTuberculosis,
              hasTyphus: this.form.hasTyphus,
              height: this.form.Height,
              idNumber: this.form.IDNumber,
              isActived: this.form.IsActived,
              isPostpartumInSixWeeks: this.form.IsPostpartumInSixWeeks,
              isPregnant: this.form.IsPregnant,
              isVaccinatedForBCG: this.form.IsVaccinatedForBCG,
              isVaccinatedForCOVID: this.form.IsVaccinatedForCOVID,
              isVaccinatedForFlu: this.form.IsVaccinatedForFlu,
              isVaccinatedForHepatitis: this.form.IsVaccinatedForHepatitis,
              isVaccinatedForPlague: this.form.IsVaccinatedForPlague,
              medicalPersonnelType: this.form.MedicalPersonnelType,
              name: this.form.name,
              otherCancername: this.form.OtherCancername,
              otherDiseasesname: this.form.OtherDiseasesname,
              otherphoneNumber: this.form.OtherphoneNumber,
              otherPositionname: this.form.OtherPositionname,
              phoneNumber: this.form.phoneNumber,
              pregnancyWeeks: this.form.PregnancyWeeks,
              smokingStatus: this.form.SmokingStatus,
              specificOccupation: this.form.SpecificOccupation,
              userType: this.form.userType,
              weight: this.form.Weight,
              workOnPlateauStartDate: this.form.WorkOnPlateauStartDate,
            };

            // 直接调接口提交用户信息
            const response = await axiosInstance.post(
              "/admin/userManager/addOneUser",
              requestData,
              {
                headers: {
                  "Content-Type": "application/json", // 请求头
                },
              }
            );
            // 调封装的接口
            // const response = await addOneUser(requestData);
            // 判断响应 
            if (response.data.code === 1) {
              ElMessage({
                message: "提交成功",
                type: "success",
              });
              this.visible = false; // 关闭弹窗
            } else {
              ElMessage({
                message: "提交失败：" + response.data.msg,
                type: "error",
              });
            }
          } catch (error) {
            console.error("提交出错:", error);
            ElMessage({
              message: "提交出错，请重试",
              type: "error",
            });
          }
        } else {
          console.log("表单验证失败");
          ElMessage({
            message: "提交失败，表单验证未通过",
            type: "error",
          });
        }
      });
    },

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
  if (
    birthDate.getFullYear() !== birthYear ||
    birthDate.getMonth() !== birthMonth ||
    birthDate.getDate() !== birthDay
  ) {
    this.form.age = "身份证号中出生日期无效";
    return;
  }

  // 验证校验码
  const weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  const checkCodes = "10X98765432";
  const sum = idNumber
    .slice(0, 17)
    .split("")
    .reduce((acc, num, index) => acc + parseInt(num) * weights[index], 0);
  const calculatedCheckCode = checkCodes[sum % 11];
  if (calculatedCheckCode !== idNumber[17].toUpperCase()) {
    this.form.age = "身份证号有误";
    return;
  }

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
},
    handleMedicalHistoryChange() {
      if (!this.form.hasMedicalHistory) {
        // 如果选择“无”，清空所有疾病选项
        this.clearAllDiseases();
      }
    },
    handleCancerChange() {
      if (!this.form.hasMalignantTumor) {
        // 清空癌症相关选项
        this.clearCancerFields();
      }
    },
    SpecificOccupationChange() {
      if (this.form.SpecificOccupation == "否") {
        this.form.MedicalPersonnelType = "";
      }
    },
    clearAllDiseases() {
      this.form.hasHypertension = false;
      this.form.hasDiabetes = false;
      this.form.hasHyperlipidemia = false;
      this.form.hasHyperuricemia = false;
      this.form.hasCoronaryHeartDisease = false;
      this.form.hasStroke = false;
      this.form.hasOtherCardiovascularDiseases = false;
      this.form.hasAsthma = false;
      this.form.hasCOPD = false;
      this.form.hasPepticUlcer = false;
      this.form.hasMalignantTumor = false;
      this.clearCancerFields();
      this.form.hasSevereMentalDisorders = false;
      this.form.hasTuberculosis = false;
      this.form.hasHepatitis = false;
      this.form.hasOccupationalDisease = false;
      this.form.hasChronicKidneyDisease = false;
      this.form.hasChronicLiverDisease = false;
      this.form.hasImmunodeficiency = false;
      this.form.hasTyphus = false;
      this.form.IsPostpartumInSixWeeks = false;
      this.form.hasDustExposure = false;
      this.form.hasOtherDiseases = false;
    },
    clearCancerFields() {
      this.form.hasLungCancer = false;
      this.form.hasOtherCancer = false;
      this.form.OtherCancername = "";
    },
    handleReset() {
      this.form = this.getInitialForm();
      this.message = "";
    },
    getInitialForm() {
      return {
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
        // CancerType: [], // 恶性肿瘤子选项（肺癌和其他）
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
      };
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
  padding: 3px;
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
