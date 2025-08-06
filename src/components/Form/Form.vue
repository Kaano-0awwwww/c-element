<script setup lang="ts">
import type { FormProps } from './types';
import { FormContextKey } from './types';
import { provide } from 'vue';

defineOptions({
  name: 'VkForm',
});
const props = defineProps<FormProps>();
provide(FormContextKey, props);
</script>
<template>
  <form class="vk-form">
    <slot />
  </form>
</template>
