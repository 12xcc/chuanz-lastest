<template>
  <div class="demo-datetime-picker">
    <div class="block">
      <el-date-picker
        v-model="internalValue"
        type="datetimerange"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        format="YYYY-MM-DD"
        value-format="YYYY-MM-DD HH:ss:mm"
        @change="handleChange"
        :picker-options="pickerOptions"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue'

// 通过 props 接收父组件传递的 modelValue
const props = defineProps<{ modelValue: any }>()
const emit = defineEmits<{ (event: 'update:modelValue', value: any): void }>()
const internalValue = ref(props.modelValue)

const pickerOptions = {
  disabledDate(time) {
    const today = new Date();
    return time.getTime() < Date.now() - 24 * 60 * 60 * 1000 || time.getTime() > today.getTime() + 7 * 24 * 60 * 60 * 1000;
  },
}

watch(internalValue, (newValue) => {
  emit('update:modelValue', newValue)
})

function handleChange(value: any) {
  emit('update:modelValue', value)
}
</script>
<style scoped>
.demo-datetime-picker {
  display: inline;
  width: 100%;
  flex-wrap: wrap;
  align-items: stretch;
}
.demo-datetime-picker .block {
  margin-right: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
}
.demo-datetime-picker[data-v-462ea869] {
  width: 420px;
  margin-left: 20px;
  margin-top: 10px;
}
</style>
