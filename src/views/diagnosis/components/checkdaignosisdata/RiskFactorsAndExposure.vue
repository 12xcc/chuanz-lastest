<template>
  <div>
    <el-form
      :model="form"
      label-width="160px"
      ref="form"
      label-position="left"
      :rules="rules"
      :disabled="allDisabled"
    >
      <div class="Symptoms">
        <div class="Condition">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">有无并发症</span>
          </div>
          <el-radio-group v-model="form.hasComplications">
            <el-radio :value="true">有</el-radio>
            <el-radio :value="false">无</el-radio>
          </el-radio-group>
        </div>
      </div>

      <div v-if="form.hasComplications">
        <div class="Symptoms">
          <div class="Condition">
            <div class="title-container">
              <div class="blue-box"></div>
              <span class="title-text">并发症</span>
            </div>
            <div class="flex gap-2">
              <el-check-tag
                :checked="form.hasViralPneumonia"
                type="primary"
                @change="toggleTag('hasViralPneumonia')"
                :disabled="allDisabled"
              >
                病毒性肺炎
              </el-check-tag>
              <el-check-tag
                :checked="form.hasBacterialPneumonia"
                type="primary"
                @change="toggleTag('hasBacterialPneumonia')"
                :disabled="allDisabled"
              >
                细菌性肺炎
              </el-check-tag>
              <el-check-tag
                :checked="form.hasFungalPneumonia"
                type="primary"
                @change="toggleTag('hasFungalPneumonia')"
                :disabled="allDisabled"
              >
                真菌性肺炎
              </el-check-tag>
              <el-check-tag
                :checked="form.hasRespiratoryFailure"
                type="primary"
                @change="toggleTag('hasRespiratoryFailure')"
                :disabled="allDisabled"
              >
                呼吸衰竭
              </el-check-tag>
              <el-check-tag
                :checked="form.hasArds"
                type="primary"
                @change="toggleTag('hasArds')"
                :disabled="allDisabled"
              >
                急性呼吸窘迫综合征(ARDS)
              </el-check-tag>
              <el-check-tag
                :checked="form.hasDic"
                type="primary"
                @change="toggleTag('hasDic')"
                :disabled="allDisabled"
              >
                弥散性血管内凝血（DIC）
              </el-check-tag>
              <el-check-tag
                :checked="form.hasToxicShock"
                type="primary"
                @change="toggleTag('hasToxicShock')"
                :disabled="allDisabled"
              >
                感染中毒性休克
              </el-check-tag>
              <el-check-tag
                :checked="form.hasMeningitis"
                type="primary"
                @change="toggleTag('hasMeningitis')"
                :disabled="allDisabled"
              >
                脑膜炎
              </el-check-tag>
              <el-check-tag
                :checked="form.hasEncephalitis"
                type="primary"
                @change="toggleTag('hasEncephalitis')"
                :disabled="allDisabled"
              >
                脑炎
              </el-check-tag>
              <el-check-tag
                :checked="form.hasBacteremia"
                type="primary"
                @change="toggleTag('hasBacteremia')"
                :disabled="allDisabled"
              >
                菌血症
              </el-check-tag>
              <el-check-tag
                :checked="form.hasMyocarditis"
                type="primary"
                @change="toggleTag('hasMyocarditis')"
                :disabled="allDisabled"
              >
                心肌炎
              </el-check-tag>
              <el-check-tag
                :checked="form.hasAcuteLungInjury"
                type="primary"
                @change="toggleTag('hasAcuteLungInjury')"
                :disabled="allDisabled"
              >
                急性肺损伤
              </el-check-tag>
              <el-check-tag
                :checked="form.hasAcuteKidneyInjury"
                type="primary"
                @change="toggleTag('hasAcuteKidneyInjury')"
                :disabled="allDisabled"
              >
                急性肾损伤
              </el-check-tag>
              <el-check-tag
                :checked="form.hasEpilepsy"
                type="primary"
                @change="toggleTag('hasEpilepsy')"
                :disabled="allDisabled"
              >
                癫痫
              </el-check-tag>
              <el-check-tag
                :checked="form.hasToxicHepatitis"
                type="primary"
                @change="toggleTag('hasToxicHepatitis')"
                :disabled="allDisabled"
              >
                中毒性肝炎
              </el-check-tag>
              <el-check-tag
                :checked="form.hasFluidOverload"
                type="primary"
                @change="toggleTag('hasFluidOverload')"
                :disabled="allDisabled"
              >
                输液过量
              </el-check-tag>
              <el-check-tag
                :checked="form.hasSuperinfection"
                type="primary"
                @change="toggleTag('hasSuperinfection')"
                :disabled="allDisabled"
              >
                二重感染
              </el-check-tag>
              <el-check-tag
                :checked="form.hasHypoxemia"
                type="primary"
                @change="toggleTag('hasHypoxemia')"
                :disabled="allDisabled"
              >
                低氧血症
              </el-check-tag>
              <el-check-tag
                :checked="form.hasSepticShock"
                type="primary"
                @change="toggleTag('hasSepticShock')"
                :disabled="allDisabled"
              >
                脓毒症休克
              </el-check-tag>
              <el-check-tag
                :checked="form.hasMetabolicAcidosis"
                type="primary"
                @change="toggleTag('hasMetabolicAcidosis')"
                :disabled="allDisabled"
              >
                代谢性酸中毒
              </el-check-tag>
              <el-check-tag
                :checked="form.hasElectrolyteImbalance"
                type="primary"
                @change="toggleTag('hasElectrolyteImbalance')"
                :disabled="allDisabled"
              >
                电解质及酸碱失衡
              </el-check-tag>
              <el-check-tag
                :checked="form.hasHemolysis"
                type="primary"
                @change="toggleTag('hasHemolysis')"
                :disabled="allDisabled"
              >
                急性血管内溶血
              </el-check-tag>
              <el-check-tag
                :checked="form.hasGastrointestinalBleeding"
                type="primary"
                @change="toggleTag('hasGastrointestinalBleeding')"
                :disabled="allDisabled"
              >
                消化道出血
              </el-check-tag>
              <el-check-tag
                :checked="form.hasBronchitis"
                type="primary"
                @change="toggleTag('hasBronchitis')"
                :disabled="allDisabled"
              >
                支气管炎
              </el-check-tag>
              <el-check-tag
                :checked="form.hasBronchopneumonia"
                type="primary"
                @change="toggleTag('hasBronchopneumonia')"
                :disabled="allDisabled"
              >
                支气管肺炎
              </el-check-tag>
              <el-check-tag
                :checked="form.hasSecondaryInfection"
                type="primary"
                @change="toggleTag('hasSecondaryInfection')"
                :disabled="allDisabled"
              >
                继发性感染
              </el-check-tag>
              <el-check-tag
                :checked="form.hasHypertensiveEncephalopathy"
                type="primary"
                @change="toggleTag('hasHypertensiveEncephalopathy')"
                :disabled="allDisabled"
              >
                高血压脑病
              </el-check-tag>
              <el-check-tag
                :checked="form.hasNasalBleeding"
                type="primary"
                @change="toggleTag('hasNasalBleeding')"
                :disabled="allDisabled"
              >
                鼻出血
              </el-check-tag>
              <el-check-tag
                :checked="form.hasVaginalBleeding"
                type="primary"
                @change="toggleTag('hasVaginalBleeding')"
                :disabled="allDisabled"
              >
                阴道出血
              </el-check-tag>

              <el-check-tag
                :checked="form.hasCoagulationDisorder"
                type="primary"
                @change="toggleTag('hasCoagulationDisorder')"
                :disabled="allDisabled"
              >
                凝血功能障碍
              </el-check-tag>
              <el-check-tag
                :checked="form.hasMultipleOrganFailure"
                type="primary"
                @change="toggleTag('hasMultipleOrganFailure')"
                :disabled="allDisabled"
              >
                多器官功能衰竭
              </el-check-tag>
              <el-check-tag
                :checked="form.hasAnemia"
                type="primary"
                @change="toggleTag('hasAnemia')"
                :disabled="allDisabled"
              >
                贫血
              </el-check-tag>
              <el-check-tag
                :checked="form.hasHepatosplenomegaly"
                type="primary"
                @change="toggleTag('hasHepatosplenomegaly')"
                :disabled="allDisabled"
              >
                肝脾肿大
              </el-check-tag>
              <el-check-tag
                :checked="form.hasBrainEdema"
                type="primary"
                @change="toggleTag('hasBrainEdema')"
                :disabled="allDisabled"
              >
                脑水肿
              </el-check-tag>
              <el-check-tag
                :checked="form.hasHus"
                type="primary"
                @change="toggleTag('hasHus')"
                :disabled="allDisabled"
              >
                溶血性尿毒综合征
              </el-check-tag>
              <el-check-tag
                :checked="form.hasHematemesis"
                type="primary"
                @change="toggleTag('hasHematemesis')"
                :disabled="allDisabled"
              >
                呕血
              </el-check-tag>
              <el-check-tag
                :checked="form.hasMelena"
                type="primary"
                @change="toggleTag('hasMelena')"
                :disabled="allDisabled"
              >
                便血
              </el-check-tag>
              <el-check-tag
                :checked="form.hasHemoptysis"
                type="primary"
                @change="toggleTag('hasHemoptysis')"
                :disabled="allDisabled"
              >
                咯血
              </el-check-tag>
              <el-check-tag
                :checked="form.hasAbdominalHemorrhage"
                type="primary"
                @change="toggleTag('hasAbdominalHemorrhage')"
                :disabled="allDisabled"
              >
                腹腔出血
              </el-check-tag>
              <el-check-tag
                :checked="form.hasPulmonaryEdema"
                type="primary"
                @change="toggleTag('hasPulmonaryEdema')"
                :disabled="allDisabled"
              >
                肺水肿
              </el-check-tag>
              <el-check-tag
                :checked="form.hasMyocardialDamage"
                type="primary"
                @change="toggleTag('hasMyocardialDamage')"
                :disabled="allDisabled"
              >
                心肌损害
              </el-check-tag>
              <el-check-tag
                :checked="form.hasLiverDamage"
                type="primary"
                @change="toggleTag('hasLiverDamage')"
                :disabled="allDisabled"
              >
                肝损害
              </el-check-tag>
              <el-check-tag
                :checked="form.hasIntracranialHemorrhage"
                type="primary"
                @change="toggleTag('hasIntracranialHemorrhage')"
                :disabled="allDisabled"
              >
                颅内出血
              </el-check-tag>
              <!-- <el-check-tag :checked="form.hasSevereAnemia" type="primary" @change="toggleTag('hasSevereAnemia')" :disabled="allDisabled">
                严重贫血
              </el-check-tag> -->
              <el-check-tag
                :checked="form.hasSpontaneousRenalRupture"
                type="primary"
                @change="toggleTag('hasSpontaneousRenalRupture')"
                :disabled="allDisabled"
              >
                自发性肾破裂
              </el-check-tag>

              <el-check-tag
                :checked="form.otherComplications"
                type="primary"
                @change="toggleTag('otherComplications')"
                :disabled="allDisabled"
              >
                其他
              </el-check-tag>
              <div class="NextContainer">
                <el-form-item
                  v-if="form.otherComplications"
                  label="其他并发症"
                  style="margin-left: 20px; padding: 15px 0 15px 0"
                  labei-position="left"
                  prop="otherComplicationsName"
                >
                  <el-input
                    v-model="form.otherComplicationsName"
                    placeholder="请输入其他并发症"
                    style="width: 200px"
                  />
                </el-form-item>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>



