import { render, h } from 'vue';
import MessageConstructor from './Message.vue';
import type { createMessageProps } from './types';

function createMessage(props: createMessageProps) {
  const container = document.createElement('div');
  // 挂载卸载实例方法
  const destory = () => {
    render(null, container);
  };
  const newProps = {
    ...props,
    onDestory: destory,
  };
  const vnode = h(MessageConstructor, newProps);
  render(vnode, container);
  document.body.appendChild(container.firstElementChild!);
}

export default createMessage;
