<script lang="ts" setup>
import type { TooltipProps, TooltipEmits, TooltipInstance } from './types';
import { createPopper } from '@popperjs/core';
import type { Instance } from '@popperjs/core';
import { computed, onUnmounted, ref, watch } from 'vue';
import useClickOutside from '@/hooks/useClickOutside';
import { debounce } from 'lodash-es';

const props = withDefaults(defineProps<TooltipProps>(), {
  placement: 'bottom',
  trigger: 'hover',
  transition: 'fade',
  openDelay: 0,
  closeDelay: 0,
});
const emits = defineEmits<TooltipEmits>();

const tooltipRef = ref<HTMLElement>();
let popperInstance: null | Instance = null; // popper实例
const popperNode = ref<HTMLElement>();
const triggerNode = ref<HTMLElement>();
const isOpen = ref<boolean>(false);
const events = ref<Record<string, any>>({});
const outEvents = ref<Record<string, any>>({});
const popperOptions = computed(() => {
  return {
    placement: props.placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 9],
        },
      },
    ],
    ...props.popperOptions,
  };
});

const open = () => {
  isOpen.value = true;
  emits('visible-change', true);
};
const close = () => {
  isOpen.value = false;
  emits('visible-change', false);
};
// 延时封装
const debounceOpen = debounce(open, props.openDelay);
const debounceClose = debounce(close, props.closeDelay);
const show = () => {
  debounceClose.cancel();
  debounceOpen();
};
const hide = () => {
  debounceOpen.cancel();
  debounceClose();
};
const togglePopper = () => {
  isOpen.value ? show() : hide();
};

const attachEvents = () => {
  if (props.trigger === 'click') events.value['click'] = togglePopper;
  if (props.trigger === 'hover') {
    events.value['mouseenter'] = show;
    outEvents.value['mouseleave'] = hide;
  }
};
if (!props.manual) {
  attachEvents();
}
useClickOutside(tooltipRef, () => {
  if (props.trigger === 'click' && isOpen.value && !props.manual) {
    hide();
  }
});
watch(
  () => props.manual,
  (isManual) => {
    if (isManual) {
      events.value = {};
      outEvents.value = {};
    } else {
      attachEvents();
    }
  }
);
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
        popperInstance = createPopper(triggerNode.value, popperNode.value, popperOptions.value);
      } else {
        popperInstance?.destroy();
      }
    }
  },
  { flush: 'post' }
);
defineExpose<TooltipInstance>({
  show: show,
  hide: hide,
});
onUnmounted(() => popperInstance?.destroy());
</script>
<template>
  <div class="vk-tooltip" v-on="outEvents" ref="tooltipRef">
    <div class="vk-tooltip__trigger" ref="triggerNode" v-on="events">
      <slot></slot>
    </div>

    <Transition :name="props.transition">
      <div class="vk-tooltip__popper" ref="popperNode" v-if="isOpen">
        <slot name="content">
          {{ content }}
        </slot>
        <div id="arrow" data-popper-arrow></div>
      </div>
    </Transition>
  </div>
</template>
