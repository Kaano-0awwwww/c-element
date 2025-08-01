<script setup lang="ts">
import { ref, onMounted, watch, computed, nextTick } from 'vue';
import type { MessageProps } from './types';
import RenderVnode from '../Common/RenderVnode';
import Icon from '../Icons/Icon.vue';
import { getLastBottomOffset, getLastInstance } from './render';
import useEventListener from '../../hooks/useEventListener';

const props = withDefaults(defineProps<MessageProps>(), {
  type: 'info',
  duration: 3000,
  offset: 20,
  transitionName: 'fade-up',
});
const visible = ref(false);
const prevInstance = getLastInstance();
console.log('prev', prevInstance);

const messageRef = ref<HTMLDivElement>();
// 计算偏移高度
// 这个 div 的高度
const height = ref(0);
const lastOffset = computed(() => getLastBottomOffset(props.id)); // 上一个实例的最下面的坐标数字，第一个是 0
const topOffset = computed(() => props.offset + lastOffset.value); // 这个元素应该使用的 top
// 这个元素为下一个元素预留的 offset，也就是它最低端 bottom 的 值
const bottomOffset = computed(() => topOffset.value + height.value);
const cssStyle = computed(() => ({
  top: topOffset.value + 'px',
  zIndex: props.zindex,
}));
function updateHeight() {
  height.value = messageRef.value!.getBoundingClientRect().height;
}
// esc关闭组件
useEventListener(document, 'keydown', (e: Event) => {
  const event = e as KeyboardEvent;
  if (event.code === 'Escape') visible.value = false;
});

let timer: any = null;
function startTimer() {
  if (props.duration === 0) return;
  timer = setTimeout(() => {
    visible.value = false;
  }, props.duration);
}
function clearTimer() {
  clearTimeout(timer);
}
onMounted(async () => {
  visible.value = true;
  startTimer();
  // await nextTick(() => (height.value = messageRef.value!.getBoundingClientRect().height));
});
// watch(visible, (newValue) => {
//   if (!newValue) {
//     props.onDestory();
//   }
// });
defineExpose({
  bottomOffset,
  visible,
});
</script>
<template>
  <Transition :name="transitionName" @after-leave="() => onDestory()" @enter="updateHeight">
    <div
      class="vk-message"
      v-show="visible"
      :class="{
        [`vk-message--${type}`]: type,
        'is-close': showClose,
      }"
      role="alert"
      ref="messageRef"
      :style="cssStyle"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <div class="vk-message__content">
        <slot>
          <!-- {{ offset }} - {{ topOffset }} - {{ height }} - {{ bottomOffset }} -->
          <RenderVnode :vNode="message" v-if="message" />
        </slot>
      </div>
      <div class="vk-message__close" v-if="showClose">
        <Icon @click.stop="visible = false" icon="xmark" />
      </div>
    </div>
  </Transition>
</template>
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
