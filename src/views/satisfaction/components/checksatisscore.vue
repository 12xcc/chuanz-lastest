<template>
  <div>
    <!-- Drawer Section -->
    <el-drawer
      :model-value="visible"
      direction="rtl"
      size="800px"
      :with-header="false"
      custom-class="custom-drawer"
      @close="handleCancel"
    >
      <div class="container">
        <div class="title">
          <h3>具体满意度反馈列表——{{ title }}</h3>
        </div>

        <!-- 卡片 -->
        <div class="container">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">满意度统计(单位：人)</span>
          </div>
          <div class="card-container">
            <div class="card" v-for="(item, index) in cardData" :key="index">
              <div class="card-title">{{ item.title }}</div>
              <div class="card-bottom">
                <div class="card-data" :id="'card-data-' + index">{{ item.data }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 表格 -->
        <div class="usertable">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">满意度统计列表</span>
          </div>
          <el-table
            :header-cell-style="{
              height: '40px',
              background: '#f5f7fa',
              color: '#333333',
            }"
            v-loading="loading"
            :data="allData"
            style="width: 100%"
            :height="tableHeight"
            :show-overflow-tooltip="true"
          >
            <el-table-column type="selection" width="55" />
            <el-table-column prop="serialNumber" label="序号" width="150" />
            <el-table-column
              prop="phoneNumber"
              label="用户手机号码"
              width="200"
            />
            <el-table-column
              prop="satisfactionLevel"
              label="满意度等级"
              width="180"
            >
              <template #default="scope">
                <el-tag
                  :type="
                    scope.row.satisfactionLevel === '非常满意'? 'success'
                      : scope.row.satisfactionLevel === '满意'
                      ? 'primary'
                      : scope.row.satisfactionLevel === '一般'
                      ? 'warning'
                      : scope.row.satisfactionLevel === '不满意'
                      ? 'danger'
                      : 'info'
                  "
                >
                  {{ scope.row.satisfactionLevel }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="ratingTime" label="打分时间" width="180" />
          </el-table>

          <!-- 分页 -->
          <pagination
            v-show="total > 0"
            :total="total"
            v-model:current-page="queryParams.pageNum"
            v-model:page-size="queryParams.pageSize"
            @pagination="handlePagination"
          />
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import { CountUp } from 'countup.js';
import Pagination from "@/components/pagination.vue";
import { getSatisfactionNumberInfo, pageSelectSatisfactionRating } from "@/api/satisfaction/satisfaction.js";

export default {
  components: {
    Pagination,
  },
  data() {
    return {
      cardData: [
        { title: "总提交人数", data: 0 },
        { title: "非常满意", data: 0 },
        { title: "满意", data: 0 },
        { title: "一般", data: 0 },
        { title: "不满意", data: 0 },
        { title: "非常不满意", data: 0 }
      ],
      queryParams: {
        pageNum: 1,
        pageSize: 15,
        surveyID: null,
      },
      visible: false,
      allData: [],
      total: 0,
      loading: false,
      title: null,
    };
  },
  computed: {
    tableHeight() {
      return window.innerHeight - 460;
    },
  },
  methods: {
    startCountAnimation() {
      this.cardData.forEach((item, index) => {
        const countUp = new CountUp(`card-data-${index}`, item.data);
        countUp.start();
      });
    },
    showDrawer(surveyID, title) {
      this.visible = true;
      this.title = title;
      this.queryParams.surveyID = surveyID;
      this.fetchSatisfactionData();
      this.fetchCardSatisfactionData(this.queryParams.surveyID);
    },

    // 获取统计数据
    async fetchCardSatisfactionData(surveyID) {
      try {
        const response = await getSatisfactionNumberInfo(surveyID);
        if (response.data.code === 1) {
          const data = response.data.data;
          this.cardData[0].data = data.veryHappy + data.happy + data.normal + data.noHappy + data.veryNoHappy;
          this.cardData[1].data = data.veryHappy;
          this.cardData[2].data = data.happy;
          this.cardData[3].data = data.normal;
          this.cardData[4].data = data.noHappy;
          this.cardData[5].data = data.veryNoHappy;
          this.startCountAnimation();
        } else {
          this.$message.error("获取满意度统计数据失败，请重试！");
        }
      } catch (error) {
        console.error("Error fetching satisfaction data:", error);
        this.$message.error("获取满意度统计数据失败，请重试！");
      }
    },

    // 表格数据
    async fetchSatisfactionData() {
      this.loading = true;
      try {
        const params = {
          pageNo: this.queryParams.pageNum,
          pageNumber: this.queryParams.pageSize,
          surveyID: this.queryParams.surveyID,
        };
        const response = await pageSelectSatisfactionRating(params);

        if (response.data.code === 1) {
          this.allData = response.data.data.records.map((item, index) => {
            const formattedRatingTime = this.formatRatingTime(item.ratingTime);

            return {
              serialNumber:
                (this.queryParams.pageNum - 1) * this.queryParams.pageSize +
                index +
                1,
              phoneNumber: item.phoneNumber,
              satisfactionLevel: item.satisfactionLevel,
              ratingTime: formattedRatingTime,
            };
          });
          this.total = response.data.data.total;
        } else {
          this.$message.error("获取满意度数据失败，请重试！");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        this.$message.error("获取满意度数据失败，请重试！");
      } finally {
        this.loading = false;
      }
    },
    formatRatingTime(ratingTimeArray) {
      if (!ratingTimeArray || ratingTimeArray.length < 5) return "";
      const [year, month, day, hour, minute, second = 0] = ratingTimeArray;
      return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(
        2,
        "0"
      )} ${String(hour).padStart(2, "0")}:${String(minute).padStart(
        2,
        "0"
      )}:${String(second).padStart(2, "0")}`;
    },
    handleCancel() {
      this.visible = false;
    },
    handlePagination({ page, limit }) {
      this.queryParams.pageNum = page;
      this.queryParams.pageSize = limit;
      this.fetchSatisfactionData();
    },
  },
};
</script>

<style scoped>
.container {
  margin-top: 40px;
  width: 100%;
  height: auto;
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
.card-container {
  display: flex;
}
.card {
  background: #FAFAFA;
  border-radius: 10px;
  height: 130px;
  width: 100px;
  margin: 8px;
}
.card-title {
  margin: 15px;
  font-size: 14px;
  font-weight: 550;
  color: #4A4A4A;
}
.card-bottom {
  display: flex;
}
img {
  height: 50px;
  width: 50px;
  margin-left: 50px;
  margin-top: 5px;
}
.card-data {
  width: 74px;
  font-size: 24px;
  margin-top: 15px;
  margin-left: 15px;
  font-weight: bold;
  color: #333333;
}
.custom-button {
  margin: 0 5px;
}
.usertable {
  margin-top: 20px;
}
.el-table th,
.el-table td {
  text-align: center;
}
</style>
