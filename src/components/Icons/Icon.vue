<script lang="ts" setup>
import { computed, defineOptions } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import type { IconProps } from './types';
import { omit } from 'lodash-es';
defineOptions({
  name: 'VkIcon',
  inheritAttrs: false,
});
const props = defineProps<IconProps>();
const filterProps = computed(() => omit(props, ['type', 'color']));
const customStyles = computed(() => props.color ? { color: props.color } : {});
</script>
<template>
  <i class="vk-icon" :class="{[`vk-icon--${type}`]: type}" :style="customStyles" v-bind="$attrs">
    <font-awesome-icon v-bind="filterProps" />
  </i>
</template>