import { ref, Ref, onMounted, onBeforeUnmount } from 'vue';

interface ScannerListenerProps {
  scannerInput: Ref<string>;
  result: Ref<string | null>;
  reset: () => void;
}

const TIMEOUT_IN_MS = import.meta.env.VITE_SCAN_TIMEOUT_IN_MS || 200;

export function useScannerListener(): ScannerListenerProps {
  const scannerInput = ref('');
  const result = ref<string | null>(null);
  let timeoutId: any | undefined;

  const handleInput = (event: KeyboardEvent) => {
    const typedChar = event.key;

    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      // Set the result value after the timeout
      if (typedChar === 'Enter') {
        result.value = scannerInput.value;
      }
      scannerInput.value = ''; // Reset the scannerInput value
    }, TIMEOUT_IN_MS);

    // Append the typed character to the barcode input
    if (
      (event.key >= 'a' && event.key <= 'z') ||
      (event.key >= '0' && event.key <= '9') ||
      (event.key.length === 1 && event.key === event.key.toUpperCase())
    ) {
      scannerInput.value += typedChar 
    }
  };

  // Attach keyup event listener globally when the component is mounted
  onMounted(() => {
    window.addEventListener('keyup', handleInput);
  });

  // Remove keyup event listener when the component is unmounted
  onBeforeUnmount(() => {
    window.removeEventListener('keyup', handleInput);

    // Clear the timeout on unmount to avoid potential memory leaks
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }
  });

  const reset = () => {
    result.value = '';
  }

  return { scannerInput, result, reset };
}
