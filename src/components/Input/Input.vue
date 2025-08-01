<script setup lang="ts">
import { faL } from '@fortawesome/free-solid-svg-icons';
import type { InputEmits, InputProps } from './types';
import { computed, ref, watch } from 'vue';

defineOptions({
  name: 'VkInput',
});
const props = withDefaults(defineProps<InputProps>(), { type: 'text' });
const emits = defineEmits<InputEmits>();

const innerValue = ref(props.modelValue);
const isFocus = ref(false);
const showClear = computed(
  () => props.clearable && !props.disabled && !!innerValue.value && isFocus.value
);
const handleInput = () => {
  emits('update:modelValue', innerValue.value);
};
const changeFocus = (val: boolean) => {
  isFocus.value = val;
};
const clear = () => {
  innerValue.value = '';
  emits('update:modelValue', '');
};
watch(
  () => props.modelValue,
  (newVal) => {
    innerValue.value = newVal;
  }
);
</script>
<template>
  <div
    class="vk-input"
    :class="{
      [`vk-input--${type}`]: type,
      [`vk-input--${size}`]: size,
      'is-disabled': disabled,
      'is-prepend': $slots.prepend,
      'is-append': $slots.append,
      'is-prefix': $slots.prefix,
      'is-suffix': $slots.suffix,
      'is-focus': isFocus,
    }"
  >
    <!-- input -->
    <template v-if="type !== 'textarea'">
      <!-- prepend slot -->
      <div v-if="$slots.prepend" class="vk-input__prepend">
        <slot name="prepend" />
      </div>
      <div class="vk-input__wrapper">
        <!-- prefix slot -->
        <span v-if="$slots.prefix" class="vk-input__prefix">
          <slot name="prefix" />
        </span>
        <input
          class="vk-input__inner"
          :type="type"
          :disabled="disabled"
          v-model="innerValue"
          @input="handleInput"
          @focus="changeFocus(true)"
          @blur="changeFocus(false)"
        />
        <!-- suffix slot -->
        <span v-if="$slots.suffix || showClear" class="vk-input__suffix">
          <slot name="suffix" />
          <Icon icon="circle-xmark" v-if="showClear" class="vk-input__clear" @click="clear" />
        </span>
      </div>
      <!-- append slot -->
      <div v-if="$slots.append" class="vk-input__append">
        <slot name="append" />
      </div>
    </template>
    <!-- textarea -->
    <template v-else>
      <textarea
        class="vk-textarea__wrapper"
        :disabled="disabled"
        v-model="innerValue"
        @input="handleInput"
        @focus="changeFocus(true)"
        @blur="changeFocus(false)"
      />
    </template>
  </div>
</template>
