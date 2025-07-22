import type { Ref, InjectionKey } from 'vue';
export type NameType = string | number
export interface CollapseItemProps {
  name: NameType,
  title?: string,
  disabled?: boolean
}
export interface CollapseProps {
  modelValue: string[]
  // 是否支持手风琴模式，开启一个，另外一个自动关闭
  accordion: boolean
}
export interface CollapseContext {
  activeNames: Ref<NameType[]>,
  handleClick: (name: NameType) => void
}
export const CollapseContextKey: InjectionKey<CollapseContext> = Symbol('CollapseContextKey');