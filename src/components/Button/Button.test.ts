import { describe, test } from "vitest";
import Button from "./Button.vue";
import { mount } from '@vue/test-utils';

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
  });
});