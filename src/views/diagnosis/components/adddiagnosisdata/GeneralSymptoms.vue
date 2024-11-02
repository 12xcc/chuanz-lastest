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
              <el-option label="是" :value="true"></el-option>
              <el-option  label="否" :value="false"></el-option>
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
              placeholder="持续时间"
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
            :checked="form.hasSevereAnemia"
            type="primary"
            @change="toggleTag('hasSevereAnemia')"
            :disabled="allDisabled"
          >
            严重贫血
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
            :checked="form.hasSubcutaneousAndMucosalBleedingCavity"
            type="primary"
            @change="toggleTag('hasSubcutaneousAndMucosalBleedingCavity')"
            :disabled="allDisabled"
          >
            皮下及粘膜出血腔道出血
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
          <el-check-tag
            :checked="form.hasWhiteBloodCells"
            type="primary"
            @change="toggleTag('hasWhiteBloodCells')"
            :disabled="allDisabled"
          >
            白细胞明显增高
          </el-check-tag>

          <div>
            <el-check-tag
              :checked="form.hasBloodPressureDrop"
              type="primary"
              @change="toggleTag('hasBloodPressureDrop')"
              :disabled="allDisabled"
            >
              血压下降
            </el-check-tag>
            <div class="NextContainer">
              <el-form-item
                label="最低血压(mmHg)"
                v-if="form.hasBloodPressureDrop"
                style="margin-left: 20px; padding: 15px 0 15px 0"
                label-position="left"
                prop="hasBloodPressureDrop"
              >
                <el-input
                  v-model="form.lowestBloodPressure"
                  style="width: 200px"
                  placeholder="请输入最低血压"
                  prop="lowestBloodPressure"
                >
                </el-input>
              </el-form-item>
            </div>
          </div>

          <el-check-tag
            :checked="form.hasShockSyndrome"
            type="primary"
            @change="toggleTag('hasShockSyndrome')"
            :disabled="allDisabled"
          >
            休克症候群
          </el-check-tag>

          <el-check-tag
            :checked="form.hasHighIntracranialPressure"
            type="primary"
            @change="toggleTag('hasHighIntracranialPressure')"
            :disabled="allDisabled"
          >
            颅压高
          </el-check-tag>

          <el-check-tag
            :checked="form.hasTurbidCerebrospinalFluid"
            type="primary"
            @change="toggleTag('hasTurbidCerebrospinalFluid')"
            :disabled="allDisabled"
          >
            脑脊液浊浑
          </el-check-tag>

          <div>
            <el-check-tag
              :checked="form.hasBleeding"
              type="primary"
              @change="toggleTag('hasBleeding')"
              prop="hasBleeding"
              :disabled="allDisabled"
            >
              出血
            </el-check-tag>

            <div class="NextContainer">
              <el-form-item
                label="出血量(ml)"
                v-if="form.hasBleeding"
                style="margin-left: 20px; padding: 15px 0 0 0"
                label-position="left"
                prop="bleedingVolume"
              >
                <el-input
                  v-model="form.bleedingVolume"
                  style="width: 200px"
                  placeholder="请输入出血量"
                >
                </el-input>
              </el-form-item>
              <el-form-item
                label="出血腔道"
                v-if="form.hasBleeding"
                style="margin-left: 20px; padding: 0 0 15px 0"
                label-position="left"
                prop="bleedingCavity"
              >
                <el-input
                  v-model="form.bleedingCavity"
                  style="width: 200px"
                  placeholder="请输入出血腔道"
                >
                </el-input>
              </el-form-item>
            </div>
          </div>

          <el-check-tag
            :checked="form.hasPlasmaLeakage"
            type="primary"
            @change="toggleTag('hasPlasmaLeakage')"
            :disabled="allDisabled"
          >
            血浆渗漏表现
          </el-check-tag>

          <el-check-tag
            :checked="form.hasOtherOrganDamage"
            type="primary"
            @change="toggleTag('hasOtherOrganDamage')"
            :disabled="allDisabled"
          >
            其他重要脏器损伤
          </el-check-tag>

          <el-check-tag
            :checked="form.hasKernigSign"
            type="primary"
            @change="toggleTag('hasKernigSign')"
            :disabled="allDisabled"
          >
            Kernig征
          </el-check-tag>
          <el-check-tag
            :checked="form.hasBrudzinskiSign"
            type="primary"
            @change="toggleTag('hasBrudzinskiSign')"
            :disabled="allDisabled"
          >
            Brudzinski征
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
  data() {
    return {
      visible: false, // 控制弹窗显示
      form: {
        hasFever: null,
        hasChills: false,
        hasSweating: false,
        feverDuration: null,
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
        hasSevereAnemia: false, // 是否严重贫血
        hasPainfulRedRash: false,
        hasBloodBlisters: false,
        hasSkinUlcer: false,
        highestTemperature: null, //最高体温
        hasSubcutaneousAndMucosalBleedingCavity: false, //皮下及粘膜出血腔道出血
        hasCongestiveOrPetechialRash: false,
        hasPressureInsensitiveRash: false,
        hasDehydration: false,
        dehydrationSeverity: null,

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

        hasWhiteBloodCells: false, //是否白细胞明显增高
        hasBloodPressureDrop: false, // 是否血压下降
        lowestBloodPressure: null, //最低血压（mmHg）

        hasShockSyndrome: false, //是否休克症候群
        hasHighIntracranialPressure: false, //是否颅压高
        hasTurbidCerebrospinalFluid: false, // 是否脑脊液浊浑

        hasBleeding: false, // 是否出血
        bleedingVolume: null, //INT 出血量（ml）
        bleedingCavity: null, // VARCHAR(255), -- 出血腔道

        hasPlasmaLeakage: false, // 是否血浆渗漏表现
        hasOtherOrganDamage: false, // 是否其他重要脏器损伤

        hasKernigSign: false, // 是否Kernig征
        hasBrudzinskiSign: false, //是否Brudzinski征
      },

      rules: {
        // hasFever: [
        //   { required: true, message: "请选择是否发热", trigger: "blur" },
        // ],
        feverDuration: [
          { required: true, message: "请输入持续时间", trigger: "blur" },
        ],
        highestTemperature: [
          { required: true, message: "请输入最高体温", trigger: "blur" },
        ],
        Dehydration: [
          { required: true, message: "请选择失水程度", trigger: "blur" },
        ],
        hasBloodPressureDrop: [{ required: true, message: "请输入最低血压" }],
        bleedingVolume: [{ required: true }],
        bleedingCavity: [{ required: true }],
      },
    };
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
      // 清空血压下降子项
      if (field === "hasBloodPressureDrop" && !this.form[field]) {
        this.form.lowestBloodPressure = "";
      }
      // 清空出血子项
      if (field === "hasBleeding" && !this.form[field]) {
        this.form.bleedingVolume = "";
        this.form.bleedingCavity = "";
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

    validate() {
      return new Promise((resolve, reject) => {
        // 验证失水
        if (this.form.hasDehydration && !this.form.Dehydration) {
          return reject(new Error("请选择失水程度"));
        }

        // 验证淋巴结肿大
        if (this.form.hasLymphNodeSwelling) {
          const hasSelectedLymphNode =
            this.form.hasLymphNodeSwellingGroin ||
            this.form.hasLymphNodeSwellingArmpit ||
            this.form.hasLymphNodeSwellingSubclavian ||
            this.form.hasLymphNodeSwellingNeck ||
            this.form.hasLymphNodeSwellingElbow ||
            this.form.hasLymphNodeSwellingPopliteal;

          if (!hasSelectedLymphNode) {
            return reject(new Error("请选择淋巴结肿大的部位"));
          }
        }

        // 验证瘙痒性斑丘疹/水疱
        if (this.form.hasItchyRash) {
          const hasSelectedRashLocation =
            this.form.itchyRashOnFingers ||
            this.form.itchyRashOnBackOfHands ||
            this.form.itchyRashOnUpperLimbs ||
            this.form.itchyRashOnLowerLimbs ||
            this.form.itchyRashOnFeet ||
            this.form.itchyRashOnFace ||
            this.form.itchyRashOnOther;

          if (!hasSelectedRashLocation) {
            return reject(new Error("请选择瘙痒性斑丘疹/水疱的部位"));
          }
        }

        // 验证血压下降
        if (this.form.hasBloodPressureDrop && !this.form.lowestBloodPressure) {
          return reject(new Error("请输入最低血压"));
        }

        // 验证出血
        if (this.form.hasBleeding) {
          if (!this.form.bleedingVolume || !this.form.bleedingCavity) {
            return reject(new Error("请填写出血量和出血腔道"));
          }
        }

        // 验证通过
        this.$refs.form.validate((valid) => {
          valid ? resolve() : reject(new Error("表单提交失败，请检查必填字段是否未填写"));
        });
      });
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
        feverDuration: null,
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
        hasSevereAnemia: false, // 是否严重贫血
        hasPainfulRedRash: false,
        hasBloodBlisters: false,
        hasSkinUlcer: false,
        highestTemperature: null, //最高体温
        hasSubcutaneousAndMucosalBleedingCavity: false, //皮下及粘膜出血腔道出血
        hasCongestiveOrPetechialRash: false,
        hasPressureInsensitiveRash: false,
        hasDehydration: false,
        dehydrationSeverity: null,

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

        hasWhiteBloodCells: false, //是否白细胞明显增高
        hasBloodPressureDrop: false, // 是否血压下降
        lowestBloodPressure: null, //最低血压（mmHg）

        hasShockSyndrome: false, //是否休克症候群
        hasHighIntracranialPressure: false, //是否颅压高
        hasTurbidCerebrospinalFluid: false, // 是否脑脊液浊浑

        hasBleeding: false, // 是否出血
        bleedingVolume: null, //INT 出血量（ml）
        bleedingCavity: null, // VARCHAR(255), -- 出血腔道

        hasPlasmaLeakage: false, // 是否血浆渗漏表现
        hasOtherOrganDamage: false, // 是否其他重要脏器损伤

        hasKernigSign: false, // 是否Kernig征
        hasBrudzinskiSign: false, //是否Brudzinski征
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
.NextContainer {
  width: 380px;
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
</style>
