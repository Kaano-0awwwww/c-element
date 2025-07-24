<script lang="ts" setup>
import type { CollapseItemProps } from './types';
import { defineProps,defineOptions, inject, computed } from 'vue';
import { CollapseContextKey } from './types';
import Icon from '../Icons/Icon.vue';

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

const transitionEvents: Record<string, (el: HTMLElement) => void> = {
  beforeEnter: (el) => {
    el.style.height = '0px';
    el.style.overflow = 'hidden';
  },
  enter: (el) => {
    el.style.height = `${el.scrollHeight}px`;
    el.style.overflow = '';
  },
  afterEnter: (el) => {
    el.style.height = '';
  },
  beforeLeave: (el) => {
    el.style.height = `${el.scrollHeight}px`;
  },
  leave: (el) => {
    el.style.height = '0px';
    el.style.overflow = 'hidden';
  },
  afterLeave: (el) => {
    el.style.height = '';
    el.style.overflow = '';
  }
};
</script>
<template>
  <div class="vk-collapse-item" :class="{ 'is-disabled': disabled }">
    <div class="vk-collapse-item__header" :class="{ 'is-disabled': disabled, 'is-active': isActive }" :id="`item-header-${name}`" @click="handleClick">

      <slot name="title">{{ title }}</slot>
      <Icon icon="angle-right" class="header-angle"></Icon>
    </div>

  <transition name="slide" v-on="transitionEvents">
    <div class="vk-collapse-item__wrap" v-show="isActive">
      <div class="vk-collapse-item__content" :id="`item-content-${name}`" >
        <slot></slot>
      </div>
    </div>
  </transition>
  </div>
</template>