<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue';
import Button from './components/Button/Button.vue';
import { onMounted, ref } from 'vue';
import type { ButtonInterface } from './components/Button/type';

const buttonRef = ref<ButtonInterface | null>(null);
onMounted(() => {
  console.log('buttonRef', buttonRef.value?.ref); 
});

</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </header>

  <main>
    <Button ref="buttonRef" type="primary">Test Button</Button>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
