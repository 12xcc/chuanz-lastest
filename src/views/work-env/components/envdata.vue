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
        <h3>查看用户工作环境</h3>
      </div>
      <el-form
        :model="form"
        label-width="166px"
        class="form-container"
        ref="form"
        :rules="rules"
        disabled
      >
        <div class="WorkEnvironmentBaseInfo">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">工作环境基本信息</span>
          </div>
          <el-form-item label="工务段海拔高度(米)" prop="WorkStationAltitude">
            <el-input
              v-model="form.WorkStationAltitude"
              style="width: 200px"
              
              clearable
            ></el-input>
          </el-form-item>

          <el-form-item label="工务段名称" prop="workStationName">
            <el-input
              v-model="form.workStationName"
              style="width: 200px"
              
              clearable
            ></el-input>
          </el-form-item>

          <div class="Dormitory">
            <el-form-item label="宿舍幢数" prop="DormitoryBuildingNumber">
              <el-input
                v-model="form.DormitoryBuildingNumber"
                style="width: 80px"
                
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item
              label="宿舍室数"
              prop="DormitoryRoomNumber"
              class="DormitoryRoomNumber"
            >
              <el-input
                v-model="form.DormitoryRoomNumber"
                style="width: 80px"
               
                clearable
              ></el-input>
            </el-form-item>

            <el-form-item
              label="同居人数"
              prop="DormitoryOccupants"
              class="DormitoryOccupants"
            >
              <el-input
                v-model="form.DormitoryOccupants"
                style="width: 80px"
                
                clearable
              ></el-input>
            </el-form-item>
          </div>

          <el-form-item label="宿舍面积(㎡)" prop="DormitoryArea">
            <el-input
              v-model="form.DormitoryArea"
              style="width: 200px"
              
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="宿舍窗户可打开面积(㎡)" prop=" WindowOpenArea">
            <el-input
              v-model="form.WindowOpenArea"
              style="width: 200px"
              
              clearable
            ></el-input>
          </el-form-item>

          <el-form-item
            label="宿舍通风"
            prop="VentilationCondition"
            size="default"
          >
            <el-select
              v-model="form.VentilationCondition"
              
              clearable
              size="default"
              style="width: 200px"
            >
              <el-option value="不开窗通风" label="不开窗通风" ></el-option>
              <el-option value="不定时开窗通风"  label="不定时开窗通风" ></el-option>
              <el-option value="每日开窗通风" label="每日开窗通风"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="WorkEnvironmentInfo">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">本月情况</span>
          </div>

          <div class="daytime">
            <p>
              上一周
              <span class="highlight">白天</span>
              工作时间段，平均大约和
              <el-input
                v-model="form.AvgWorkRoomPeople"
                
                size="small"
                class="Monthsocial"
              />
              人处于同一房间/空间，大约和
              <el-input
                v-model="form.AvgWorkFaceToFace"
                
                size="small"
                class="Monthsocial"
              />
              人进行了面对面语言交流（1米以内），大约和
              <el-input
                v-model="form.AvgWorkPhysicalContact"
                
                size="small"
                class="Monthsocial"
              />
              人进行了肢体接触（如握手）。
            </p>
          </div>

          <!-- 上一周早餐 -->
          <div class="breakfast">
            <p>
              上一周
              <span class="highlight">早餐</span>
              时间段，平均大约和
              <el-input
                v-model="form.AvgBreakfastRoomPeople"
                
                size="small"
                class="Monthsocial"
              />
              人处于同一房间/空间，大约和
              <el-input
                v-model="form.AvgBreakfastFaceToFace"
                
                size="small"
                class="Monthsocial"
              />
              人进行了面对面语言交流（1米以内），大约和
              <el-input
                v-model="form.AvgBreakfastPhysicalContact"
                
                size="small"
                class="Monthsocial"
              />
              人进行了肢体接触（如握手）。
            </p>
          </div>

          <!-- 上一周午餐 -->
          <div class="lunch">
            <p>
              上一周
              <span class="highlight">午餐</span>
              时间段，平均大约和
              <el-input
                v-model="form.AvgLunchRoomPeople"
                
                size="small"
                class="Monthsocial"
              />
              人处于同一房间/空间，大约和
              <el-input
                v-model="form.AvgLunchFaceToFace"
                
                size="small"
                class="Monthsocial"
              />
              人进行了面对面语言交流（1米以内），大约和
              <el-input
                v-model="form.AvgLunchPhysicalContact"
                
                size="small"
                class="Monthsocial"
              />
              人进行了肢体接触（如握手）。
            </p>
          </div>

          <!-- 上一周晚餐 -->
          <div class="dinner">
            <p>
              上一周
              <span class="highlight">晚餐</span>
              时间段，平均大约和
              <el-input
                v-model="form.AvgDinnerRoomPeople"
                
                size="small"
                class="Monthsocial"
              />
              人处于同一房间/空间，大约和
              <el-input
                v-model="form.AvgDinnerFaceToFace"
                
                size="small"
                class="Monthsocial"
              />
              人进行了面对面语言交流（1米以内），大约和
              <el-input
                v-model="form.AvgDinnerPhysicalContact"
                
                size="small"
                class="Monthsocial"
              />
              人进行了肢体接触（如握手）。
            </p>
          </div>

          <!-- 上一周一共参加的活动 -->
          <div class="activity">
            <p>
              上一周
              <span class="highlight">共参加</span>
              <el-input
                v-model="form.CollectiveActivitiesCount"
                
                size="small"
                class="Monthsocial"
              />
              次集体性活动（如开会），每次平均大约和
              <el-input
                v-model="form.AvgActivityRoomPeople"
                
                size="small"
                class="Monthsocial"
              />
              人处于同一房间/空间，大约和
              <el-input
                v-model="form.AvgActivityFaceToFace"
                
                size="small"
                class="Monthsocial"
              />
              人进行了语言交流（1米以内），大约和
              <el-input
                v-model="form.AvgActivityPhysicalContact"
                
                size="small"
                class="Monthsocial"
              />
              人进行了肢体接触（如握手）。
            </p>
          </div>
        </div>

        <div class="TemandPre">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">本月气温气压情况</span>
          </div>
          <el-form-item label="当月平均气压(kPa)" prop="AvgMonthlyPressure">
            <el-input
              v-model="form.AvgMonthlyPressure"
              style="width: 200px"
              
              clearable
            ></el-input>
          </el-form-item>

          <el-form-item label="当月最高气温(℃)" prop="MaxTemperature">
            <el-input
              v-model="form.MaxTemperature"
              style="width: 200px"
              
              clearable
            ></el-input>
          </el-form-item>

          <el-form-item label="当月最低气温(℃)" prop="MinTemperature">
            <el-input
              v-model="form.MinTemperature"
              style="width: 200px"
              
              clearable
            ></el-input>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </el-drawer>
