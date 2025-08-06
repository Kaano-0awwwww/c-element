<script setup lang="ts">
import type { FormItemProps, FormValidateFailure, FormItemContext } from './types';
import { computed, inject, provide, ref } from 'vue';
import { FormContextKey, FormItemContextKey } from './types';
import { isNil } from 'lodash-es';
import Schema from 'async-validator';

defineOptions({
  name: 'VkFormItem',
});
const props = defineProps<FormItemProps>();
const formContext = inject(FormContextKey);

const validateStatus = ref({
  state: 'init',
  errorMsg: '',
  loading: false,
});
const innerValue = computed(() => {
  const model = formContext?.model;
  return model && props.prop && !isNil(model[props.prop]) ? model[props.prop] : null;
});
const itemRules = computed(() => {
  const rules = formContext?.rules;
  return rules && props.prop && !isNil(rules[props.prop]) ? rules[props.prop] : [];
});

function getTriggeredRules(trigger?: string) {
  const rules = itemRules.value;
  if (rules) {
    return rules.filter((ita) => {
      if (!ita.trigger && !trigger) return true;
      return ita.trigger && ita.trigger === trigger;
    });
  } else return [];
}

function validate(trigger?: string) {
  const modelName = props.prop;
  const triggeredRules = getTriggeredRules(trigger);
  if (triggeredRules.length === 0) {
    return true;
  }
  if (!modelName) return;

  const validator = new Schema({
    [modelName]: triggeredRules,
  });
  validateStatus.value.loading = true;
  validator
    .validate({ [modelName]: innerValue.value })
    .then(() => {
      // console.log('pass!');
      validateStatus.value.state = 'success';
    })
    .catch((e: FormValidateFailure) => {
      // console.log(e.errors);
      const { errors } = e;
      validateStatus.value.state = 'error';
      validateStatus.value.errorMsg = errors && errors.length ? errors[0].message || '' : '';
    })
    .finally(() => {
      validateStatus.value.loading = false;
    });
}
const context: FormItemContext = {
  validate,
};
provide(FormItemContextKey, context);
</script>
<template>
  <div
    class="vk-form-item"
    :class="{
      'is-error': validateStatus.state === 'error',
      'is-success': validateStatus.state === 'success',
      'is-loading': validateStatus.loading,
    }"
  >
    <label class="vk-form-item__label">
      <slot name="label" :label="label">
        {{ label }}
      </slot>
    </label>
    <div class="vk-form-item__content">
      <slot :validate="validate" />
      <div class="vk-form-item__error-msg" v-if="validateStatus.state === 'error'">
        {{ validateStatus.errorMsg }}
      </div>
    </div>
    {{ innerValue }} -- {{ itemRules }}
    <button @click.prevent="validate()">Validate</button>
  </div>
</template>
