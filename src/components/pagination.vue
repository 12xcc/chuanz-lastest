<template>
  <div class="pagination">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handlePageChange"
      :current-page="currentPage"
      :page-size="pageSize"
      :total="total"
      layout="total, prev, pager, next, jumper"
    />
  </div>
</template>

<script setup>

const props = defineProps({
  total: Number,
  currentPage: Number,
  pageSize: Number
});

const emit = defineEmits(['pagination']);

// 处理页面大小变化事件
const handleSizeChange = (size) => {
  console.log(`Size changed to: ${size}`);
  emit('pagination', { page: props.currentPage, limit: size });
};

// 处理当前页面变化事件
const handlePageChange = (page) => {
  // console.log(`Page changed to: ${page}`);
  emit('pagination', { page, limit: props.pageSize });
};
</script>

<style scoped>
.pagination {
  margin: 20px 0;
}
</style>
