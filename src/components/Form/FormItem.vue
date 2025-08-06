<script setup lang="ts">
import type { FormItemProps } from './types';
import { computed, inject } from 'vue';
import { FormContextKey } from './types';
import { isNil } from 'lodash-es';
import Schema from 'async-validator';

defineOptions({
  name: 'VkFormItem',
});
const props = defineProps<FormItemProps>();
const formContext = inject(FormContextKey);

const innerValue = computed(() => {
  const model = formContext?.model;
  return model && props.prop && !isNil(model[props.prop]) ? model[props.prop] : null;
});
const itemRules = computed(() => {
  const rules = formContext?.rules;
  return rules && props.prop && !isNil(rules[props.prop]) ? rules[props.prop] : null;
});

function validate() {
  const modelName = props.prop;
  if (!modelName) return;

  const validator = new Schema({
    [modelName]: itemRules.value,
  });
  validator
    .validate({ [modelName]: innerValue.value })
    .then(() => {
      console.log('pass!');
    })
    .catch((e) => {
      console.log(e.errors);
    });
}
</script>
<template>
  <div class="vk-form-item">
    <label class="vk-form-item__label">
      <slot name="label" :label="label">
        {{ label }}
      </slot>
    </label>
    <div class="vk-form-item__content">
      <slot />
    </div>
    {{ innerValue }} -- {{ itemRules }}
    <button @click.prevent="validate">Validate</button>
  </div>
</template>
