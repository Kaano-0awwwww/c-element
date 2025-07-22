<script lang="ts" setup>
import type { CollapseItemProps } from './types';
import { defineProps,defineOptions } from 'vue';

defineOptions({
  name: 'VkCollapseItem'
});
defineProps<CollapseItemProps>();
</script>
<template>
  <div class="vk-collapse-item" :class="{ 'is-disabled': disabled }">
    <div class="vk-collapse-item__header" :id="`item-header-${name}`">
      <slot name="title">{{ title }}</slot>
    </div>
    <div class="vk-collapse-item__content" :id="`item-content-${name}`">
      <slot></slot>
    </div>
  </div>
</template>