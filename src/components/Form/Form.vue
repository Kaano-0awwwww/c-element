<script setup lang="ts">
import type { FormItemContext, FormProps, FormValidateFailure, FormInstance } from './types';
import { FormContextKey } from './types';
import { provide } from 'vue';
import type { ValidateFieldsError } from 'async-validator';

defineOptions({
  name: 'VkForm',
});
const props = defineProps<FormProps>();
const fields: FormItemContext[] = [];

function addField(field: FormItemContext) {
  fields.push(field);
}

function removeField(field: FormItemContext) {
  if (field.prop) {
    fields.splice(fields.indexOf(field), 1);
  }
}

async function validate() {
  let validationErrors: ValidateFieldsError = {};

  for (const field of fields) {
    try {
      await field.validate();
    } catch (e) {
      const error = e as FormValidateFailure;
      validationErrors = {
        ...error.fields,
        ...validationErrors,
      };
    }
  }
  if (!Object.keys(validationErrors).length) return true;
  return Promise.reject(validationErrors);
}

function resetFields(keys: string[] = []) {
  const filterArr = keys.length ? fields.filter((field) => keys.includes(field.prop)) : fields;
  filterArr.forEach((field) => field.resetField());
}

function clearValidate(keys: string[] = []) {
  const filterArr = keys.length > 0 ? fields.filter((field) => keys.includes(field.prop)) : fields;
  filterArr.forEach((field) => field.clearValidate());
}

provide(FormContextKey, {
  ...props,
  addField,
  removeField,
});
defineExpose<FormInstance>({
  validate,
  resetFields,
  clearValidate,
});
</script>
<template>
  <form class="vk-form">
    <slot />
    <button @click.prevent="validate">Validate All</button>
  </form>
</template>
