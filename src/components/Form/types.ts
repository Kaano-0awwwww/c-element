import type { RuleItem, ValidateError, ValidateFieldsError } from 'async-validator';
import type { InjectionKey } from 'vue';

export interface FormProps {
  model: Record<string, any>;
  rules: FormRules;
}

export interface FormItemProps {
  label: string;
  prop: string;
}

export interface FormContext extends FormProps {
  addField: (field: FormItemContext) => void;
  removeField: (field: FormItemContext) => void;
}

export interface FormItemContext {
  validate: (trigger?: string) => any;
  prop: string;
  resetField(): void;
  clearValidate(): void;
}

export interface FormValidateFailure {
  errors: ValidateError[] | null;
  fields: ValidateFieldsError;
}

export interface FormItemRule extends RuleItem {
  trigger?: string;
}

export type FormRules = Record<string, FormItemRule[]>;

export interface FormInstance {
  validate: () => Promise<any>;
  resetFields: (props?: string[]) => void;
  clearValidate: (props?: string[]) => void;
}

export const FormContextKey: InjectionKey<FormContext> = Symbol('formContextKey');
export const FormItemContextKey: InjectionKey<FormItemContext> = Symbol('FormItemContext');
