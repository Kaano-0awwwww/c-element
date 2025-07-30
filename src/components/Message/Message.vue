<template>
  <div
    class="vk-message"
    v-show="visible"
    :class="{
      [`vk-message--${type}`]: type,
      'is-close': showClose,
    }"
    role="alert"
  >
    <div class="vk-message__content">
      <slot>
        <RenderVnode :vNode="message" v-if="message" />
      </slot>
    </div>
    <div class="vk-message__close" v-if="showClose">
      <Icon @click.stop="visible = false" icon="xmark" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import type { MessageProps } from './types';
import RenderVnode from '../Common/RenderVnode';
import Icon from '../Icons/Icon.vue';
import { getLastInstance } from './render';
const props = withDefaults(defineProps<MessageProps>(), {
  type: 'info',
  duration: 3000,
});
const visible = ref(false);
const prevInstance = getLastInstance();
console.log('prev', prevInstance);
function startTimer() {
  if (props.duration === 0) return;
  setTimeout(() => {
    visible.value = false;
  }, props.duration);
}
onMounted(() => {
  visible.value = true;
  startTimer();
});
watch(visible, (newValue) => {
  if (!newValue) {
    props.onDestory();
  }
});
</script>
<style>
.vk-message {
  width: max-content;
  position: fixed;
  left: 50%;
  top: 20px;
  transform: translateX(-50%);
  border: 1px solid blue;
}
</style>
