import type { Ref } from 'vue';
import { onMounted, onUnmounted } from 'vue';

function useClickOutside(elRef: Ref<undefined | HTMLElement>, callBack: (e: MouseEvent) => void) {
  const handler = (e: MouseEvent) => {
    if (elRef.value && e.target) {
      if (!elRef.value.contains(e.target as HTMLElement)) {
        callBack(e);
      }
    }
  };

  onMounted(() => {
    document.addEventListener('click', handler);
  });
  onUnmounted(() => {
    document.removeEventListener('click', handler);
  });
}

export default useClickOutside;
