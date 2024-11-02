<template>
  <div class="container">
    <el-form
      :model="form"
      label-width="360px"
      class="form-container"
      ref="form"
      :rules="rules"
      :disabled="allDisabled"
    >
      <div class="GeneralSymptoms">
        <!------------------------------- 接触情况 ---------------------------------->
        <div class="Condition">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">接触情况</span>
          </div>

          <el-form-item
            label="是否接触过发热或有呼吸道症状的患者"
            label-position="left"
            style="margin-left: 15px"
          >
            <div>
              <el-radio-group v-model="form.contactWithFeverPatient">
                <el-radio value="是">是</el-radio>
                <el-radio value="否">否</el-radio>
                <el-radio value="不清楚">不清楚</el-radio>
              </el-radio-group>
            </div>
          </el-form-item>

          <el-form-item
            label="是否接触过有腹泻症状的患者"
            label-position="left"
            style="margin-left: 15px"
          >
            <div>
              <el-radio-group v-model="form.contactWithDiarrheaPatient">
                <el-radio value="是">是</el-radio>
                <el-radio value="否">否</el-radio>
                <el-radio value="不清楚">不清楚</el-radio>
              </el-radio-group>
            </div>
          </el-form-item>

          <el-form-item
            label="是否接触过有皮疹的患者"
            label-position="left"
            style="margin-left: 15px"
          >
            <div>
              <el-radio-group v-model="form.contactWithRashPatient">
                <el-radio :value="'是'">是</el-radio>
                <el-radio :value="'否'">否</el-radio>
                <el-radio :value="'不清楚'">不清楚</el-radio>
              </el-radio-group>
            </div>
          </el-form-item>

          <el-form-item
            label="是否接触过诊断为结核病的患者"
            label-position="left"
            style="margin-left: 15px"
          >
            <div>
              <el-radio-group v-model="form.contactWithTuberculosisPatient">
                <el-radio :value="'是'">是</el-radio>
                <el-radio :value="'否'">否</el-radio>
                <el-radio :value="'不清楚'">不清楚</el-radio>
              </el-radio-group>
            </div>
          </el-form-item>

          <!------------------------------- 就餐情况 ---------------------------------->
          <div class="Condition">
            <div class="title-container">
              <div class="blue-box"></div>
              <span class="title-text">就餐情况(五天内)</span>
            </div>

            <el-form-item label="" style="display: flex; margin-left: -340px">
              <el-checkbox v-model="form.isGroupDining" value="集体堂食就餐"
                >集体堂食就餐</el-checkbox
              >
              <el-checkbox v-model="form.isDiningOut" value="外出就餐"
                >外出就餐</el-checkbox
              >
              <el-checkbox v-model="form.isDiningUnclear" value="不清楚"
                >不清楚</el-checkbox
              >
            </el-form-item>
          </div>

          <div class="Condition">
            <div class="title-container">
              <div class="blue-box"></div>
              <span class="title-text">食物情况(五天内)</span>
            </div>
          </div>
          <el-form-item label="" style="display: flex; margin-left: -340px">
            <el-checkbox v-model="form.hasDrinkingRawWater" value="饮生水"
              >饮生水</el-checkbox
            >
            <el-checkbox v-model="form.hasEatingRawFood" value="吃生冷食品"
              >吃生冷食品</el-checkbox
            >
            <el-checkbox v-model="form.hasEatingColdCookedFood" value="熟食冷吃"
              >熟食冷吃</el-checkbox
            >
            <el-checkbox v-model="form.hasEatingSeafood" value="海水产品"
              >海水产品</el-checkbox
            >
          </el-form-item>

          <el-form-item label="食物名字" style="margin-left: -270px">
            <el-input
              v-model="form.foodnames"
              placeholder="无"
              style="width: 200px"
              clearable
            ></el-input>
          </el-form-item>

          <el-form-item label="就餐地点" style="margin-left: -270px">
            <el-input
              v-model="form.diningPlace"
              placeholder="无"
              style="width: 200px"
              clearable
            ></el-input>
          </el-form-item>
        </div>

        <!------------------------------- 聚集性发病 ---------------------------------->
        <div class="Condition">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">聚集性发病</span>
          </div>
          <el-form-item
            label="同一家庭、办公室、车间等集体单位是否有聚集性发病"
            label-position="left"
            style="margin-left: 20px"
          >
            <div>
              <el-radio-group v-model="form.contactWithRashPatient">
                <el-radio :value="'是'">是</el-radio>
                <el-radio :value="'否'">否</el-radio>
                <el-radio :value="'不清楚'">不清楚</el-radio>
              </el-radio-group>
            </div>
          </el-form-item>
        </div>

        <!------------------------------- 野外活动史 ---------------------------------->
        <div class="Condition">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">野外活动史</span>
          </div>
          <el-form-item
            label="发病前1月内是否在野外/户外住宿或工作"
            label-position="left"
            style="margin-left: 20px"
          >
            <el-radio-group
              v-model="form.outdoorStayOrWorkWithinMonth"
              @change="handleOutdoorChange"
            >
              <el-radio value="是">是</el-radio>
              <el-radio value="否">否</el-radio>
              <el-radio value="不清楚">不清楚</el-radio>
            </el-radio-group>
          </el-form-item>

          <div class="NextContainer">
            <el-form-item
              v-if="form.outdoorStayOrWorkWithinMonth === '是'"
              label="野外/户外活动史"
              label-position="left"
              style="display: block; margin-left: 40px; padding: 15px 0 5px 0"
            >
              <div>
                <el-radio-group
                  v-model="form.wildActivityHistory"
                  style="width: 600px"
                  @change="handleOtherActivityChange"
                >
                  <el-radio value="种地">种地</el-radio>
                  <el-radio value="割草">割草</el-radio>
                  <el-radio value="打猎">打猎</el-radio>
                  <el-radio value="采茶">采茶</el-radio>
                  <el-radio value="放牧">放牧</el-radio>
                  <el-radio value="采伐">采伐</el-radio>
                  <el-radio value="旅游">旅游</el-radio>
                  <el-radio value="其他">其他</el-radio>
                </el-radio-group>
              </div>
            </el-form-item>
            <el-form-item
              label="其他活动名称"
              v-if="form.wildActivityHistory === '其他'"
              label-position="left"
              style="margin-left: 60px; padding-bottom: 15px"
            >
              <el-input
                v-model="form.otherWildActivityname"
                placeholder="无"
                style="width: 200px; margin-left: -60px"
              ></el-input>
            </el-form-item>
          </div>
        </div>

        <!------------------------------- 疾病流行区 ---------------------------------->
        <div class="Condition">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">疾病流行区</span>
          </div>

          <el-form-item
            label="是否到过鼠疫流行区"
            label-position="left"
            style="margin-left: 20px"
          >
            <el-radio-group
              v-model="form.plagueArea"
              @change="clearPlagueLocation"
            >
              <el-radio value="是">是</el-radio>
              <el-radio value="否">否</el-radio>
              <el-radio value="不清楚">不清楚</el-radio>
            </el-radio-group>
          </el-form-item>

          <div class="NextContainer">
            <el-form-item
              label="具体地点"
              v-if="form.plagueArea === '是'"
              label-position="left"
              style="margin-left: 40px; padding-top: 15px; padding-bottom: 15px"
            >
              <el-input
                v-model="form.specificPlagueLocation"
                placeholder="无"
                style="width: 200px; margin-left: -40px"
              ></el-input>
            </el-form-item>
          </div>

          <el-form-item
            label="是否到过炭疽流行区"
            label-position="left"
            style="margin-left: 20px"
          >
            <el-radio-group
              v-model="form.anthraxArea"
              @change="clearAnthraxLocation"
            >
              <el-radio value="是">是</el-radio>
              <el-radio value="否">否</el-radio>
              <el-radio value="不清楚">不清楚</el-radio>
            </el-radio-group>
          </el-form-item>

          <div class="NextContainer">
            <el-form-item
              label="具体地点"
              v-if="form.anthraxArea === '是'"
              label-position="left"
              style="margin-left: 40px; padding-top: 15px; padding-bottom: 15px"
            >
              <el-input
                v-model="form.specificAnthraxLocation"
                placeholder="无"
                style="width: 200px; margin-left: -40px"
              ></el-input>
            </el-form-item>
          </div>

          <el-form-item
            label="是否到过疟疾流行区"
            label-position="left"
            style="margin-left: 20px"
          >
            <el-radio-group
              v-model="form.malariaArea"
              @change="clearMalariaLocation"
            >
              <el-radio value="是">是</el-radio>
              <el-radio value="否">否</el-radio>
              <el-radio value="不清楚">不清楚</el-radio>
            </el-radio-group>
          </el-form-item>
          <div class="NextContainer">
            <el-form-item
              label="具体地点"
              v-if="form.malariaArea === '是'"
              label-position="left"
              style="margin-left: 40px; padding-top: 15px; padding-bottom: 15px"
            >
              <el-input
                v-model="form.specificMalariaLocation"
                placeholder="无"
                style="width: 200px; margin-left: -40px"
              ></el-input>
            </el-form-item>
          </div>
        </div>

        <!------------------------------- 动物接触史 ---------------------------------->
        <div class="Condition">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">动物接触史</span>
          </div>

          <el-form-item
            label="接触过动物制品"
            label-position="left"
            style="margin-left: 20px"
          >
            <el-radio-group
              v-model="form.contactWithAnimalProducts"
              @change="clearContactDate"
            >
              <el-radio value="是">是</el-radio>
              <el-radio value="否">否</el-radio>
              <el-radio value="不清楚">不清楚</el-radio>
            </el-radio-group>
          </el-form-item>
          <div class="NextContainer">
            <el-form-item
              v-if="form.contactWithAnimalProducts === '是'"
              style="margin-left: 40px; padding: 15px 0 15px 0"
              label="接触时间"
              label-position="left"
            >
              <el-date-picker
                v-model="form.contactDate"
                type="date"
                value-format="YYYY-MM-DD"
                placeholder="无"
                style="margin-left: -40px; width:200px"
              />
            </el-form-item>
          </div>

          <el-form-item
            label="接触过动物"
            label-position="left"
            style="margin-left: 20px"
          >
            <el-radio-group
              v-model="form.contactWithAnimals"
              @change="clearContactPlace"
            >
              <el-radio value="是">是</el-radio>
              <el-radio value="否">否</el-radio>
              <el-radio value="不清楚">不清楚</el-radio>
            </el-radio-group>
          </el-form-item>
          <div class="NextContainer">
            <el-form-item
              label="接触地点"
              v-if="form.contactWithAnimals === '是'"
              label-position="left"
              style="margin-left: 40px; padding-top: 15px"
            >
              <el-input
                v-model="form.contactPlace"
                placeholder="无"
                style="width: 200px; margin-left: -40px"
              >
              </el-input>
            </el-form-item>
            <div>
              <el-form-item
                v-if="form.contactWithAnimals === '是'"
                label="接触动物名"
                label-position="left"
                style="
                  margin-left: 40px;
                  display: block;
                  width: 560px;
                  padding-bottom: 5px;
                "
              >
                <el-checkbox v-model="form.hasContactWithRat" value="'鼠'"
                  >鼠</el-checkbox
                >
                <el-checkbox v-model="form.hasContactWithMarmot" value="'旱獭'"
                  >旱獭</el-checkbox
                >
                <el-checkbox v-model="form.hasContactWithLice" value="'虱'"
                  >虱</el-checkbox
                >
                <el-checkbox v-model="form.hasContactWithFlea" value="'蚤'"
                  >蚤</el-checkbox
                >
                <el-checkbox v-model="form.hasContactWithCat" value="'猫'"
                  >猫</el-checkbox
                >
                <el-checkbox v-model="form.hasContactWithBird" value="'鸟'"
                  >鸟</el-checkbox
                >
                <el-checkbox v-model="form.hasContactWithPig" value="'猪'"
                  >猪</el-checkbox
                >
                <el-checkbox v-model="form.hasContactWithHorse" value="'马'"
                  >马</el-checkbox
                >
                <el-checkbox v-model="form.hasContactWithMule" value="'骡'"
                  >骡</el-checkbox
                >
                <el-checkbox v-model="form.hasContactWithDonkey" value="'驴'"
                  >驴</el-checkbox
                >
                <el-checkbox v-model="form.hasContactWithCow" value="'牛'"
                  >牛</el-checkbox
                >
                <el-checkbox v-model="form.hasContactWithSheep" value="'羊'"
                  >羊</el-checkbox
                >
                <el-checkbox v-model="form.hasContactWithDog" value="'狗'"
                  >狗</el-checkbox
                >
                <el-checkbox v-model="form.hasContactWithRabbit" value="'兔'"
                  >兔</el-checkbox
                >
                <el-checkbox v-model="form.hasContactWithWolf" value="'狼'"
                  >狼</el-checkbox
                >
                <el-checkbox v-model="form.hasContactWithTiger" value="'虎'"
                  >虎</el-checkbox
                >
                <el-checkbox
                  v-model="form.hasContactWithOtherAnimal"
                  @change="handleOtherChange"
                  value="'其他'"
                  >其他</el-checkbox
                >
              </el-form-item>
            </div>
            <el-form-item
              label="其他动物名称"
              v-if="form.hasContactWithOtherAnimal"
              label-position="left"
              style="margin-left: 60px"
            >
              <el-input
                v-model="form.OtherAnimalname"
                placeholder="无"
                style="width: 200px; margin-left: -60px; padding-bottom: 15px"
              ></el-input>
            </el-form-item>
          </div>
        </div>

        <!------------------------------- 发病前情况调查 ---------------------------------->
        <div class="Condition">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">发病前情况调查</span>
          </div>

          <el-form-item
            label="发病前一个月居住地类型"
            label-position="left"
            style="margin-left: 20px"
          >
            <el-checkbox value="丘陵或山区" v-model="form.isHillyOrMountainous"
              >丘陵或山区</el-checkbox
            >
            <el-checkbox value="平原" v-model="form.isPlain">平原</el-checkbox>
            <el-checkbox value="其他" v-model="form.isOtherResidenceType"
              >其他</el-checkbox
            >
          </el-form-item>

          <el-form-item
            label="14天内是否明确被蚊虫叮咬过"
            label-position="left"
            style="margin-left: 20px"
          >
            <el-radio-group v-model="form.hasMosquitoBite">
              <el-radio :value="true">是</el-radio>
              <el-radio :value="false">否</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item
            label="发病前2周内是否被蜱叮咬过"
            label-position="left"
            style="margin-left: 20px"
          >
            <el-radio-group v-model="form.tickBite">
              <el-radio value="是">是</el-radio>
              <el-radio value="否">否</el-radio>
              <el-radio value="不知道">不知道</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item
            label="发病是否被跳蚤叮咬过"
            label-position="left"
            style="margin-left: 20px"
          >
            <el-radio-group v-model="form.fleaBite">
              <el-radio value="是">是</el-radio>
              <el-radio value="否">否</el-radio>
              <el-radio value="不知道">不知道</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item
            label="发病前2个月内是否接触鼠类"
            label-position="left"
            style="margin-left: 20px"
          >
            <el-radio-group
              v-model="form.contactWithRatIn2Months"
              @change="clearRatContactMethod"
            >
              <el-radio value="是">是</el-radio>
              <el-radio value="否">否</el-radio>
              <el-radio value="不清楚">不清楚</el-radio>
            </el-radio-group>
          </el-form-item>
          <div class="NextContainer">
            <el-form-item
              label="接触方式"
              label-position="left"
              style="margin-left: 40px; display: block; padding: 15px 0 15px 0"
              v-if="form.contactWithRatIn2Months === '是'"
            >
              <el-radio-group v-model="form.ratContactMethod">
                <el-radio value="挖鼠洞">挖鼠洞</el-radio>
                <el-radio value="拿鼠">拿鼠</el-radio>
                <el-radio value="鼠咬">鼠咬</el-radio>
                <el-radio value="鼠尿">鼠尿</el-radio>
                <el-radio value="鼠粪">鼠粪</el-radio>
                <el-radio value="鼠血污染手">鼠血污染手</el-radio>
                <el-radio value="手被鼠夹打伤">手被鼠夹打伤</el-radio>
                <el-radio value="其他">其他</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>

          <el-form-item
            label="发病前1月内是否吃过被鼠排泄物污染的食物"
            label-position="left"
            style="margin-left: 20px"
          >
            <el-radio-group v-model="form.eatenFoodContaminatedByRatFeces">
              <el-radio value="是">是</el-radio>
              <el-radio value="否">否</el-radio>
              <el-radio value="不清楚">不清楚</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item
            label="发病前1月内是否在野外喝过沟（塘）水"
            label-position="left"
            style="margin-left: 20px"
          >
            <el-radio-group v-model="form.drunkWaterFromDitchesOrPonds">
              <el-radio value="是">是</el-radio>
              <el-radio value="否">否</el-radio>
              <el-radio value="不清楚">不清楚</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item
            label="发病前9天内是否在鼠洞附近坐卧"
            label-position="left"
            style="margin-left: 20px"
          >
            <el-radio-group v-model="form.restedNearRatHoles">
              <el-radio value="是">是</el-radio>
              <el-radio value="否">否</el-radio>
              <el-radio value="不清楚">不清楚</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item
            label="工作场所有无鼠或鼠排泄物"
            label-position="left"
            style="margin-left: 20px"
          >
            <el-radio-group v-model="form.ratOrRatDroppingsAtWorkplace">
              <el-radio value="是">是</el-radio>
              <el-radio value="否">否</el-radio>
              <el-radio value="不清楚">不清楚</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item
            label="发病前1月内是否接触过病人排泄物（血、尿、便等）"
            label-position="left"
            style="margin-left: 20px"
          >
            <el-radio-group v-model="form.contactWithPatientExcreta">
              <el-radio value="是">是</el-radio>
              <el-radio value="否">否</el-radio>
              <el-radio value="不清楚">不清楚</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
