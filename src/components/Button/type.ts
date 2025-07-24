export type ButtonType = 'primary' | 'success' | 'danger' | 'warning'
export type ButtonSize = 'small' | 'normal' | 'large'
export type NativeType = 'submit' | 'button' | 'reset'

export interface ButtonProps {
  type?: ButtonType;
  size?: ButtonSize;
  plain?: boolean;
  round?: boolean;
  circle?: boolean;
  disabled?: boolean;
  nativeType?: NativeType;
  autofocus?: boolean;
  loading?: boolean;
  icon?: string;
}

export interface ButtonInterface {
  ref: HTMLButtonElement
}