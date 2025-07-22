<script lang="ts" setup>
import type { CollapseItemProps } from './types';
import { defineProps,defineOptions, inject, computed } from 'vue';
import { CollapseContextKey } from './types';

defineOptions({
  name: 'VkCollapseItem'
});
const props = defineProps<CollapseItemProps>();
const collapseContext = inject(CollapseContextKey);
const isActive = computed(() => collapseContext?.activeNames.value.includes(props.name));

const handleClick = () => {
  if (props.disabled) return;
  collapseContext?.handleClick(props.name);
};
</script>
<template>
  <div class="vk-collapse-item" :class="{ 'is-disabled': disabled }">
    <div class="vk-collapse-item__header" :id="`item-header-${name}`" @click="handleClick">
      <slot name="title">{{ title }}</slot>
    </div>

    <div class="vk-collapse-item__content" :id="`item-content-${name}`" v-show="isActive">
      <slot></slot>
    </div>
  </div>
</template>