import Dateselection from "@/components/date.vue";
import Adduserdialog from "../../../../user/alluser/components/adduserdialog.vue";
export default {
  components: {
    Dateselection,
    Adduserdialog,
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
        contactWithFeverPatient: null, // 与发热患者接触情况
        contactWithDiarrheaPatient: null, // 与腹泻患者接触情况
        contactWithRashPatient: null, // 与皮疹患者接触情况
        contactWithTuberculosisPatient: null, // 与结核病患者接触情况

        isGroupDining: false, // 5天内是否集体堂食就餐
        isDiningOut: false, // 5天内是否外出就餐
        isDiningUnclear: false, // 5天内就餐情况不清楚

        hasDrinkingRawWater: false, // 是否饮生水
        hasEatingRawFood: false, // 是否吃生冷食品
        hasEatingColdCookedFood: false, // 是否熟食冷吃
        hasEatingSeafood: false, // 是否吃海水产品

        foodnames: null, // 食物名字
        diningPlace: null, // 就餐地点

        groupOutbreak: null, // 同一家庭、办公室、车间等集体单位是否有聚集性发病
        outdoorStayOrWorkWithinMonth: null, // 发病前1月内是否在野外住宿或工作
        wildActivityHistory: null, // 野外/户外活动史
        otherWildActivityname: null, // 其他活动名称

        plagueArea: null, // 是否到过鼠疫流行区
        specificPlagueLocation: null, // 具体地点

        anthraxArea: null, // 是否到过炭疽流行区
        specificAnthraxLocation: null, // 具体地点

        malariaArea: null, // 是否到过疟疾流行区
        specificMalariaLocation: null, // 具体地点

        contactWithAnimalProducts: null, // 是否接触过动物制品
        contactDate: null, //接触时间

        contactWithAnimals: null, // 是否接触过动物
        contactPlace: null, //  接触地点
        hasContactWithRat: false,
        hasContactWithMarmot: false,
        hasContactWithLice: false,
        hasContactWithFlea: false,
        hasContactWithCat: false,
        hasContactWithBird: false,
        hasContactWithPig: false,
        hasContactWithHorse: false,
        hasContactWithMule: false,
        hasContactWithDonkey: false,
        hasContactWithCow: false,
        hasContactWithSheep: false,
        hasContactWithDog: false,
        hasContactWithRabbit: false,
        hasContactWithWolf: false,
        hasContactWithTiger: false,
        hasContactWithOtherAnimal: false, // 是否接触其他动物
        otherAnimalname: null,

        hillyOrMountainous: false, // 是否居住在丘陵或山区
        plain: false, //是否居住在平原
        isOtherResidenceType: false, // 是否居住在其他地区

        // 如果这里设置成null，那么这个选项必选
        hasMosquitoBite: null, // 14天内是否明确被蚊虫叮咬过
        tickBite: null, //发病前2周内是否被蜱叮咬过
        fleaBite: null, // 发病是否被跳蚤叮咬过
        contactWithRatIn2Months: null, // 发病前2个月内是否接触鼠类
        ratContactMethod: null, // 接触方式
        eatenFoodContaminatedByRatFeces: null, //发病前1月内是否吃过被鼠排泄物污染的食物
        drunkWaterFromDitchesOrPonds: null, // ENUM('是', '否', '不清楚'), -- 19. 发病前1月内是否在野外喝过沟（塘）水
        restedNearRatHoles: null, // ENUM('是', '否', '不清楚'), -- 20. 发病前9天内是否在鼠洞附近坐卧
        ratOrRatDroppingsAtWorkplace: null, // ENUM('是', '否', '不清楚'), -- 21. 工作场所有无鼠或鼠排泄物
        contactWithPatientExcreta: null, // ENUM('是', '否', '不清楚') -- 22. 发病前1月内是否接触过病人排泄物（血、尿、便等）
      },

      rules: {},
    };
  },
