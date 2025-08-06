<script setup lang="ts">
import type {
  FormItemProps,
  FormValidateFailure,
  FormItemContext,
  ValidateStatusProp,
  FormItemInstance,
} from './types';
import { computed, inject, onMounted, onUnmounted, provide, ref } from 'vue';
import { formContextKey, formItemContextKey } from './types';
import { isNil } from 'lodash-es';
import Schema from 'async-validator';

defineOptions({
  name: 'VkFormItem',
});
const props = defineProps<FormItemProps>();
const formContext = inject(formContextKey);
let initialValue: any = null; // 存放初始值

onMounted(() => {
  if (props.prop) {
    formContext?.addField(context);
    initialValue = innerValue.value;
  }
});
onUnmounted(() => formContext?.removeField(context));

const validateStatus: ValidateStatusProp = ref({
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
const isRequired = computed(() => itemRules.value.some((ita) => ita.required));

function getTriggeredRules(trigger?: string) {
  const rules = itemRules.value;
  if (rules) {
    return rules.filter((ita) => {
      if (!ita.trigger && !trigger) return true;
      return ita.trigger && ita.trigger === trigger;
    });
  } else return [];
}

async function validate(trigger?: string) {
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
  return validator
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
      return Promise.reject(e);
    })
    .finally(() => {
      validateStatus.value.loading = false;
    });
}

function clearValidate() {
  validateStatus.value = {
    state: 'init',
    errorMsg: '',
    loading: false,
  };
}

function resetField() {
  clearValidate();
  const model = formContext?.model;
  if (model && props.prop && !isNil(model[props.prop])) {
    model[props.prop] = initialValue;
  }
}

const context: FormItemContext = {
  validate,
  prop: props.prop || '',
  clearValidate,
  resetField,
};
provide(formItemContextKey, context);

defineExpose<FormItemInstance>({
  validate,
  resetField,
  clearValidate,
  validateStatus,
});
</script>
<template>
  <div
    class="vk-form-item"
    :class="{
      'is-error': validateStatus.state === 'error',
      'is-success': validateStatus.state === 'success',
      'is-loading': validateStatus.loading,
      'is-required': isRequired,
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
  </div>
</template>
