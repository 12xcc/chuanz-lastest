<template>
<!-- 暂时弃用 -->
  <el-drawer
    :model-value="visible"
    direction="rtl"
    size="800px"
    :with-header="false"
    custom-class="custom-drawer"
    @close="handleCancel"
  >
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
                <!-- <img :src="item.imgSrc" alt=""/> -->
            </div>
        </div>
    </div>
  </div>
    </el-drawer>
</template>

<script>
import { onMounted } from 'vue';
import { CountUp } from 'countup.js';
import { getSatisfactionNumberInfo } from '@/api/satisfaction/satisfaction.js'; // 引入满意度统计接口

export default {
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
    };
  },
  methods: {
    startCountAnimation() {
      this.cardData.forEach((item, index) => {
        const countUp = new CountUp(`card-data-${index}`, item.data);
        countUp.start();
      });
    },

    async fetchCardSatisfactionData(surveyID) {
      try {
        const response = await getSatisfactionNumberInfo(surveyID);
        if (response.data.code === 1) {
          const data = response.data.data;
          this.cardData[0].data = 
            data.veryHappy + data.happy + data.normal + data.noHappy + data.veryNoHappy; // 总提交人数
          this.cardData[1].data = data.veryHappy; // 非常满意人数
          this.cardData[2].data = data.happy; // 满意人数
          this.cardData[3].data = data.normal; // 一般人数
          this.cardData[4].data = data.noHappy; // 不满意人数
          this.cardData[5].data = data.veryNoHappy; // 非常不满意人数

          this.startCountAnimation(); // 启动动画
        } else {
          this.$message.error("获取满意度统计数据失败，请重试！");
        }
      } catch (error) {
        console.error("Error fetching satisfaction data:", error);
        this.$message.error("获取满意度统计数据失败，请重试！");
      }
    }
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
</style>
