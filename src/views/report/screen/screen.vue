<template>
  <div class="container">
    <div class="title">川藏铁路突发传染病自主判别和现场调查软件数据大屏</div>

    <el-form
      :inline="true"
      class="demo-form-inline"
      style="margin-top: 30px; margin-left: 20px; margin-bottom: -10px"
    >
      <el-form-item label="选择日期">
        <el-date-picker
          v-model="selectedDate"
          type="date"
          placeholder="选择日期"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          :disabled-date="disabledFutureDate"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onConfirm">确 定</el-button>
      </el-form-item>
    </el-form>

    <!-- 只有点击确定按钮后才传 queryDate 给子组件 -->
    <Card :queryDate="queryDate" />
    <div class="elsedata">
      <div class="chartspartone">
        <Chart01 :queryDate="queryDate"/>
        <Chart02 :queryDate="queryDate" />
        <Chart03 />
      </div>
      <div class="Map">
        <Map :queryDate="queryDate"/>
      </div>
      <div class="chartspartthree">
        <Chart04 />
        <Chart05 />
      </div>
    </div>
  </div>
</template>

<script>
import Card from './components/card.vue';
import Chart01 from './components/chart01.vue';
import Chart02 from './components/chart02.vue';
import Chart03 from './components/chart03.vue';
import Map from './components/map.vue';
import Chart04 from './components/chart04.vue';
import Chart05 from './components/chart05.vue';

export default {
  components: {
    Card,
    Chart01,
    Chart02,
    Chart03,
    Map,
    Chart04,
    Chart05,
  },
  data() {
    return {
      selectedDate: '', // 用户选中的日期，但不立即传给子组件
      queryDate: '',     // 点击确定后才赋值给这个传递给子组件
    };
  },
  methods: {
    onConfirm() {
      if (!this.selectedDate) {
        const now = new Date();
        this.queryDate = now.toISOString().slice(0, 10);
      } else {
        this.queryDate = this.selectedDate;
      }
    },
  },
  mounted() {
    // 初始化默认值
    const now = new Date();
    const today = now.toISOString().slice(0, 10);
    this.selectedDate = today;
    this.queryDate = today;
  },
};
</script>


<style scoped>
.container{
  background: #FFFFFF;
  width:100%;
  height: auto;
  border-radius: 5px;
}

.title{
    text-align: center;
    width: 100%;
    font-size: 22px;
    font-weight: bold;
    color: #333333;
    padding-top: 20px;
    padding-left: 10px;
}
.elsedata{
  display: flex;
}
</style>