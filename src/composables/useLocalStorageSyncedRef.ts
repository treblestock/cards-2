import { customRef, type Ref } from "vue"

export default <T>(localStorageKey: string, defaultValue: T): Ref<T> => {
  let value: T
  const storedRawValue = localStorage.getItem(localStorageKey)

  value = storedRawValue ? JSON.parse(storedRawValue) as T : defaultValue
  return customRef((
    track: () => void, 
    trigger: () => void
  ) => ({
    get() {
      track()
      return value
    },
    set(newValue: T) {
      value = newValue
      localStorage.setItem(localStorageKey, JSON.stringify(newValue))
      trigger()
    }
  }))
}