import { describe, expect, test } from "vitest";
import Button from "./Button.vue";
import { mount } from '@vue/test-utils';
import Icon from "../Icons/Icon.vue";

describe('Button.vue', () => {
  test('basic button', () => {
    const el = mount(Button, {
      props: {
        type: 'primary'
      },
      slots: {
        default: 'button'
      }
    });
    console.log(el.html());
    expect(el.classes()).toContain('vk-button--primary');
    expect(el.get('button').text()).toBe('button');
    // events
    el.get('button').trigger('click');
    console.log(el.emitted());
    expect(el.emitted()).toHaveProperty('click');
  });

  test('disabled', () => {
    const el = mount(Button, {
      props: {
        disabled: true
      },
      slots: {
        default: 'disabled'
      }
    });
    expect(el.attributes('disabled')).toBeDefined();
    expect(el.find('button').element.disabled).toBeDefined();
    el.get('button').trigger('click');
    expect(el.emitted()).not.toHaveProperty('click');
  });

  test('icon', () => {
    const el = mount(Button, {
      props: {
        icon: 'arrow-up'
      },
      slots: {
        default: 'icon'
      },
      global: {
        stubs: ['Icon']
      }
    });
    const iconEle = el.findComponent(Icon);
    expect(iconEle.exists()).toBeTruthy();
    expect(iconEle.attributes('icon')).toBe('arrow-up');
  });

  test('loading', () => {
    const el = mount(Button, {
      props: {
        loading: true
      },
      slots: {
        default: 'loading'
      },
      global: {
        stubs: ['Icon']
      }
    });
    const iconEle = el.findComponent(Icon);
    expect(iconEle.exists()).toBeTruthy();
    expect(iconEle.attributes('icon')).toBe('spinner');
    expect(el.attributes('disabled')).toBeDefined();
  });
});