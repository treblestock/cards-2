export { default as AppLink } from './AppLink.vue'

// @ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    AppLink: typeof import('./AppLink.vue')['default']
  }
}