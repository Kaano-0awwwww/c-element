<script lang="ts" setup>
import type { SelectProps, SelectEmits } from './types';
import { ref, defineEmits, defineProps, defineOptions } from 'vue';
import type { Ref } from 'vue';
import Tooltip from '../Tooltip/Tooltip.vue';
import type { TooltipInstance } from '../Tooltip/types';
import Input from '../Input/Input.vue';

defineOptions({
  name: 'VkSelect',
});
const props = defineProps<SelectProps>();
const emits = defineEmits<SelectEmits>();

const innerValue = ref('');
const tooltipRef = ref() as Ref<TooltipInstance>;
const isDropdownShow = ref(false);
function controlDropdown(show: boolean) {
  show ? tooltipRef.value.show() : tooltipRef.value.hide();
  isDropdownShow.value = show;
  emits('visible-change', show);
}
function toggleDropdown() {
  if (props.disabled) return;
  isDropdownShow.value ? controlDropdown(false) : controlDropdown(true);
}
</script>
<template>
  <div class="vk-select" :class="{ 'is-disabled': disabled }" @click="toggleDropdown">
    <Tooltip ref="tooltipRef" placement="bottom-start" manual>
      <Input v-model="innerValue" :disabled="disabled" :placeholder="placeholder"></Input>

      <template #content>
        <ul class="vk-select__menu">
          <template v-for="(item, index) in options" :key="index">
            <li
              class="vk-select__menu-item"
              :class="{ 'is-disabled': item.disabled }"
              :id="`select-item-${item.value}`"
            >
              {{ item.label }}
            </li>
          </template>
        </ul>
      </template>
    </Tooltip>
  </div>
</template>
