import type { PiniaPluginContext } from 'pinia'

declare module 'pinia' {
  export interface DefineStoreOptionsBase<S, Store> {
    /**
     * set `true` to watch `store.$state` changes and save
     * into `localStorage` as `localStorage.setItem(store.$id, store.$state)`
     */
    isToCacheState?: boolean
  }
}

export default function({store, options}: PiniaPluginContext) {
  if (!options.isToCacheState) return

  const storageData = localStorage.getItem(store.$id)
  if (storageData) {
    const localState: unknown = JSON.parse(storageData)
    if (!isValidStateData(localState) ) return
    
    store.$state = localState
  } else {
    console.log('there is no saved state', store.$id)
  }
  

  
  // 1) Should be careful not to add helper link like state.$router to state
  store.$subscribe(() => {
    localStorage.setItem(store.$id, JSON.stringify(store.$state) )
  }, { detached: true } )

  // 2) Cons: store.$path advantages aren't used
  // watch(
  //   () => store.$state,
  //   (state) => {
  //     localStorage.setItem(store.$id, JSON.stringify(state) )
  //   },
  //   { deep: true }
  // )

}


function isValidStateData(data: unknown): data is object {
  if (!(data instanceof Object ) ) {
    console.log('invalid state data in local storage,\n got primitive data:' + data )
    return false
  }
  if(data.constructor !== Object) return false
  return true
}