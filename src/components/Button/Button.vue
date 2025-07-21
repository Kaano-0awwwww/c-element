<script setup lang="ts">
import type { ButtonProps } from './type';
defineProps<ButtonProps>();
</script>
<template>
  <button class="vkbutton" :class="{ 'is-plain': plain, 'is-round': round, 'is-circle': circle, 'is-disabled': disabled }"></button>
  
</template>