<script setup lang="ts">
import type { ButtonProps } from './type';
import { defineProps, defineOptions, withDefaults, ref } from 'vue';
import Icon from '../Icons/Icon.vue';

defineOptions({
  name: 'VKButton',
});
withDefaults(defineProps<ButtonProps>(), {
  nativeType: 'button',
});

const _ref = ref<HTMLButtonElement>();
defineExpose({
  ref: _ref,
});
</script>
<template>
  <button
    ref="_ref"
    class="vk-button"
    :class="{
      [`vk-button--${type}`]: type,
      [`vk-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled,
    }"
    :disabled="disabled || loading"
    :type="nativeType"
    :autofocus="autofocus"
  >
    <!-------图标--------->
    <Icon icon="spinner" spin v-if="loading"></Icon>
    <Icon :icon="icon" v-if="icon"></Icon>
    <span><slot></slot></span>
  </button>
</template>
<style></style>
