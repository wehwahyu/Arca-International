import { ref } from 'vue'

const isOpen = ref(true)

export function useSidebar() {
  return {
    isOpen,
  }
}
