<script lang="ts" setup>
import { defineProps,defineOptions } from 'vue';

defineOptions({
  name: 'VkCollapse'
});
</script>
<template>
  <div class="vk-collapse">
    <slot></slot>
  </div>
</template>