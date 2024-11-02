<template>
 <div class="container">
  <div class="title">川藏铁路突发传染病自主判别和现场调查软件数据大屏</div>
    <div>
      <Card />
    </div>
    <div class="elsedata">
      <div class="chartspartone">
      <Chart01 />
      <Chart02 />
      <Chart03 />
    </div>
    <div class="Map">
      <Map />
    </div>
    <div class=chartspartthree>
      <Chart04 />
      <Chart05 />
    </div>
    </div>
  </div>
</template>

<script>
import Card from './components/card.vue'
import Chart01 from './components/chart01.vue'
import Chart02 from './components/chart02.vue'
import Chart03 from './components/chart03.vue'
import Map from './components/map.vue'
import Chart04 from './components/chart04.vue'
import Chart05 from './components/chart05.vue'
export default {
    components:{
    Card,
    Chart01,
    Chart02,
    Map,
    Chart04,
    Chart03,
    Chart05
  },
}
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