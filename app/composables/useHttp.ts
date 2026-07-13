type ServicePrefix =
  | 'sales'
  | 'inventory'
  | 'ai'
  | 'arlo'
  | 'employee'
  | 'user'
  | 'core'
  | 'poppa'
  | 'event'
  | 'manufacture'
  | 'finance'
  | 'workflow'

export function useHttp() {
  const config = useRuntimeConfig()
  const token = useCookie('auth.token')

  const servicePathMap: Record<ServicePrefix, string> = {
    sales: 's/',
    inventory: 'i/',
    ai: 'ai/',
    arlo: 'a/',
    employee: 'e/',
    user: 'u/',
    core: 'c/',
    poppa: 'kl/v1/',
    event: 'v/',
    manufacture: 'm/',
    finance: 'f/',
    workflow: 'w/',
  }

  const localUrlMap: Record<string, string> = {
    sales: config.public.apiSalesLocalUrl as string,
    ai: config.public.apiAiLocalUrl as string,
    poppa: config.public.apiPoppaLocalUrl as string,
    inventory: config.public.apiInventoryLocalUrl as string,
    arlo: config.public.apiArloLocalUrl as string,
    employee: config.public.apiEmployeeLocalUrl as string,
    user: config.public.apiUserLocalUrl as string,
    core: config.public.apiCoreLocalUrl as string,
    manufacture: config.public.apiManufactureLocalUrl as string,
    finance: config.public.apiFinanceLocalUrl as string,
    workflow: config.public.apiWorkflowLocalUrl as string,
  }

  function buildUrl(path: string, prefix: ServicePrefix): string {
    const appEnv = config.public.appEnv as string

    if (appEnv === 'local') {
      return localUrlMap[prefix] + path
    }

    return (config.public.baseUrl as string) + servicePathMap[prefix] + path
  }

  function getHeaders(additionalHeaders: Record<string, string> = {}): Record<string, string> {
    return {
      Authorization: `Bearer ${token.value || ''}`,
      'x-api-version': config.public.appVersion as string,
      ...additionalHeaders,
    }
  }

  async function httpPost<T = any>(
    path: string,
    body: any,
    prefix: ServicePrefix,
    additionalHeaders: Record<string, string> = {},
    timeout: number = 60000
  ): Promise<T> {
    const url = buildUrl(path, prefix)

    return $fetch<T>(url, {
      method: 'POST',
      body,
      headers: getHeaders(additionalHeaders),
      timeout,
    })
  }

  async function httpGet<T = any>(
    endpoint: string,
    options: { responseType?: 'json' | 'text' | 'blob' | 'arrayBuffer' | 'stream' } = {}
  ): Promise<T> {
    return $fetch<T>(endpoint, {
      method: 'GET',
      headers: getHeaders(),
      timeout: 30000,
      ...options,
    })
  }

  return {
    httpPost,
    httpGet,
  }
}
