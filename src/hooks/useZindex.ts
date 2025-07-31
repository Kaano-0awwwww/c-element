import { computed, ref } from 'vue';

const zIndex = ref(0);

function useZindex(initialVal = 2000) {
  const initialZindex = ref(initialVal);
  const currentZindex = computed(() => initialZindex.value + zIndex.value);
  const nextZindex = () => {
    zIndex.value++;
    return currentZindex.value;
  };
  return {
    initialZindex,
    currentZindex,
    nextZindex,
  };
}

export default useZindex;
