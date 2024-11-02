<template>
  <div class="demo-datetime-picker">
    <div class="block">
      <el-date-picker
        v-model="internalValue"
        type="datetime"
        placeholder="选择日期"
        format="YYYY-MM-DD"
        style="width:200px"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

// 定义接收 props
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
});

// 定义 emit
const emit = defineEmits(['update:modelValue']);

// 内部值
const internalValue = ref(props.modelValue);

// 监视 props 的变化
watch(() => props.modelValue, (newValue) => {
  internalValue.value = newValue;
});

// 当内部值改变时，发送更新事件
watch(internalValue, (newValue) => {
  emit('update:modelValue', newValue);
});
</script>

<style scoped>
.demo-datetime-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}
.demo-datetime-picker .block {
  /* padding: 30px 0; */
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}
.demo-datetime-picker .block:last-child {
  border-right: none;
}
.demo-datetime-picker .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
