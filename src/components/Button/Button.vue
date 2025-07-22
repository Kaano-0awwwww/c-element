<script setup lang="ts">
import type { ButtonProps } from './type';
import { defineProps, defineOptions, withDefaults, ref } from 'vue';

defineOptions({
  name: 'VKButton'
});
withDefaults(defineProps<ButtonProps>(), {
  nativeType: 'button',
});

const _ref = ref<HTMLButtonElement>();
defineExpose({
  ref: _ref
});
</script>
<template>
  <button ref="_ref" class="vk-button" :class="{ [`vk-button--${type}`]: type, [`vk-button--${size}`]: size, 'is-plain': plain, 'is-round': round, 'is-circle': circle, 'is-disabled': disabled }" :disabled="disabled" :type="nativeType" :autofocus="autofocus">
    <span><slot></slot></span>
  </button>
</template> 
<style>
.vk-button{
  background-color: var(--vk-color-primary);
}
</style>