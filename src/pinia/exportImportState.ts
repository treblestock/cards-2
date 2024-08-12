// todo?: implement pinia.$importState contract + logic
import { PiniaPluginContext, type Store, type Pinia } from 'pinia'
import donwload from '~/composables/useDownload'

declare module 'pinia' {
  export interface PiniaCustomProperties<Id, S, G, A> {
    toJSON(): string,
    exportState(): void,
    importState(state: any, reviver: (key: string, value: any) => any): void,
  }
  export interface Pinia {
    $exportState(): void
  }
}



export default function({pinia, store}: PiniaPluginContext) {
  store.toJSON = toJSON
  store.exportState = exportStoreState
  store.importState = importStoreState

  pinia.$exportState = exportPiniaState
  // pinia.$importState = importPiniaState 
}


// pinia.store
function importStoreState(this: Store, state: any, reviver: (key: string, value: any) => any): void {
  this.$patch(typeof state === 'string' ? JSON.parse(state, reviver) : state)
}

function toJSON(this: Store): string {
  return JSON.stringify(this.$state)
}
function exportStoreState(this: Store): void {
  return donwload('pinia_' + this.$id, this.toJSON() )
}

// pinia
// function importPiniaState(this: Pinia & {_s: Store[]}): void {
//   this._s.forEach(store => store.importState() )
// }
function exportPiniaState(this: Pinia & {_s: Store[]}): void {
  this._s.forEach(store => store.exportState() )
}