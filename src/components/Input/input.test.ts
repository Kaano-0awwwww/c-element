import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import Input from './Input.vue';

describe('Input', () => {
  it('基本展示', () => {
    // 针对动态 class，查看 classes 是否正确
    // 针对 v-if 是否渲染正确的标签以及内容
    // 针对 slots，是否渲染对应的 slots 内容
    const wrapper = mount(Input, {
      props: {
        size: 'small',
        type: 'text',
        modelValue: '',
      },
      slots: {
        prepend: 'prepend',
        prefix: 'prefix',
      },
    });
    console.log(wrapper.html());
    // classes
    expect(wrapper.classes()).toContain('vk-input--small');
    expect(wrapper.classes()).toContain('is-prepend');
    // should render input
    expect(wrapper.find('input').exists()).toBeTruthy();
    expect(wrapper.get('input').attributes('type')).toBe('text');
    // slots
    expect(wrapper.find('.vk-input__prepend').exists()).toBeTruthy();
    expect(wrapper.get('.vk-input__prepend').text()).toBe('prepend');
    expect(wrapper.find('.vk-input__prefix').exists()).toBeTruthy();
    expect(wrapper.get('.vk-input__prefix').text()).toBe('prefix');

    // textarea
    const wrapper2 = mount(Input, {
      props: {
        type: 'textarea',
        modelValue: '',
      },
    });
    expect(wrapper2.find('textarea').exists()).toBeTruthy();
  });
  it('支持 v-model', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: 'test',
        'onUpdate:modelValue': (e: any) => wrapper.setProps({ modelValue: e }),
        type: 'text',
      },
    });
    // 初始值
    const input = wrapper.get('input');
    expect(input.element.value).toBe('test');
    // 更新值
    await input.setValue('update');
    expect(wrapper.props('modelValue')).toBe('update');
    expect(input.element.value).toBe('update');
    // v-model 的异步更新
    await wrapper.setProps({ modelValue: 'prop update' });
    expect(input.element.value).toBe('prop update');
  });
});
