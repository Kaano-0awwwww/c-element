<script lang="ts" setup>
import type { SelectProps, SelectEmits, SelectStates, SelectOption } from './types';
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

const initialOption = findOption(props.modelValue);
const states = ref<SelectStates>({
  inputValue: initialOption?.label ?? '',
  selectedOption: initialOption,
});
const tooltipRef = ref() as Ref<TooltipInstance>;
// init option 选项初始化
function findOption(value: string) {
  const option = props.options.find((ita) => ita.value === value);
  return option ? option : null;
}
// 选择下拉模块
const isDropdownShow = ref(false);
const popperOptions: any = {
  modifiers: [
    {
      name: 'offset',
      options: {
        offset: [0, 9],
      },
    },
    {
      name: 'sameWidth',
      enabled: true,
      fn: ({ state }: { state: any }) => {
        state.styles.popper.width = `${state.rects.reference.width}px`;
      },
      phase: 'beforeWrite',
      requires: ['computeStyles'],
    },
  ],
};

function controlDropdown(show: boolean) {
  show ? tooltipRef.value.show() : tooltipRef.value.hide();
  isDropdownShow.value = show;
  emits('visible-change', show);
}

function toggleDropdown() {
  if (props.disabled) return;
  isDropdownShow.value ? controlDropdown(false) : controlDropdown(true);
}

function itemSelect(e: SelectOption) {
  if (e.disabled) return;
  states.value.inputValue = e.label;
  states.value.selectedOption = e;
  emits('change', e.value);
  emits('update:modelValue', e.value);
  controlDropdown(false);
}
</script>
<template>
  <div class="vk-select" :class="{ 'is-disabled': disabled }" @click="toggleDropdown">
    <Tooltip ref="tooltipRef" placement="bottom-start" manual :popper-options="popperOptions">
      <Input v-model="states.inputValue" :disabled="disabled" :placeholder="placeholder"></Input>

      <template #content>
        <ul class="vk-select__menu">
          <template v-for="(item, index) in options" :key="index">
            <li
              class="vk-select__menu-item"
              :class="{
                'is-disabled': item.disabled,
                'is-selected': states.selectedOption?.value === item.value,
              }"
              :id="`select-item-${item.value}`"
              @click.stop="itemSelect(item)"
            >
              {{ item.label }}
              <span v-if="states.selectedOption?.value === item.value"> Selected! </span>
            </li>
          </template>
        </ul>
      </template>
    </Tooltip>
  </div>
</template>
