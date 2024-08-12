import { PiniaPluginContext } from 'pinia';
import { markRaw } from 'vue'
import type {Router} from 'vue-router'


declare module 'pinia' {
  export interface PiniaCustomProperties<Id, S, G, A> {
    $router: Router
  }
}


export default function({app, store}: PiniaPluginContext) {
  if (Object.prototype.hasOwnProperty.call(store.$state, 'router') ) {
    console.warn('prop "router" is already defined on store: ' + store.$id) 
    return
  }

  const router = app.config.globalProperties.$router
  if (!router) {
    throw new Error(`
    There is no app.config.globalProperties.$router.
    Enable vue-router plugin before this one
    `)
  }
  store.$router = markRaw(router) as Router
}