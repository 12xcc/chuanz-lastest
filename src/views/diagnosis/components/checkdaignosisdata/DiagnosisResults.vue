<template>
  <div class="container">
    <el-form
      :model="form"
      label-width="160px"
      class="form-container"
      ref="form"
      :rules="rules"
      label-position="left"
      :disabled="allDisabled"  
    >
      <div class="GeneralSymptoms">
        <div class="Condition">

        <div class="title-container">
          <div class="blue-box"></div>
          <span class="title-text">诊断日期</span>
        </div>

        <div class="discoveryMethod">
          <!-- 提交日期-->
          <el-form-item label="诊断日期" prop="diagnosisDate" style="margin-left: 20px">
            <el-date-picker
              format="YYYY-MM-DD"
              v-model="form.diagnosisDate"
              type="date"             
              placeholder=""
              clearable
              :disabled="allDisabled"
            ></el-date-picker>
          </el-form-item>
        </div>

          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">确诊疾病</span>
          </div>
          <el-check-tag
            :checked="form.diseaseType === '新型冠状病毒感染'"
            type="primary"
            @change="toggleDisease('新型冠状病毒感染')"
            :disabled="allDisabled"  
          >
            新型冠状病毒感染
          </el-check-tag>
          <el-check-tag
            :checked="form.diseaseType === '流感'"
            type="primary"
            @change="toggleDisease('流感')"
            :disabled="allDisabled"  
          >
            流感
          </el-check-tag>
          <div>
            <el-check-tag
              :checked="form.diseaseType === '鼠疫'"
              type="primary"
              @change="toggleDisease('鼠疫')"
              :disabled="allDisabled"  
            >
              鼠疫
            </el-check-tag>

            <div
              v-if="form.diseaseType === '鼠疫'"
              class="plagueSubtype"
              style="margin-left: 20px"
            >
              <el-check-tag
                :checked="form.plagueSubtype === '腺鼠疫'"
                type="primary"
                @change="togglePlagueSubtype('腺鼠疫')"
                :disabled="allDisabled"  
              >
                腺鼠疫
              </el-check-tag>
              <el-check-tag
                :checked="form.plagueSubtype === '肺鼠疫'"
                type="primary"
                @change="togglePlagueSubtype('肺鼠疫')"
                :disabled="allDisabled"  
              >
                肺鼠疫
              </el-check-tag>
              <el-check-tag
                :checked="form.plagueSubtype === '败血型鼠疫'"
                type="primary"
                @change="togglePlagueSubtype('败血型鼠疫')"
                :disabled="allDisabled"  
              >
                败血型鼠疫
              </el-check-tag>
              <el-check-tag
                :checked="form.plagueSubtype === '肠鼠疫'"
                type="primary"
                @change="togglePlagueSubtype('肠鼠疫')"
                :disabled="allDisabled"  
              >
                肠鼠疫
              </el-check-tag>
              <el-check-tag
                :checked="form.plagueSubtype === '眼鼠疫'"
                type="primary"
                @change="togglePlagueSubtype('眼鼠疫')"
                :disabled="allDisabled"  
              >
                眼鼠疫
              </el-check-tag>
              <el-check-tag
                :checked="form.plagueSubtype === '皮肤鼠疫'"
                type="primary"
                @change="togglePlagueSubtype('皮肤鼠疫')"
                :disabled="allDisabled"  
              >
                皮肤鼠疫
              </el-check-tag>
              <el-check-tag
                :checked="form.plagueSubtype === '脑鼠疫'"
                type="primary"
                @change="togglePlagueSubtype('脑鼠疫')"
                :disabled="allDisabled"  
              >
                脑鼠疫
              </el-check-tag>
            </div>
          </div>

          <el-check-tag
            :checked="form.diseaseType === '感染性腹泻'"
            type="primary"
            @change="toggleDisease('感染性腹泻')"
            :disabled="allDisabled"  
          >
            感染性腹泻
          </el-check-tag>
          <div>
            <el-check-tag
              :checked="form.diseaseType === '炭疽'"
              type="primary"
              @change="toggleDisease('炭疽')"
              :disabled="allDisabled"  
            >
              炭疽
            </el-check-tag>
            <div v-if="form.diseaseType === '炭疽'" style="margin-left: 20px">
              <el-check-tag
                :checked="form.anthraxSubtype === '皮肤炭疽'"
                type="primary"
                @change="toggleAnthraxSubtype('皮肤炭疽')"
                :disabled="allDisabled"  
              >
                皮肤炭疽
              </el-check-tag>
              <el-check-tag
                :checked="form.anthraxSubtype === '肠炭疽'"
                type="primary"
                @change="toggleAnthraxSubtype('肠炭疽')"
                :disabled="allDisabled"  
              >
                肠炭疽
              </el-check-tag>
              <el-check-tag
                :checked="form.anthraxSubtype === '肺炭疽'"
                type="primary"
                @change="toggleAnthraxSubtype('肺炭疽')"
                :disabled="allDisabled"  
              >
                肺炭疽
              </el-check-tag>
              <el-check-tag
                :checked="form.anthraxSubtype === '脑膜炎型炭疽'"
                type="primary"
                @change="toggleAnthraxSubtype('脑膜炎型炭疽')"
                :disabled="allDisabled"  
              >
                脑膜炎型炭疽
              </el-check-tag>
              <el-check-tag
                :checked="form.anthraxSubtype === '败血症型炭疽'"
                type="primary"
                @change="toggleAnthraxSubtype('败血症型炭疽')"
                :disabled="allDisabled"  
              >
                败血症型炭疽
              </el-check-tag>
            </div>
          </div>
          <el-check-tag
            :checked="form.diseaseType === '结核病'"
            type="primary"
            @change="toggleDisease('结核病')"
            :disabled="allDisabled"  
          >
            结核病
          </el-check-tag>
          <el-check-tag
            :checked="form.diseaseType === '登革热（蚊媒传染病）'"
            type="primary"
            @change="toggleDisease('登革热（蚊媒传染病）')"
            :disabled="allDisabled"  
          >
            登革热（蚊媒传染病）
          </el-check-tag>
          <el-check-tag
            :checked="form.diseaseType === '疟疾（蚊媒传染病）'"
            type="primary"
            @change="toggleDisease('疟疾（蚊媒传染病）')"
            :disabled="allDisabled"  
          >
            疟疾（蚊媒传染病）
          </el-check-tag>
          <el-check-tag
            :checked="form.diseaseType === '森林脑炎（蜱媒传染病）'"
            type="primary"
            @change="toggleDisease('森林脑炎（蜱媒传染病）')"
            :disabled="allDisabled"  
          >
            森林脑炎（蜱媒传染病）
          </el-check-tag>
          <el-check-tag
            :checked="
              form.diseaseType === '发热伴血小板减少综合征（蜱媒传染病）'
            "
            type="primary"
            @change="toggleDisease('发热伴血小板减少综合征（蜱媒传染病）')"
            :disabled="allDisabled"  
          >
            发热伴血小板减少综合征（蜱媒传染病）
          </el-check-tag>
          <el-check-tag
            :checked="form.diseaseType === '斑疹伤寒'"
            type="primary"
            @change="toggleDisease('斑疹伤寒')"
            :disabled="allDisabled"  
          >
            斑疹伤寒
          </el-check-tag>
          <el-check-tag
            :checked="form.diseaseType === '流行性出血热'"
            type="primary"
            @change="toggleDisease('流行性出血热')"
            :disabled="allDisabled"  
          >
            流行性出血热
          </el-check-tag>
          <div>
            <el-check-tag
              :checked="form.diseaseType === '其他'"
              type="primary"
              @change="toggleDisease('其他')"
              :disabled="allDisabled"  
            >
              其他
            </el-check-tag>
            <div class="NextContainer">
              <el-form-item
                v-if="form.diseaseType === '其他'"
                label="其他疾病"
                style="margin-left: 20px; padding: 15px 0 15px 0"
              >
                <el-input
                  v-model="form.otherDiseaseName"
                  placeholder="请输入其他疾病名称"
                  :disabled="allDisabled"  
                  style=""
                />
              </el-form-item>
            </div>
          </div>
        </div>

        <!-- 病例发现途径 -->
        <div class="discoveryMethod">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">病例发现途径</span>
          </div>
          <el-radio-group
            v-model="form.discoveryMethod"
            @change="toggleDiscoveryMethod"
            :disabled="allDisabled"  
            style="margin-left: 20px"
          >
            <el-radio value="APP填报">APP填报</el-radio>
            <el-radio value="主动就诊">主动就诊</el-radio>
            <el-radio value="常规监测发现">常规监测发现</el-radio>
            <el-radio value="健康检查">健康检查</el-radio>
            <el-radio value="其他">其他</el-radio>
          </el-radio-group>
          <div class="NextContainer">
            <el-form-item
              v-if="form.discoveryMethod === '其他'"
              label="其他途径"
              style="margin-left: 20px; padding: 15px 0 15px 0"
            >
              <el-input
                v-model="form.otherDiscoveryMethodName"
                placeholder="请输入其他途径名称"
                :disabled="allDisabled"  
                style=""
              />
            </el-form-item>
          </div>
        </div>

        <!-- 疾病转归 -->
        <div class="diseaseOutcome">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">疾病转归</span>
          </div>
          <el-radio-group
            v-model="form.diseaseOutcome"
            @change="toggleOutcome"
            :disabled="allDisabled"  
            style="margin-left: 20px"
          >
            <el-radio value="治愈">治愈</el-radio>
            <el-radio value="好转">好转</el-radio>
            <el-radio value="未愈">未愈</el-radio>
            <el-radio value="死亡">死亡</el-radio>
          </el-radio-group>
        </div>

        <div>
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">就诊信息</span>
          </div>
          <div style="margin-left: 20px">
            <!-- 确诊医院名称 -->
            <el-form-item label="确诊医院名称">
              <el-input
                clearable
                v-model="form.hospitalName"
                :disabled="allDisabled"  
                placeholder="请输入确诊医院名称"
              />
            </el-form-item>

            <!-- 就诊/入院日期 -->
            <el-form-item label="就诊/入院日期">
              <el-date-picker
                v-model="form.admissionDate"
                type="date"
                format="YYYY-MM-DD"
                placeholder="请选择就诊/入院日期"
                :disabled="allDisabled"  
              />
            </el-form-item>

            <!-- 出院日期 -->
            <el-form-item label="出院日期">
              <el-date-picker
                v-model="form.dischargeDate"
                type="date"
                format="YYYY-MM-DD"
                placeholder="请选择出院日期"
                :disabled="allDisabled"  
              />
            </el-form-item>

            <!-- 死亡日期 -->
            <el-form-item label="死亡日期">
              <el-date-picker
                v-model="form.deathDate"
                type="date"
                format="YYYY-MM-DD"
                placeholder="请选择死亡日期"
                :disabled="allDisabled"  
              />
            </el-form-item>

            <!-- 就诊/入院时症状和体征 -->
            <el-form-item label="就诊/入院时症状和体征">
              <el-input
                type="textarea"
                placeholder="请输入就诊/入院时症状和体征"
                v-model="form.admissionSymptomsAndSigns"
                :disabled="allDisabled"  
              />
            </el-form-item>
          </div>
        </div>

        <!-- 登记分类 -->
        <div class="registrationClassification">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">登记分类</span>
          </div>
          <el-check-tag
            :checked="form.registrationClassification === '新患者'"
            type="primary"
            @change="toggleRegistration('新患者')"
            :disabled="allDisabled"  
          >
            新患者
          </el-check-tag>
          <el-check-tag
            :checked="form.registrationClassification === '复发'"
            type="primary"
            @change="toggleRegistration('复发')"
            :disabled="allDisabled"  
          >
            复发
          </el-check-tag>
          <el-check-tag
            :checked="form.registrationClassification === '返回'"
            type="primary"
            @change="toggleRegistration('返回')"
            :disabled="allDisabled"  
          >
            返回
          </el-check-tag>
          <el-check-tag
            :checked="form.registrationClassification === '治疗失败'"
            type="primary"
            @change="toggleRegistration('治疗失败')"
            :disabled="allDisabled"  
          >
            治疗失败
          </el-check-tag>

          <div>
            <el-check-tag
              :checked="form.registrationClassification === '其他'"
              type="primary"
              @change="toggleRegistration('其他')"
              :disabled="allDisabled"  
            >
              其他
            </el-check-tag>
            <div class="NextContainer">
              <el-form-item
                v-if="form.registrationClassification === '其他'"
                label="其他"
                style="margin-left: 20px; padding: 15px 0 15px 0"
              >
                <el-input
                  v-model="form.otherRegistrationDetails"
                  placeholder="请详述"
                  :disabled="allDisabled"  
                  style=""
                />
              </el-form-item>
            </div>
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
import Dateselection from "@/components/date_selection.vue";

