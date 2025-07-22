<script setup lang="ts">
import Button from './components/Button/Button.vue';
import { onMounted, ref } from 'vue';
import type { ButtonInterface } from './components/Button/type';

const buttonRef = ref<ButtonInterface | null>(null);
onMounted(() => {
  console.log('buttonRef', buttonRef.value?.ref); 
});

</script>

<template>
  <main>
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
    <Button size="small">Small</Button>
  </main>
  <h1>Hello</h1>
  <h2>Hello</h2>
  <h3>Hello</h3>
  <a>link</a>
</template>

<style scoped>

</style>