<script>
export default {
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
        hasComplications: false,
        hasViralPneumonia: false,
        hasBacterialPneumonia: false,
        hasFungalPneumonia: false,
        hasRespiratoryFailure: false,
        hasArds: false, // 修正: 大小写
        hasDic: false, // 修正: 大小写
        hasToxicShock: false,
        hasMeningitis: false,
        hasEncephalitis: false,
        hasBacteremia: false,
        hasMyocarditis: false,
        hasAcuteLungInjury: false,
        hasAcuteKidneyInjury: false,
        hasEpilepsy: false,
        hasToxicHepatitis: false,
        hasFluidOverload: false,
        hasSuperinfection: false,
        hasHypoxemia: false,
        hasSepticShock: false,
        hasMetabolicAcidosis: false,
        hasElectrolyteImbalance: false,
        hasHemolysis: false,
        hasGastrointestinalBleeding: false,
        hasCoagulationDisorder: false,
        hasMultipleOrganFailure: false,
        hasAnemia: false,
        hasHepatosplenomegaly: false,
        hasBrainEdema: false,
        hasHus: false, // 修正: 大小写
        hasHematemesis: false,
        hasMelena: false,
        hasHemoptysis: false,
        hasAbdominalHemorrhage: false,
        hasPulmonaryEdema: false, // 新增
        hasMyocardialDamage: false, // 新增
        hasLiverDamage: false, // 新增
        hasIntracranialHemorrhage: false, // 新增
        // hasSevereAnemia: false, // 新增
        hasSpontaneousRenalRupture: false, // 新增
        hasBronchitis: false, // 新增
        hasBronchopneumonia: false, // 新增
        hasSecondaryInfection: false, // 新增
        hasHypertensiveEncephalopathy: false, // 新增
        hasNasalBleeding: false, // 新增
        hasVaginalBleeding: false, // 新增
        otherComplications: false, // 修正: 小写
        otherComplicationsName: null, // 修正: 小写
      },
      rules: {
        otherComplicationsName: [
          { required: true, message: "请输入其他并发症" },
        ],
      },
    };
  },
  watch: {
    data: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          // 先将所有数据映射到 form
          this.form = { ...this.form, ...newVal };

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
      if (field === "otherComplications" && !this.form[field]) {
        this.form.otherComplicationsName = null;
      }
    },
    handleAble() {
      this.allDisabled = false;
    },
    handleCancel() {
      this.allDisabled = true;
    },

    validate() {
      return new Promise((resolve, reject) => {
        // 选择了有并发症，必须选择子选项
        if (this.form.hasComplications) {
          const hasComplication =
            this.form.hasViralPneumonia ||
            this.form.hasBacterialPneumonia ||
            this.form.hasFungalPneumonia ||
            this.form.hasRespiratoryFailure ||
            this.form.hasArds ||
            this.form.hasDic ||
            this.form.hasToxicShock ||
            this.form.hasMeningitis ||
            this.form.hasEncephalitis ||
            this.form.hasBacteremia ||
            this.form.hasMyocarditis ||
            this.form.hasAcuteLungInjury ||
            this.form.hasAcuteKidneyInjury ||
            this.form.hasEpilepsy ||
            this.form.hasToxicHepatitis ||
            this.form.hasFluidOverload ||
            this.form.hasSuperinfection ||
            this.form.hasHypoxemia ||
            this.form.hasSepticShock ||
            this.form.hasMetabolicAcidosis ||
            this.form.hasElectrolyteImbalance ||
            this.form.hasHemolysis ||
            this.form.hasGastrointestinalBleeding ||
            this.form.hasCoagulationDisorder ||
            this.form.hasMultipleOrganFailure ||
            this.form.hasAnemia ||
            this.form.hasHepatosplenomegaly ||
            this.form.hasBrainEdema ||
            this.form.hasHus ||
            this.form.hasHematemesis ||
            this.form.hasMelena ||
            this.form.hasHemoptysis ||
            this.form.hasAbdominalHemorrhage ||
            this.form.hasBronchitis || // 新增字段
            this.form.hasBronchopneumonia || // 新增字段
            this.form.hasSecondaryInfection || // 新增字段
            this.form.hasHypertensiveEncephalopathy || // 新增字段
            this.form.hasNasalBleeding || // 新增字段
            this.form.hasVaginalBleeding || // 新增字段
            this.form.hasPulmonaryEdema || // 新增字段
            this.form.hasMyocardialDamage || // 新增字段
            this.form.hasLiverDamage || // 新增字段
            this.form.hasIntracranialHemorrhage || // 新增字段
            // this.form.hasSevereAnemia || // 新增字段
            this.form.hasSpontaneousRenalRupture || // 新增字段
            this.form.otherComplications; // 修正拼写
          if (!hasComplication) {
            return reject(new Error("请选择并发症"));
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
    getData() {
      return this.form;
    },
    handleReset() {
      this.form = this.getInitialForm();
    },
    getInitialForm() {
      return {
        hasComplications: false,
        hasViralPneumonia: false,
        hasBacterialPneumonia: false,
        hasFungalPneumonia: false,
        hasRespiratoryFailure: false,
        hasArds: false, // 修正: 大小写
        hasDic: false, // 修正: 大小写
        hasToxicShock: false,
        hasMeningitis: false,
        hasEncephalitis: false,
        hasBacteremia: false,
        hasMyocarditis: false,
        hasAcuteLungInjury: false,
        hasAcuteKidneyInjury: false,
        hasEpilepsy: false,
        hasToxicHepatitis: false,
        hasFluidOverload: false,
        hasSuperinfection: false,
        hasHypoxemia: false,
        hasSepticShock: false,
        hasMetabolicAcidosis: false,
        hasElectrolyteImbalance: false,
        hasHemolysis: false,
        hasGastrointestinalBleeding: false,
        hasCoagulationDisorder: false,
        hasMultipleOrganFailure: false,
        hasAnemia: false,
        hasHepatosplenomegaly: false,
        hasBrainEdema: false,
        hasHus: false, // 修正: 大小写
        hasHematemesis: false,
        hasMelena: false,
        hasHemoptysis: false,
        hasAbdominalHemorrhage: false,
        hasPulmonaryEdema: false, // 新增
        hasMyocardialDamage: false, // 新增
        hasLiverDamage: false, // 新增
        hasIntracranialHemorrhage: false, // 新增
        // hasSevereAnemia: false, // 新增
        hasSpontaneousRenalRupture: false, // 新增
        hasBronchitis: false, // 新增
        hasBronchopneumonia: false, // 新增
        hasSecondaryInfection: false, // 新增
        hasHypertensiveEncephalopathy: false, // 新增
        hasNasalBleeding: false, // 新增
        hasVaginalBleeding: false, // 新增
        otherComplications: false, // 修正: 小写
        otherComplicationsName: null, // 修正: 小写
      };
    },
  },
};
</script>

<style scoped>
.el-check-tag {
  margin: 10px;
  font-weight: normal;
}
.el-check-tag.is-checked {
  background-color: var(--el-color-primary) !important;
  color: #fff !important;
  border-color: var(--el-color-primary) !important;
  font-weight: normal;
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
.Symptoms {
  margin-top: 20px;
  margin-left: 20px;
}
.NextContainer {
  width: 400px;
}
.Condition {
  margin-top: 20px;
}
.el-radio {
  margin-left: 20px;
}
</style>
