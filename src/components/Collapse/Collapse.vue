<script lang="ts" setup>
import { defineOptions, ref, provide } from 'vue';
import type { NameType } from './types';
import { CollapseContextKey } from './types';

defineOptions({
  name: 'VkCollapse'
});

const activeNames = ref<NameType[]>([]);
const handleClick = (item: NameType) => {
  const index = activeNames.value.indexOf(item);
  if (index > -1) {
    // 存在 则删除
    activeNames.value.splice(index, 1);
  } else {
    // 不存在 则添加
    activeNames.value.push(item);
  }
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