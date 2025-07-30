<script lang="ts" setup>
import type { MessageProps } from './types';
import { ref, defineProps, onMounted, watch } from 'vue';
import Icon from '../Icons/Icon.vue';
import RenderVnode from '../Common/RenderVnode';

const props = withDefaults(defineProps<MessageProps>(), {
  duration: 2000,
  type: 'info',
});

const visible = ref(false);

onMounted(() => {
  visible.value = true;
  startTimer();
});

function startTimer() {
  if (props.duration === 0) return;
  setTimeout(() => {
    visible.value = false;
  }, props.duration);
}
watch(visible, (newVal) => {
  if (!newVal) props.onDestory;
});
</script>
<template>
  <div
    class="vk-message"
    role="alert"
    v-show="visible"
    :class="{ ['vk-message--${type}']: type, 'is-close': showClose }"
  >
    <div class="vk-message__content">
      <slot>
        <RenderVnode :vNode="message" v-if="message" />
      </slot>
    </div>
    <div class="vk-message__close" v-if="showClose">
      <Icon @click.stop="() => (visible = false)" icon="xmark" />
    </div>
  </div>
</template>
<style scoped>
.vk-message {
  width: max-content;
  position: fixed;
  left: 50%;
  top: 20px;
  transform: translateX(-50%);
  border: 1px solid blue;
}
</style>
