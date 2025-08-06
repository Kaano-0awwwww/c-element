<script setup lang="ts">
import type { FormProps } from './types';

defineOptions({
  name: 'VkForm',
});
defineProps<FormProps>();
</script>
<template>
  <form class="vk-form">
    <slot />
  </form>
</template>
