<template>
  <div class="container">
    <el-form
      :model="form"
      label-width="140px"
      class="form-container"
      ref="form"
      :rules="rules"
      :disabled="allDisabled"
    >
      <div class="GeneralSymptoms">
        <div class="Condition">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">发热情况</span>
          </div>
          <el-form-item label="是否发热(≥37.3℃)" prop="hasFever">
            <el-select
              v-model="form.hasFever"
              placeholder="是否发热"
              clearable
              size="default"
              style="width: 200px"
            >
              <el-option :key="1" label="是" :value="true"></el-option>
              <el-option :key="2" label="否" :value="false"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            label="最高体温(℃)"
            v-if="form.hasFever === true"
            prop="highestTemperature"
          >
            <el-input
              v-model="form.highestTemperature"
              placeholder="最高体温"
              clearable
              size="default"
              style="width: 200px"
            >
            </el-input>
          </el-form-item>
          <el-form-item
            label="持续时间(h)"
            v-if="form.hasFever === true"
            prop="feverDuration"
          >
            <el-input
              v-model="form.feverDuration"
              placeholder="最高体温"
              clearable
              size="default"
              style="width: 200px"
            >
            </el-input>
          </el-form-item>
        </div>

        <div class="Condition">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">情况</span>
          </div>
          <el-check-tag
            :checked="form.hasChills"
            type="primary"
            @change="toggleTag('hasChills')"
            :disabled="allDisabled"
          >
            寒战
          </el-check-tag>
          <el-check-tag
            :checked="form.hasSweating"
            type="primary"
            @change="toggleTag('hasSweating')"
            :disabled="allDisabled"
          >
            大汗
          </el-check-tag>
          <el-check-tag
            :checked="form.hasFatigue"
            type="primary"
            @change="toggleTag('hasFatigue')"
            :disabled="allDisabled"
          >
            乏力
          </el-check-tag>
          <el-check-tag
            :checked="form.hasHeadache"
            type="primary"
            @change="toggleTag('hasHeadache')"
            :disabled="allDisabled"
          >
            头痛
          </el-check-tag>
          <el-check-tag
            :checked="form.hasMusclePain"
            type="primary"
            @change="toggleTag('hasMusclePain')"
            :disabled="allDisabled"
          >
            肌肉酸痛
          </el-check-tag>
          <el-check-tag
            :checked="form.hasJointPain"
            type="primary"
            @change="toggleTag('hasJointPain')"
            :disabled="allDisabled"
          >
            关节酸痛
          </el-check-tag>
        </div>

        <el-check-tag
          :checked="form.hasLymphNodeSwelling"
          type="primary"
          @change="toggleTag('hasLymphNodeSwelling')"
          prop="hasLymphNodeSwelling"
          :disabled="allDisabled"
        >
          淋巴结肿大
        </el-check-tag>

        <div
          v-if="form.hasLymphNodeSwelling"
          class="flex gap-2 mt-4"
          style="margin-left: 20px"
        >
          <!-- <span style="color: red">*</span> -->
          <el-check-tag
            :checked="form.hasLymphNodeSwellingGroin"
            type="primary"
            @change="toggleTag('hasLymphNodeSwellingGroin')"
            :disabled="allDisabled"
          >
            腹股沟
          </el-check-tag>
          <el-check-tag
            :checked="form.hasLymphNodeSwellingArmpit"
            type="primary"
            @change="toggleTag('hasLymphNodeSwellingArmpit')"
            :disabled="allDisabled"
          >
            腋下
          </el-check-tag>
          <el-check-tag
            :checked="form.hasLymphNodeSwellingSubclavian"
            type="primary"
            @change="toggleTag('hasLymphNodeSwellingSubclavian')"
            :disabled="allDisabled"
          >
            锁骨下
          </el-check-tag>
          <el-check-tag
            :checked="form.hasLymphNodeSwellingNeck"
            type="primary"
            @change="toggleTag('hasLymphNodeSwellingNeck')"
            :disabled="allDisabled"
          >
            颈部
          </el-check-tag>
          <el-check-tag
            :checked="form.hasLymphNodeSwellingElbow"
            type="primary"
            @change="toggleTag('hasLymphNodeSwellingElbow')"
            :disabled="allDisabled"
          >
            肘
          </el-check-tag>
          <el-check-tag
            :checked="form.hasLymphNodeSwellingPopliteal"
            type="primary"
            @change="toggleTag('hasLymphNodeSwellingPopliteal')"
            :disabled="allDisabled"
          >
            腘窝
          </el-check-tag>
        </div>

        <div class="flex gap-2 mt-4">
          <el-check-tag
            :checked="form.hasCyanosis"
            type="primary"
            @change="toggleTag('hasCyanosis')"
            :disabled="allDisabled"
          >
            口唇、颜面、四肢及全身皮肤发绀
          </el-check-tag>
          <el-check-tag
            :checked="form.hasSubcutaneousAndMucosalBleedingSpots"
            type="primary"
            @change="toggleTag('hasSubcutaneousAndMucosalBleedingSpots')"
            :disabled="allDisabled"
          >
            皮下及黏膜出血或出血点
          </el-check-tag>
          <el-check-tag
            :checked="form.hasPainfulRedRash"
            type="primary"
            @change="toggleTag('hasPainfulRedRash')"
            :disabled="allDisabled"
          >
            皮肤可见剧痛的红色丘疹
          </el-check-tag>
          <el-check-tag
            :checked="form.hasBloodBlisters"
            type="primary"
            @change="toggleTag('hasBloodBlisters')"
            :disabled="allDisabled"
          >
            皮肤可见周边呈灰黑色、基底坚硬的血性水泡
          </el-check-tag>
          <el-check-tag
            :checked="form.hasSkinUlcer"
            type="primary"
            @change="toggleTag('hasSkinUlcer')"
            :disabled="allDisabled"
          >
            皮肤出现呈灰黑色创面的溃疡
          </el-check-tag>
          <el-check-tag
            :checked="form.hasCongestiveOrPetechialRash"
            type="primary"
            @change="toggleTag('hasCongestiveOrPetechialRash')"
            :disabled="allDisabled"
          >
            皮疹：充血性或点状出血疹
          </el-check-tag>
          <el-check-tag
            :checked="form.hasPressureInsensitiveRash"
            type="primary"
            @change="toggleTag('hasPressureInsensitiveRash')"
            :disabled="allDisabled"
          >
            皮疹：起初压之退色，后期压之不退，多见于四肢、躯干，面部一般没有
          </el-check-tag>

          <!-- 失水 -->
          <div class="Dehydration" style="">
            <el-check-tag
              :checked="form.hasDehydration"
              type="primary"
              @change="toggleTag('hasDehydration')"
              prop="hasDehydration"
              :disabled="allDisabled"
            >
              失水
            </el-check-tag>

            <div class="NextContainer">
              <el-form-item
                v-if="form.hasDehydration"
                style="padding: 15px 0 15px 0; margin-left: 20px"
                prop="dehydrationSeverity"
                label="失水程度"
                label-position="left"
              >
                <el-radio-group v-model="form.dehydrationSeverity">
                  <el-radio :value="'重度'">重度</el-radio>
                  <el-radio :value="'中度'">中度</el-radio>
                  <el-radio :value="'轻度'">轻度</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
          </div>

          <!-- 瘙痒性斑丘疹/水疱 -->
          <el-check-tag
            :checked="form.hasItchyRash"
            type="primary"
            @change="toggleTag('hasItchyRash')"
            style="display: block; width: 154px"
            prop="hasItchyRash"
            :disabled="allDisabled"
          >
            瘙痒性斑丘疹/水疱
          </el-check-tag>

          <div
            v-if="form.hasItchyRash"
            @change="handlehasItchyRashChange"
            style="margin-left: 20px"
          >
            <!-- <span style="color: red">*</span> -->
            <el-check-tag
              :checked="form.itchyRashOnFingers"
              type="primary"
              @change="toggleTag('itchyRashOnFingers')"
              :disabled="allDisabled"
            >
              手指
            </el-check-tag>
            <el-check-tag
              :checked="form.itchyRashOnBackOfHands"
              type="primary"
              @change="toggleTag('itchyRashOnBackOfHands')"
              :disabled="allDisabled"
            >
              手背
            </el-check-tag>
            <el-check-tag
              :checked="form.itchyRashOnUpperLimbs"
              type="primary"
              @change="toggleTag('itchyRashOnUpperLimbs')"
              :disabled="allDisabled"
            >
              上肢
            </el-check-tag>
            <el-check-tag
              :checked="form.itchyRashOnLowerLimbs"
              type="primary"
              @change="toggleTag('itchyRashOnLowerLimbs')"
              :disabled="allDisabled"
            >
              下肢
            </el-check-tag>
            <el-check-tag
              :checked="form.itchyRashOnFeet"
              type="primary"
              @change="toggleTag('itchyRashOnFeet')"
              :disabled="allDisabled"
            >
              足背
            </el-check-tag>
            <el-check-tag
              :checked="form.itchyRashOnFace"
              type="primary"
              @change="toggleTag('itchyRashOnFace')"
              :disabled="allDisabled"
            >
              面部
            </el-check-tag>
            <el-check-tag
              :checked="form.itchyRashOnOther"
              type="primary"
              @change="toggleTag('itchyRashOnOther')"
              :disabled="allDisabled"
            >
              其他
            </el-check-tag>
          </div>

          <!-- 水肿 -->
          <el-check-tag
            :checked="form.hasEdema"
            type="primary"
            @change="toggleTag('hasEdema')"
            :disabled="allDisabled"
          >
            水肿
          </el-check-tag>

          <!-- 盗汗 -->
          <el-check-tag
            :checked="form.hasNightSweats"
            type="primary"
            @change="toggleTag('hasNightSweats')"
            :disabled="allDisabled"
          >
            盗汗
          </el-check-tag>

          <!-- 消瘦 -->
          <el-check-tag
            :checked="form.hasWeightLoss"
            type="primary"
            @change="toggleTag('hasWeightLoss')"
            :disabled="allDisabled"
          >
            消瘦
          </el-check-tag>

          <!-- 虚脱/全身无力 -->
          <el-check-tag
            :checked="form.hasExhaustion"
            type="primary"
            @change="toggleTag('hasExhaustion')"
            :disabled="allDisabled"
          >
            虚脱/全身无力
          </el-check-tag>
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
      visible: false, // 控制弹窗显示
      form: {
        hasFever: null,
        hasChills: false,
        hasSweating: false,
        hasFatigue: false,
        hasHeadache: false,
        hasMusclePain: false,
        hasJointPain: false,
        hasLymphNodeSwelling: false,
        hasLymphNodeSwellingGroin: false,
        hasLymphNodeSwellingArmpit: false,
        hasLymphNodeSwellingSubclavian: false,
        hasLymphNodeSwellingNeck: false,
        hasLymphNodeSwellingElbow: false,
        hasLymphNodeSwellingPopliteal: false,
        hasCyanosis: false,
        hasSubcutaneousAndMucosalBleedingSpots: false,
        hasPainfulRedRash: false,
        hasBloodBlisters: false,
        hasSkinUlcer: false,
        hasCongestiveOrPetechialRash: false,
        hasPressureInsensitiveRash: false,
        hasDehydration: false,
        dehydrationSeverity: "", // 失水程度

        hasItchyRash: false,
        itchyRashOnFingers: false,
        itchyRashOnBackOfHands: false,
        itchyRashOnUpperLimbs: false,
        itchyRashOnLowerLimbs: false,
        itchyRashOnFeet: false,
        itchyRashOnFace: false,
        itchyRashOnOther: false,

        hasEdema: false,
        hasNightSweats: false,
        hasWeightLoss: false,
        hasExhaustion: false,
      },

      rules: {},
    };
  },

  watch: {
    data: {
      immediate: true,
      handler(newVal) {
        console.log("子组件接收:", newVal); // 打印传入的数据
        if (newVal) {
          // 将所有数据映射到 form
          this.form = { ...this.form, ...newVal };
          // 强制更新渲染视图
          this.$forceUpdate();
        } else {
          // console.warn("Received null or undefined data");
        }
      },
    },
  },

  methods: {
    toggleTag(field) {
      this.form[field] = !this.form[field];
      // 失水未被选中时，其子选项清空
      if (field === "hasDehydration" && !this.form[field]) {
        this.form.Dehydration = "";
      }
      // 淋巴结肿大未被选中时，其子选项全部清空
      if (field === "hasLymphNodeSwelling" && !this.form[field]) {
        this.form.hasLymphNodeSwellingGroin = false;
        this.form.hasLymphNodeSwellingArmpit = false;
        this.form.hasLymphNodeSwellingSubclavian = false;
        this.form.hasLymphNodeSwellingNeck = false;
        this.form.hasLymphNodeSwellingElbow = false;
        this.form.hasLymphNodeSwellingPopliteal = false;
      }
      // 瘙痒性斑丘疹/水疱未被选中时，其子选项全部清空
      if (field === "hasItchyRash" && !this.form[field]) {
        this.form.itchyRashOnFingers = false;
        this.form.itchyRashOnBackOfHands = false;
        this.form.itchyRashOnUpperLimbs = false;
        this.form.itchyRashOnLowerLimbs = false;
        this.form.itchyRashOnFeet = false;
        this.form.itchyRashOnFace = false;
        this.form.itchyRashOnOther = false;
      }
    },
    showDrawer(user) {
      this.form = { ...user };
      this.visible = true;
    },
    handleCancel() {
      this.visible = false;
      this.handleReset();
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
          this.handleReset();
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
    clearAllDiseases() {},
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
        hasFever: null,
        hasChills: false,
        hasSweating: false,
        hasFatigue: false,
        hasHeadache: false,
        hasMusclePain: false,
        hasJointPain: false,
        hasLymphNodeSwelling: false,
        hasLymphNodeSwellingGroin: false,
        hasLymphNodeSwellingArmpit: false,
        hasLymphNodeSwellingSubclavian: false,
        hasLymphNodeSwellingNeck: false,
        hasLymphNodeSwellingElbow: false,
        hasLymphNodeSwellingPopliteal: false,
        hasCyanosis: false,
        hasSubcutaneousAndMucosalBleedingSpots: false,
        hasPainfulRedRash: false,
        hasBloodBlisters: false,
        hasSkinUlcer: false,
        hasCongestiveOrPetechialRash: false,
        hasPressureInsensitiveRash: false,
        hasDehydration: false,
        Dehydration: "",

        hasItchyRash: false,
        itchyRashOnFingers: false,
        itchyRashOnBackOfHands: false,
        itchyRashOnUpperLimbs: false,
        itchyRashOnLowerLimbs: false,
        itchyRashOnFeet: false,
        itchyRashOnFace: false,
        itchyRashOnOther: false,

        hasEdema: false,
        hasNightSweats: false,
        hasWeightLoss: false,
        hasExhaustion: false,
      };
    },
    getData() {
      return this.form; // 返回当前组件的表单数据
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
</style>
