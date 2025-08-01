import { render, h, shallowReactive } from 'vue';
import type { CreateMessageProps, MessageContext } from './types';
import MessageConstructor from './Message.vue';
import useZIndex from '../../hooks/useZindex';

let seed = 1;
const instances: MessageContext[] = shallowReactive([]);

export function createMessage(props: CreateMessageProps) {
  const id = `message_${seed++}`;
  const { nextZindex } = useZIndex();
  const container = document.createElement('div');
  const destory = () => {
    // 删除数组中的实例
    const idx = instances.findIndex((instance) => instance.id === id);
    if (idx === -1) return;
    instances.splice(idx, 1);
    render(null, container);
  };
  // 手动删除message实例
  const manualDestory = () => {
    const find = instances.find((ita) => ita.id === id);
    if (find) find.vm.exposed!.visible.value = false;
  };
  const newProps = {
    ...props,
    id,
    onDestory: destory,
    zindex: nextZindex(),
  };
  const vnode = h(MessageConstructor, newProps);
  render(vnode, container);
  //非空断言操作符
  document.body.appendChild(container.firstElementChild!);
  const vm = vnode.component!;
  const instance = {
    id,
    vnode,
    vm,
    props: newProps,
    destory: manualDestory,
  };
  instances.push(instance);
  return instance;
}

export const getLastInstance = () => {
  return instances.at(-1);
};
export const getLastBottomOffset = (id: string) => {
  const idx = instances.findIndex((instance) => instance.id === id);
  console.log('idx', id, idx, instances.length);
  if (idx <= 0) {
    return 0;
  } else {
    const prev = instances[idx - 1];
    return prev.vm.exposed!.bottomOffset.value;
  }
};
