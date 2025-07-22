export interface CollapseItemProps {
  name: string | number,
  title?: string,
  disabled?: boolean
}
export interface CollapseProps {
  modelValue: string[]
  // 是否支持手风琴模式，开启一个，另外一个自动关闭
  accordion: boolean
}
