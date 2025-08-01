export interface InputProps {
  type: string;
  size?: 'large' | 'small';
  disabled?: boolean;
  clearable?: boolean;
  showPassword?: boolean;
  modelValue: string;
}
export interface InputEmits {
  (e: 'update:modelValue', value: string): void;
}
