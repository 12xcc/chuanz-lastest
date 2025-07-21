<template>
  <div class="container">
    <div class="title-container">
        <div class="blue-box"></div>
        <span class="title-text">打卡数据监控大屏</span>
    </div>
    <div class="card-container">
        <div class="card" v-for="(item, index) in cardData" :key="index">
            <div class="card-title">{{ item.title }}</div>
            <div class="card-bottom">
                <div class="card-data" :id="'card-data-' + index">{{ item.data }}</div>
                <img :src="item.imgSrc" alt=""/>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { CountUp } from 'countup.js';
import allusernumber from '@/assets/screenimgs/allusernumber.svg';
import allcheckinnumber from '@/assets/screenimgs/allcheckinnumber.svg';
import todaycheckin from '@/assets/screenimgs/todaycheckin.svg';
import todayhealth from '@/assets/screenimgs/todayhealth.svg';
import todaydisease from '@/assets/screenimgs/todaydisease.svg';
import todaynotcheckin from '@/assets/screenimgs/todaynotcheckin.svg';
import { getStatisticsData } from '@/api/report/screen.js';
import { watch, onMounted } from 'vue';

export default {
  props: {
    queryDate: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      cardData: [
        { title: "职工总人数 (人)", data: 0, imgSrc: allusernumber },
        { title: "打卡总次数 (次)", data: 0, imgSrc: allcheckinnumber },
        { title: "今日打卡人数 (人)", data: 0, imgSrc: todaycheckin },
        { title: "今日健康人数 (人)", data: 0, imgSrc: todayhealth },
        { title: "今日患病人数 (人)", data: 0, imgSrc: todaydisease },
        { title: "今日未打卡人数 (人)", data: 0, imgSrc: todaynotcheckin }
      ]
    };
  },
  methods: {
    startCountAnimation() {
      this.cardData.forEach((item, index) => {
        const countUp = new CountUp(`card-data-${index}`, item.data);
        countUp.start();
      });
    },

    async fetchStatisticsData(date) {
      try {
        const response = await getStatisticsData(date); // 传入日期参数
        if (response.data.code === 1) {
          const statistics = response.data.data;
          this.cardData[0].data = statistics.userNumber; // 总人数
          this.cardData[1].data = statistics.checkInNumber; // 总打卡数
          this.cardData[2].data = statistics.userHealthNumber + statistics.userDiseaseNumber; // 今日打卡人数
          this.cardData[3].data = statistics.userHealthNumber; // 今日健康人数
          this.cardData[4].data = statistics.userDiseaseNumber; // 今日患病人数
          this.cardData[5].data = statistics.userNumber - (statistics.userHealthNumber + statistics.userDiseaseNumber); // 今日未打卡人数

          this.startCountAnimation(); // 动画
        } else {
          this.$message.error("获取统计数据失败，请重试！");
        }
      } catch (error) {
        console.error("Error fetching statistics data:", error);
        this.$message.error("获取统计数据失败，请重试！");
      }
    }
  },
  mounted() {
    if (this.queryDate) {
      this.fetchStatisticsData(this.queryDate);
    }
  },
  watch: {
    queryDate: {
      immediate: true,
      handler(newDate) {
        if (newDate) {
          this.fetchStatisticsData(newDate);
        }
      },
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
  width: 250px;
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
</style>
