import type { PiniaPluginContext } from 'pinia'

declare module 'pinia' {
  export interface DefineStoreOptionsBase<S, Store> {
    /**
     * pinia `store` lifecycle hook.
     * Runs after store registration in `pinia` 
     * (after first 'useStore()' )
     */
    onRegister?(this: Store): void
  }
}

export default ({store, options}: PiniaPluginContext) => {
  if (store.onRegister) return store.onRegister()
  if (options.onRegister) return options.onRegister.call(store)
}