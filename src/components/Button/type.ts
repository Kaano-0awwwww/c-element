export type ButtonType = 'primary' | 'success' | 'danger' | 'warning'
export type ButtonSize = 'small' | 'normal' | 'large'

export interface ButtonProps {
  type?: ButtonType;
  size?: ButtonSize;
  plain?: boolean;
  round?: boolean;
  circle?: boolean;
  disabled?: boolean;
}