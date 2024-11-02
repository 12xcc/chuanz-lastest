<template>
  <div class="container">
    <div class="chart-container">
      <div class="chart-title">地理位置分布</div>
      <div id="mapContainer" class="chart"></div>
      <div class="legend-label">
        <img src="@/assets/map.svg" alt="">
        <div class="legend-title">打卡地理位置分布</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { getUserStation } from "@/api/report/screen.js";

onMounted(async () => {
  const map = new AMap.Map('mapContainer', {
    zoom: 3.6, 
    center: [104.0668, 30.5728]  
  });

  map.plugin(['AMap.HeatMap'], async () => {
    const heatmap = new AMap.HeatMap(map, {
      radius: 25,
      opacity: [0, 0.8]
    });

    try {
      const response = await getUserStation();
      if (response.data.code === 1) {
        const heatmapData = response.data.data.map(item => ({
          lng: item.longitude,
          lat: item.latitude,
          count: 100  // 示例数量，您可以根据实际数据调整
        }));

        heatmap.setDataSet({
          data: heatmapData,
          max: 100
        });
      } else {
        console.error("获取用户地理位置数据失败:", response.data.msg);
      }
    } catch (error) {
      console.error("请求出错:", error);
    }
  });
});
</script>


<style scoped>
.container {
    margin-top: 64px;
    margin-left: 10px;
    width: 100%;
    height: auto;
}

.chart-container {
    width: 580px;
    height: 700px;
    background-color: #FAFAFA;
    border-radius: 5px;
    position: relative;
    padding-top: 50px; 
    padding-left: 20px; 
    padding-right: 20px;
    padding-bottom: 60px;
}

.chart-title {
    position: absolute;
    top: 10px;
    left: 10px;
    font-size: 14px;
    font-weight: bold;
    color: #4A4A4A;
    background-color: #FAFAFA;
    padding: 2px 5px;
    border-radius: 3px;
    z-index: 10;  
}

#mapContainer {
    width: 100%;
    height: calc(100% - 40px); 
}


.legend-label {
    margin-top: 30px;
    font-size: 12px;
    display: flex;
}
img{
    width: 34px;
    height: 34px;
}
.legend-title{
    margin-top: 10px;
    font-weight: bold;
    color: #4A4A4A;
}
</style>
