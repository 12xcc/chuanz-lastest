<template>
  <div class="virtual-table" :style="{ height: height + 'px' }">
    <div class="table-header">
      <slot name="header"></slot>
    </div>
    <div class="table-body">
      <div v-for="(row, index) in visibleData" :key="index" class="table-row">
        <slot name="default" :row="row"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  data: Array,
  height: Number
});

const rowHeight = 50; // 每行的高度，根据实际情况调整
const visibleCount = computed(() => Math.ceil(props.height / rowHeight));
const visibleData = computed(() => {
  const start = 0;
  const end = start + visibleCount.value;
  return props.data.slice(start, end);
});
</script>

<style scoped>
.virtual-table {
  overflow: auto;
}

.table-header {
  position: sticky;
  top: 0;
  background: white;
  z-index: 10;
}

.table-body {
  position: relative;
}

.table-row {
  height: 50px; /* 每行的高度 */
}
</style>