</template>

<script>
import { ElMessage } from "element-plus";
import Dateselection from "@/components/date_selection.vue";
import { checkWorkenvDataById } from "@/api/workenv/workenv.js";
export default {
  components: {
    Dateselection,
  },
  data() {
    return {
      visible: false, // 控制弹窗显示
      form: {
        WorkStationAltitude: "",
        workStationName: "",
        DormitoryBuildingNumber: "",
        DormitoryRoomNumber: "",
        DormitoryOccupants: "",
        DormitoryArea: "",
        WindowOpenArea: "",
        VentilationCondition: "",
        AvgWorkRoomPeople: "",
        AvgWorkFaceToFace: "",
        AvgWorkPhysicalContact: "",

        AvgBreakfastRoomPeople: "",
        AvgBreakfastFaceToFace: "",
        AvgBreakfastPhysicalContact: "",

        AvgLunchRoomPeople: "",
        AvgLunchFaceToFace: "",
        AvgLunchPhysicalContact: "",

        AvgDinnerRoomPeople: "",
        AvgDinnerFaceToFace: "",
        AvgDinnerPhysicalContact: "",

        CollectiveActivitiesCoun: "",
        AvgActivityRoomPeople: "",
        AvgActivityFaceToFace: "",
        AvgActivityPhysicalContact: "",

        AvgMonthlyPressure: "",
        MaxTemperature: "",
        MinTemperature: "",
      },

      rules: {},
    };
  },
  methods: {
    showDrawer(environmentId) {
      this.visible = true;
      this.getWorkenvById(environmentId);
    },
    // 根据id获取工作环境信息
    async getWorkenvById(environmentId) {
      try {
        const response = await checkWorkenvDataById(environmentId);
        if (response.data.code === 1) {
          const data = response.data.data;

          // 将后端返回的数据映射到表单数据 (form) 中
          this.form.WorkStationAltitude = data.workStationAltitude;
          this.form.workStationName = data.workStationName;
          this.form.DormitoryBuildingNumber =
            data.dormitoryBuildingNumber;
          this.form.DormitoryRoomNumber = data.dormitoryRoomNumber;
          this.form.DormitoryOccupants = data.dormitoryOccupants;
          this.form.DormitoryArea = data.dormitoryArea;
          this.form.WindowOpenArea = data.windowOpenArea;
          this.form.VentilationCondition = data.ventilationCondition;
          this.form.AvgWorkRoomPeople = data.avgWorkRoomPeople;
          this.form.AvgWorkFaceToFace = data.avgWorkFaceToFace;
          this.form.AvgWorkPhysicalContact = data.avgWorkPhysicalContact;

          this.form.AvgBreakfastRoomPeople = data.avgBreakfastRoomPeople;
          this.form.AvgBreakfastFaceToFace = data.avgBreakfastFaceToFace;
          this.form.AvgBreakfastPhysicalContact =
            data.avgBreakfastPhysicalContact;

          this.form.AvgLunchRoomPeople = data.avgLunchRoomPeople;
          this.form.AvgLunchFaceToFace = data.avgLunchFaceToFace;
          this.form.AvgLunchPhysicalContact =
            data.avgLunchPhysicalContact;

          this.form.AvgDinnerRoomPeople = data.avgDinnerRoomPeople;
          this.form.AvgDinnerFaceToFace = data.avgDinnerFaceToFace;
          this.form.AvgDinnerPhysicalContact =
            data.avgDinnerPhysicalContact;

          this.form.CollectiveActivitiesCount =
            data.collectiveActivitiesCount;
          this.form.AvgActivityRoomPeople = data.avgActivityRoomPeople;
          this.form.AvgActivityFaceToFace = data.avgActivityFaceToFace;
          this.form.AvgActivityPhysicalContact =
            data.avgActivityPhysicalContact;

          this.form.AvgMonthlyPressure = data.avgMonthlyPressure;
          this.form.MaxTemperature = data.maxTemperature;
          this.form.MinTemperature = data.minTemperature;
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
  },
};
</script>



<style  scoped>
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
  padding-bottom: 25px;
  z-index: 100;
  border: 3px solid #fafafa;
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

.Dormitory {
  display: flex;
}
.DormitoryRoomNumber {
  margin-left: -60px;
}
.DormitoryOccupants {
  margin-left: -60px;
}

.WorkEnvironmentInfo {
  margin-top: 30px;
  margin-bottom: 30px;
}

p {
  font-size: 14px;
  margin-bottom: 15px;
}
.highlight {
  color: #285ac8;
  font-weight: bold;
}

.Monthsocial {
  width: 80px;
  display: inline-block;
  margin: 5px;
  font-size: 14px;
  color: #285ac8;
}
</style>
