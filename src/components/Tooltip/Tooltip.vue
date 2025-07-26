<script lang="ts" setup>
import type { TooltipProps, TooltipEmits } from './types';
import { createPopper, placements } from '@popperjs/core';
import type { Instance } from '@popperjs/core';
import { ref, watch } from 'vue';

const props = withDefaults(defineProps<TooltipProps>(), {
  placement: 'bottom' 
});
const emits = defineEmits<TooltipEmits>();

let popperInstance: null | Instance = null; // popper实例
const popperNode = ref<HTMLElement>();
const triggerNode = ref<HTMLElement>();
const isOpen = ref<boolean>(false);

const togglePopper = () => {
  isOpen.value = !isOpen.value;
  emits('visible-change', isOpen.value);
};
watch(isOpen, (newValue) => {
  if (newValue) {
    if (triggerNode.value && popperNode.value) {
      popperInstance = createPopper(triggerNode.value, popperNode.value,
        { placement: props.placement });
    } else {
      popperInstance?.destroy();
    }
  }
}, { flush: 'post' });
</script>
<template>
<div class="vk-tooltip">
  <div class="vk-tooltip__trigger" ref="triggerNode" @click="togglePopper">
    <slot></slot>
  </div>

  <div class="vk-tooltip__popper" ref="popperNode" v-if="isOpen">
    <slot name="content">
      {{ content }}
    </slot>
  </div>
</div>
</template>