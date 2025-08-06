import type { RuleItem, ValidateError, ValidateFieldsError } from 'async-validator';
import type { InjectionKey } from 'vue';

export type FormRules = Record<string, RuleItem[]>;
export interface FormProps {
  model: Record<string, any>;
  rules: FormRules;
}

export interface FormItemProps {
  label: string;
  prop: string;
}
export interface FormContext extends FormProps {}
export interface FormItemContext {
  validate: () => any;
}
export const FormContextKey: InjectionKey<FormContext> = Symbol('formContextKey');
export const FormItemContextKey: InjectionKey<FormItemContext> = Symbol('FormItemContext');
export interface FormValidateFailure {
  errors: ValidateError[] | null;
  fields: ValidateFieldsError;
}
