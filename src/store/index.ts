import { createPinia } from 'pinia'
import { PiniaSharedState } from 'pinia-shared-state'

const store = createPinia()
store.use(
  PiniaSharedState({
    // Enables the plugin for all stores. Defaults to true.
    enable: false,
    // If set to true this tab tries to immediately recover the shared state from another tab. Defaults to true.
    initialize: true,
    // Enforce a type. One of native, idb, localstorage or node. Defaults to native.
    type: 'localstorage',
  }),
)

export default store
