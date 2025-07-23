<script lang="ts" setup>
import { defineOptions, ref, provide, watch } from 'vue';
import type { NameType, CollapseProps, CollapseEmits } from './types';
import { CollapseContextKey } from './types';

defineOptions({
  name: 'VkCollapse'
});
const props = defineProps<CollapseProps>();
const emits = defineEmits<CollapseEmits>();
const activeNames = ref<NameType[]>(props.modelValue);
// 监听后续modelValue变化
watch(() => props.modelValue, () => {
  activeNames.value = props.modelValue;
});

if (props.according && activeNames.value.length > 1) {
  console.warn('according warning');
}
const handleClick = (item: NameType) => {
  if (props.according) {
    // 手风琴模式
    activeNames.value = [activeNames.value[0] === item ? '' : item];
  } else {
    const index = activeNames.value.indexOf(item);
    if (index > -1) {
    // 存在 则删除
      activeNames.value.splice(index, 1);
    } else {
      // 不存在 则添加
      activeNames.value.push(item);
    }
  }

  emits('update:modelValue', activeNames.value);
  emits('change', activeNames.value);
};
provide(CollapseContextKey, {
  activeNames,
  handleClick
});
</script>
<template>
  <div class="vk-collapse">
    <slot></slot>
  </div>
</template>