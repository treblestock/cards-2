import type { RouteLocationRaw, RouteLocationNormalized, RouterLinkProps } from "vue-router"

const BASE_URL = import.meta.env.BASE_URL || '/'
export function withBaseUrl(string: string) {
  return (BASE_URL + string).replace('//', '/')
}

export function paramsValuesToStrings(to: Exclude<RouteLocationRaw, string> & {params?: Record<string, any> }): RouteLocationRaw & JSONedParams {
  return {
      ...to,
      params: !to.params
        ? {} 
        : Object.entries(to.params).reduce((newParams, [paramName, paramValue]) => {
              const isDefined = paramValue != undefined
              if (isDefined) newParams[paramName] = JSON.stringify(paramValue)
              return newParams
            }
          , {} as JSONedParams['params'])
  }
}

export function modifyRouteTo (to: RouteLocationRaw) {
  return typeof to === 'string' 
    ? withBaseUrl(to)
    : paramsValuesToStrings(to)
}

interface JSONedParams {
  params: Record<string, string>
}

export function propsParser(route: RouteLocationNormalized & JSONedParams): Record<string, any> {
  return Object.entries(route.params).reduce((props, [key, value]) => 
    // required to ignore params auto fitted by router,
    // which were not provided by developer passing params: {}
    value ? (props[key] = JSON.parse(value), props) : props 
  , {} as Record<string, any>)
}

export interface WithParamsAny extends Omit<RouterLinkProps, 'to'> {
  to?: string | RouterLinkProps['to'] | {
    params?: Record<string, any>
  } 
}