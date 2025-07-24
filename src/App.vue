<script setup lang="ts">
import Button from './components/Button/Button.vue';
import { onMounted, ref } from 'vue';
import type { ButtonInterface } from './components/Button/type';
import Collapse from './components/Collapse/Collapse.vue';
import Item from './components/Collapse/CollapseItem.vue';
import Icon from './components/Icons/Icon.vue';

const buttonRef = ref<ButtonInterface | null>(null);
onMounted(() => {
  console.log('buttonRef', buttonRef.value?.ref); 
});

const collapseVal = ref(['a']);
</script>

<template>
  <main>
    <Icon icon="arrow-up" size="2xl" type="primary" color="green"></Icon>
    <Button ref="buttonRef">Test Button</Button>
    <Button plain>Plain Button</Button>
    <Button round>Round Button</Button>
    <Button circle>VK</Button>
    <Button disabled>Disabled Button</Button><br/><br/>
    <Button type="primary">Primary</Button>
    <Button type="success">Success</Button>
    <!-- <Button type="info">Info</Button> -->
    <Button type="warning">Warning</Button>
    <Button type="danger">Danger</Button><br/><br/>
    <Button type="primary" plain>Primary</Button>
    <Button type="success" plain>Success</Button>
    <!-- <Button type="info" plain>Info</Button> -->
    <Button type="warning" plain>Warning</Button>
    <Button type="danger" plain>Danger</Button><br/><br/>
    <Button size="large">Large</Button>
    <Button size="small">Small</Button><br />

    <Button size="small" icon="arrow-up">图标</Button><br />
    <Button size="small" loading>图标</Button><br />
  </main>

  <div>
    <Collapse v-model="collapseVal" according>
      <Item name="a" >
        <template #title>
          <h1>nice title</h1>
        </template>
        <h1>headline title</h1>
        <div> this is content a aaa </div>
      </Item>
      <Item name="b" title="nice title b item b">
        <div> this is bbbbb test </div>
      </Item>
      <Item name="c" title="nice cccc" disabled>
        <div> this is cccc test </div>
      </Item>
    </Collapse>
    {{ collapseVal }}
  </div>
</template>

<style scoped>

</style>
