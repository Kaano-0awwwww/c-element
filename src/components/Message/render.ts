import { render, h } from 'vue';
import MessageConstructor from './Message.vue';
import type { MessageProps } from './types';

function createMessage(props: MessageProps) {
  const container = document.createElement('div');
  const vnode = h(MessageConstructor, props);

  render(vnode, container);
  document.body.appendChild(container.firstElementChild!);
}

export default createMessage;
