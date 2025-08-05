<script lang="ts" setup>
import type { SelectProps, SelectEmits, SelectStates, SelectOption } from './types';
import { ref, defineEmits, defineProps, defineOptions, computed, watch } from 'vue';
import type { Ref } from 'vue';
import Tooltip from '../Tooltip/Tooltip.vue';
import type { TooltipInstance } from '../Tooltip/types';
import Input from '../Input/Input.vue';
import type { InputInstance } from '../Input/types';
import Icon from '../Icons/Icon.vue';
import RenderVnode from '../Common/RenderVnode';
import { isFunction } from 'lodash-es';

defineOptions({
  name: 'VkSelect',
});
const props = defineProps<SelectProps>();
const emits = defineEmits<SelectEmits>();

const initialOption = findOption(props.modelValue);
const states = ref<SelectStates>({
  inputValue: initialOption?.label ?? '',
  selectedOption: initialOption,
  mouseHover: false,
});
const tooltipRef = ref() as Ref<TooltipInstance>;
const inputRef = ref() as Ref<InputInstance>;

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
  if (show) {
    if (props.filterable && states.value.selectedOption) {
      // filter模式 清除之前的input
      states.value.inputValue = '';
    }
    // 进行一次默认选项的生成
    if (props.filterable) generateFilterOptions(states.value.inputValue);
    tooltipRef.value.show();
  } else {
    tooltipRef.value.hide();
    // filter模式下 回显input值
    if (props.filterable)
      states.value.inputValue = states.value.selectedOption
        ? states.value.selectedOption.label
        : '';
  }
  isDropdownShow.value = show;
  emits('visible-change', show);
  // console.log('controlDropdown', isDropdownShow.value);
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
  inputRef.value.ref.focus();
  states.value.mouseHover = false;
}

// clear清空模块
const showClearIcon = computed(
  () => props.clearable && states.value.mouseHover && states.value.inputValue.trim()
);

function onClear() {
  states.value.inputValue = '';
  states.value.selectedOption = null;
  emits('clear');
  emits('change', '');
  emits('update:modelValue', '');
}

// 选项筛选模块
const filterOptions = ref(props.options);
const filteredPlaceholder = computed(() =>
  props.filterable && states.value.selectedOption && isDropdownShow.value
    ? states.value.selectedOption.label
    : props.placeholder
);
watch(
  () => props.options,
  (newOptions) => {
    filterOptions.value = newOptions;
  }
);

function generateFilterOptions(searchValue: string) {
  if (!props.filterable) return;
  if (props.filterMethod && isFunction(props.filterMethod)) {
    filterOptions.value = props.filterMethod(searchValue);
  } else {
    filterOptions.value = props.options.filter((item) => item.label.includes(searchValue));
  }
}

function onFilter() {
  generateFilterOptions(states.value.inputValue);
  // console.log(states.value.inputValue);
}

function NOOP() {
  return;
}
</script>
<template>
  <div
    class="vk-select"
    :class="{ 'is-disabled': disabled }"
    @click="toggleDropdown"
    @mouseenter="() => (states.mouseHover = true)"
    @mouseleave="() => (states.mouseHover = false)"
  >
    <Tooltip
      ref="tooltipRef"
      placement="bottom-start"
      manual
      :popper-options="popperOptions"
      @click-outside="controlDropdown(false)"
    >
      <Input
        ref="inputRef"
        v-model="states.inputValue"
        :disabled="disabled"
        :placeholder="filteredPlaceholder"
        :readonly="!filterable || !isDropdownShow"
        @input="onFilter"
      >
        <template #suffix>
          <Icon
            v-if="showClearIcon"
            icon="circle-xmark"
            class="vk-input__clear"
            @click.stop="onClear"
            @click.prevent="NOOP"
          />
          <Icon
            v-else
            icon="angle-down"
            class="header-angle"
            :class="{ 'is-active': isDropdownShow }"
          />
        </template>
      </Input>

      <template #content>
        <ul class="vk-select__menu">
          <template v-for="(item, index) in filterOptions" :key="index">
            <li
              class="vk-select__menu-item"
              :class="{
                'is-disabled': item.disabled,
                'is-selected': states.selectedOption?.value === item.value,
              }"
              :id="`select-item-${item.value}`"
              @click.stop="itemSelect(item)"
            >
              <RenderVnode :vNode="renderLabel ? renderLabel(item) : item.label" />
            </li>
          </template>
        </ul>
      </template>
    </Tooltip>
  </div>
</template>