export default {
  components: {
    Dateselection,
  },
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      allDisabled: true,
      form: {
        diseaseType: null, // 确诊疾病
        otherDiseaseName: null, // 其他疾病名称
        discoveryMethod:null, // 病例发现途径
        otherDiscoveryMethodName: null, // 其他途径名称
        diseaseOutcome: null, // 疾病转归
        hospitalName: null, // 确诊医院名称
        admissionDate: null, // 就诊/入院日期
        dischargeDate:null, // 出院日期
        deathDate: null, // 死亡日期
        admissionSymptomsAndSigns: null, // 就诊/入院时症状和体征
        registrationClassification: null, // 登记分类
        otherRegistrationDetails: null, // 登记分类其他详情
        plagueSubtype: null, // 鼠疫子类
        anthraxSubtype: null, // 炭疽子类
        diagnosisDate:null, // 诊断日期
      },
      rules: {
        diagnosisDate: [{ required: true, message: "请选择该诊断的诊断日期" }],
      },
    };
  },
watch: {
  data: {
    immediate: true,
    handler(newVal) {
      if (newVal && newVal !== null) { // 确保 newVal 不为 null
        // 排除 submissionTime 和 submissionUserId 字段
        const { submissionTime, submissionUserId, ...rest } = newVal;
        // 将其余的数据映射到 form
        this.form = { ...this.form, ...rest };
        
          // 格式化 diagonosisDate
        if (newVal.diagnosisDate && newVal.diagnosisDate.length === 3) {
          const [year, month, day] = newVal.diagnosisDate;
          this.form.diagnosisDate = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        } else {
          this.form.diagnosisDate = "";
        }

        // 格式化 admissionDate
        if (newVal.admissionDate && newVal.admissionDate.length === 3) {
          const [year, month, day] = newVal.admissionDate;
          this.form.admissionDate = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        } else {
          this.form.admissionDate = "";
        }
        
        // 格式化 dischargeDate
        if (newVal.dischargeDate && newVal.dischargeDate.length === 3) {
          const [year, month, day] = newVal.dischargeDate;
          this.form.dischargeDate = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        } else {
          this.form.dischargeDate = "";
        }

        // 格式化 deathDate
        if (newVal.deathDate && newVal.deathDate.length === 3) {
          const [year, month, day] = newVal.deathDate;
          this.form.deathDate = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        } else {
          this.form.deathDate = "";
        }

        // 强制视图更新，确保渲染更新
        this.$forceUpdate();
      } else {
        // console.warn('Received null or undefined data');
      }
    },
  },
},





  methods: {
    toggleDisease(disease) {
      this.form.diseaseType = this.form.diseaseType === disease ? "" : disease;
      if (this.form.diseaseType !== "鼠疫") {
        this.form.plagueSubtype = null; // 清空鼠疫子类
      }
      if (this.form.diseaseType !== "炭疽") {
        this.form.anthraxSubtype =null; // 清空炭疽子类
      }
      if (this.form.diseaseType !== "其他") {
        this.form.otherDiseaseName = null; // 清空其他疾病名称
      }
    },
    togglePlagueSubtype(subtype) {
      this.form.plagueSubtype =
        this.form.plagueSubtype === subtype ? null : subtype;
    },
    toggleAnthraxSubtype(subtype) {
      this.form.anthraxSubtype =
        this.form.anthraxSubtype === subtype ? null : subtype;
    },
    toggleDiscoveryMethod(value) {
      this.form.discoveryMethod = value;
      if (this.form.discoveryMethod !== "其他") {        
        this.form.otherDiscoveryMethodName = null; // 清空其他途径名称
      }
    },
    toggleOutcome(value) {
      this.form.diseaseOutcome = value;
    },
    toggleRegistration(value) {
      this.form.registrationClassification = value;
      if (this.form.registrationClassification !== "其他") {
        this.form.otherRegistrationDetails = null; // 清空登记分类其他详情
      }
    },
    handleAble() {
      this.allDisabled = false;
    },
    handleCancel() {
      this.allDisabled = true;
    },
    getInitialForm() {
      return {
        diseaseType: null, // 确诊疾病
        otherDiseaseName: null, // 其他疾病名称
        discoveryMethod:null, // 病例发现途径
        otherDiscoveryMethodName: null, // 其他途径名称
        diseaseOutcome: null, // 疾病转归
        hospitalName: null, // 确诊医院名称
        admissionDate: null, // 就诊/入院日期
        dischargeDate:null, // 出院日期
        deathDate: null, // 死亡日期
        admissionSymptomsAndSigns: null, // 就诊/入院时症状和体征
        registrationClassification: null, // 登记分类
        otherRegistrationDetails: null, // 登记分类其他详情
        plagueSubtype: null, // 鼠疫子类
        anthraxSubtype: null, // 炭疽子类
        diagnosisDate:null, // 诊断日期
      };
    },

    getData() {
      return this.form; // 返回当前组件的表单数据
    },
    handleReset() {
      this.form = this.getInitialForm();
      this.allDisabled = true;
    },
    validate() {
      return new Promise((resolve, reject) => {

        // 确诊疾病必填
        if(!this.form.diseaseType){
          return reject(new Error("请选择确诊疾病类型"));
        }
        // 选择了鼠疫，必须选择子选项
        if (this.form.diseaseType === "鼠疫") {
          if (!this.form.plagueSubtype) {
            return reject(new Error("请选择鼠疫子类"));
          }
        }

        // 选择了炭疽，必须选择子选项
        if (this.form.diseaseType === "炭疽") {
          if (!this.form.anthraxSubtype) {
            return reject(new Error("请选择炭疽子类"));
          }
        }

        // 选择了其他，必须选择填写
        if (this.form.diseaseType === "其他") {
          if (!this.form.otherDiseaseName) {
            return reject(new Error("请填写其他疾病名称"));
          }
        }

        // 验证通过
        this.$refs.form.validate((valid) => {
          valid
            ? resolve()
            : reject(new Error("表单提交失败，请检查必填字段是否未填写"));
        });
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
  margin-top: 10px;
}
.title {
  position: fixed;
  top: 0;
  right: 0;
  width: 700px;
  background: #ffffff;
  padding-bottom: 25px;
  z-index: 100;
  border: 3px solid #fafafa;
}
.custom-input {
  margin-bottom: 10px;
}
.el-dropdown-link:focus {
  outline: none;
}
.title-container {
  display: flex;
  margin-left: 0px;
  margin-bottom: 20px;
  margin-top: 20px;
}

.blue-box {
  width: 6px;
  height: 18px;
  background-color: #285ac8;
  margin-right: 10px;
}

.title-text {
  font-size: 12px;
  font-weight: bold;
  color: #4a4a4a;
}
.el-check-tag {
  margin: 10px;
  font-weight: normal;
}
.el-check-tag.is-checked {
  background-color: #285ac8 !important;
  color: #fff !important;
  font-weight: normal;
}
.GeneralSymptoms {
  margin-top: 20px;
  margin-left: 20px;
}
.Condition {
  margin-top: 20px;
}
.NextContainer {
  width: 420px;
}
/* 确保选中状态的圆点颜色 */
.NextContainer :deep(.el-radio.is-checked .el-radio__inner::before) {
  background-color: #fff !important; /* 选中状态的圆点颜色 */
}
/* 单选框选中状态 */
.NextContainer :deep(.el-radio.is-checked .el-radio__inner) {
  background-color: #285ac8 !important; /* 选中背景色，默认蓝色 */
  border-color: #285ac8 !important; /* 选中边框色 */
}
.el-input {
  width: 220px;
}
</style>
