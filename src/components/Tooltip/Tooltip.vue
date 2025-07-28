<script lang="ts" setup>
import type { TooltipProps, TooltipEmits } from './types';
import { createPopper } from '@popperjs/core';
import type { Instance } from '@popperjs/core';
import { ref, watch } from 'vue';

const props = withDefaults(defineProps<TooltipProps>(), {
  placement: 'bottom',
  trigger: 'hover',
});
const emits = defineEmits<TooltipEmits>();

let popperInstance: null | Instance = null; // popper实例
const popperNode = ref<HTMLElement>();
const triggerNode = ref<HTMLElement>();
const isOpen = ref<boolean>(false);
const events = ref<Record<string, any>>({});
const outEvents = ref<Record<string, any>>({});

const togglePopper = () => {
  isOpen.value = !isOpen.value;
  emits('visible-change', isOpen.value);
};
const open = () => {
  isOpen.value = true;
  emits('visible-change', true);
};
const close = () => {
  isOpen.value = false;
  emits('visible-change', false);
};
const attachEvents = () => {
  if (props.trigger === 'click') events.value['click'] = togglePopper;
  if (props.trigger === 'hover') {
    events.value['mouseenter'] = open;
    outEvents.value['mouseleave'] = close;
  }
};
attachEvents();
watch(
  () => props.trigger,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      outEvents.value = {};
      events.value = {};
      attachEvents();
    }
  }
);
watch(
  isOpen,
  (newValue) => {
    if (newValue) {
      if (triggerNode.value && popperNode.value) {
        popperInstance = createPopper(triggerNode.value, popperNode.value, {
          placement: props.placement,
        });
      } else {
        popperInstance?.destroy();
      }
    }
  },
  { flush: 'post' }
);
</script>
<template>
  <div class="vk-tooltip" v-on="outEvents">
    <div class="vk-tooltip__trigger" ref="triggerNode" v-on="events">
      <slot></slot>
    </div>

    <div class="vk-tooltip__popper" ref="popperNode" v-if="isOpen">
      <slot name="content">
        {{ content }}
      </slot>
    </div>
  </div>
</template>
