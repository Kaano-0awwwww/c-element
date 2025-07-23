import type { Ref, InjectionKey } from 'vue';
export type NameType = string | number

export interface CollapseProps {
  modelValue: NameType[],
  // 是否支持手风琴模式，开启一个，另外一个自动关闭
  according?: boolean
}
export interface CollapseEmits {
  (e: 'update:modelValue', values: NameType[]): void,
  (e: 'change', values: NameType[]):  void
}
export interface CollapseItemProps {
  name: NameType,
  title?: string,
  disabled?: boolean
}
export interface CollapseContext {
  activeNames: Ref<NameType[]>,
  handleClick: (name: NameType) => void
}
export const CollapseContextKey: InjectionKey<CollapseContext> = Symbol('CollapseContextKey');