watch: {
  data: {
    immediate: true,
    handler(newVal) {
      console.log("危险因素与暴露史接收:", newVal); // 打印传入的数据
      if (newVal) {
        // 处理 contactDate 格式
        if (Array.isArray(newVal.contactDate) && newVal.contactDate.length === 3) {
          const [year, month, day] = newVal.contactDate;
          // 手动格式化为 YYYY-MM-DD
          newVal.contactDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        }

        // 将所有数据映射到 form
        this.form = { ...this.form, ...newVal };
        // 强制更新渲染视图
        this.$forceUpdate();
      } else {
      }
    },
  },
},


  methods: {
    toggleTag(field) {
      this.form[field] = !this.form[field];
    },
    showDrawer(user) {
      this.form = { ...user };
      this.visible = true;
    },
    handleCancel() {
      this.visible = false;
      this.handleReset();
    },

    // 是否在野外活动，若否/不清楚，则野外活动史清除
    handleOutdoorChange() {
      if (this.form.outdoorStayOrWorkWithinMonth != "是") {
        this.form.wildActivityHistory = "";
        this.form.otherWildActivityname = "";
      }
    },

    handleOtherActivityChange() {
      if (this.form.wildActivityHistory != "其他") {
        // this.WildActivityHistory="";
        this.form.otherWildActivityname = "";
      }
    },

    // 疾病流行区
    clearPlagueLocation() {
      if (this.form.plagueArea !== "是") {
        this.form.specificPlagueLocation = ""; // 清空具体地点
      }
    },
    clearAnthraxLocation() {
      if (this.form.anthraxArea !== "是") {
        this.form.specificAnthraxLocation = ""; // 清空具体地点
      }
    },
    clearMalariaLocation() {
      if (this.form.malariaArea !== "是") {
        this.form.secificMalariaLocation = ""; // 清空具体地点
      }
    },
    clearContactDate() {
      if (this.form.contactWithAnimalProducts !== "是") {
        this.form.contactDate = "";
      }
    },
    clearContactPlace() {
      if (this.form.contactWithAnimals !== "是") {
        this.form.contactPlace = "";
        this.form.hasContactWithRat = false;
        this.form.hasContactWithMarmot = false;
        this.form.hasContactWithLice = false;
        this.form.hasContactWithFlea = false;
        this.form.hasContactWithCat = false;
        this.form.hasContactWithBird = false;
        this.form.hasContactWithPig = false;
        this.form.hasContactWithHorse = false;
        this.form.hasContactWithMule = false;
        this.form.hasContactWithDonkey = false;
        this.form.hasContactWithCow = false;
        this.form.hasContactWithSheep = false;
        this.form.hasContactWithDog = false;
        this.form.hasContactWithRabbit = false;
        this.form.hasContactWithWolf = false;
        this.form.hasContactWithTiger = false;
        this.form.hasContactWithOtherAnimal = false; // 是否接触其他动物
      }
    },

    handleOtherChange() {
      if (!this.form.hasContactWithOtherAnimal) {
        this.form.OtherAnimalname = "";
      }
    },
    clearRatContactMethod() {
      if (this.form.ContactWithRatIn2Months !== "是") {
        this.form.RatContactMethod = "";
      }
    },

    handleReset() {
      this.form = this.getInitialForm();
      this.message = "";
    },
    getInitialForm() {
      return {
        contactWithFeverPatient: null, // 与发热患者接触情况
        contactWithDiarrheaPatient: null, // 与腹泻患者接触情况
        contactWithRashPatient: null, // 与皮疹患者接触情况
        contactWithTuberculosisPatient: null, // 与结核病患者接触情况

        isGroupDining: false, // 5天内是否集体堂食就餐
        isDiningOut: false, // 5天内是否外出就餐
        isDiningUnclear: false, // 5天内就餐情况不清楚

        hasDrinkingRawWater: false, // 是否饮生水
        hasEatingRawFood: false, // 是否吃生冷食品
        hasEatingColdCookedFood: false, // 是否熟食冷吃
        hasEatingSeafood: false, // 是否吃海水产品

        foodnames: null, // 食物名字
        diningPlace: null, // 就餐地点

        groupOutbreak: null, // 同一家庭、办公室、车间等集体单位是否有聚集性发病
        outdoorStayOrWorkWithinMonth: null, // 发病前1月内是否在野外住宿或工作
        wildActivityHistory: null, // 野外/户外活动史
        otherWildActivityname: null, // 其他活动名称

        plagueArea: null, // 是否到过鼠疫流行区
        specificPlagueLocation: null, // 具体地点

        anthraxArea: null, // 是否到过炭疽流行区
        specificAnthraxLocation: null, // 具体地点

        malariaArea: null, // 是否到过疟疾流行区
        specificMalariaLocation: null, // 具体地点

        contactWithAnimalProducts: null, // 是否接触过动物制品
        contactDate: null, //接触时间

        contactWithAnimals: null, // 是否接触过动物
        contactPlace: null, //  接触地点
        hasContactWithRat: false,
        hasContactWithMarmot: false,
        hasContactWithLice: false,
        hasContactWithFlea: false,
        hasContactWithCat: false,
        hasContactWithBird: false,
        hasContactWithPig: false,
        hasContactWithHorse: false,
        hasContactWithMule: false,
        hasContactWithDonkey: false,
        hasContactWithCow: false,
        hasContactWithSheep: false,
        hasContactWithDog: false,
        hasContactWithRabbit: false,
        hasContactWithWolf: false,
        hasContactWithTiger: false,
        hasContactWithOtherAnimal: false, // 是否接触其他动物
        otherAnimalname: null,

        hillyOrMountainous: false, // 是否居住在丘陵或山区
        plain: false, //是否居住在平原
        isOtherResidenceType: false, // 是否居住在其他地区

        // 如果这里设置成null，那么这个选项必选
        hasMosquitoBite: null, // 14天内是否明确被蚊虫叮咬过
        tickBite: null, //发病前2周内是否被蜱叮咬过
        fleaBite: null, // 发病是否被跳蚤叮咬过
        contactWithRatIn2Months: null, // 发病前2个月内是否接触鼠类
        ratContactMethod: null, // 接触方式
        eatenFoodContaminatedByRatFeces: null, //发病前1月内是否吃过被鼠排泄物污染的食物
        drunkWaterFromDitchesOrPonds: null, // ENUM('是', '否', '不清楚'), -- 19. 发病前1月内是否在野外喝过沟（塘）水
        restedNearRatHoles: null, // ENUM('是', '否', '不清楚'), -- 20. 发病前9天内是否在鼠洞附近坐卧
        ratOrRatDroppingsAtWorkplace: null, // ENUM('是', '否', '不清楚'), -- 21. 工作场所有无鼠或鼠排泄物
        contactWithPatientExcreta: null, // ENUM('是', '否', '不清楚') -- 22. 发病前1月内是否接触过病人排泄物（血、尿、便等）
      };
    },

    getData() {
      return this.form; // 返回当前组件的表单数据
    },
  },
};
</script>


<style src="@/styles/NextContainer.css" scoped></style>
<style  scoped>
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
  margin-top: 30px;
}
.el-form-item {
  display: flex;
  /* flex-direction: column; */
}

.el-radio-group {
  margin-top: 5px;
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
</style>