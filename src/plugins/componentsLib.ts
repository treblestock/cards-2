import type { App, Component } from 'vue'
import * as components from '~/components/global'

interface ComponentsList {
  [key: string]: Component
}
export default function (app: App) {
  Object.getOwnPropertyNames(components).forEach(compName => {
    app.component(compName, (components as ComponentsList)[compName] )
  })
}