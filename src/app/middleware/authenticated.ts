import { jwtDecode } from 'jwt-decode'

export default defineNuxtRouteMiddleware(async (to, from) => {
  // Only run on client side (localStorage, window access)
  if (import.meta.server) return

  const token = useCookie('auth.token')
  const refreshToken = useCookie('refresh.token')
  const config = useRuntimeConfig()
  const { httpPost } = useHttp()

  let loginUrl = '/login'
  if (window.location.pathname !== '/home') {
    loginUrl += '?path_url=' + window.location.pathname + window.location.search
  }

  // No tokens — redirect to login
  if (!token.value || !refreshToken.value) {
    clearUserData()
    return navigateTo(loginUrl)
  }

  // Decode JWT
  let decoded: any = null
  try {
    decoded = jwtDecode(token.value)
  } catch (error) {
    clearUserData()
    token.value = null
    refreshToken.value = null
    return navigateTo(loginUrl)
  }

  if (!decoded) {
    clearUserData()
    return navigateTo(loginUrl)
  }

  // Check if token is expired
  const expMs = decoded.exp * 1000
  if (expMs - Date.now() <= 0) {
    token.value = null
    refreshToken.value = null
    clearUserData()
    return navigateTo(loginUrl)
  }

  // Refresh token if less than 5 minutes remaining
  if (expMs - Date.now() < 300000) {
    try {
      const resp = await httpPost(
        'auth/refresh',
        { refresh_token: refreshToken.value },
        'user'
      )
      if (resp?.data) {
        token.value = resp.data.token
        refreshToken.value = resp.data.refresh_token
      }
    } catch (error) {
      console.error('Token refresh failed:', error)
    }
  }

  // Fetch user detail
  try {
    const resp = await httpPost(
      'user/detail',
      { request_url: window.location.origin + to.fullPath },
      'user'
    )

    if (resp?.data) {
      const userData = resp.data

      // Extract permissions
      const permissions: string[] = []
      const defaultNoo: any[] = []
      if (userData.roles !== null) {
        userData.roles.forEach((role: any) => {
          role.permissions.forEach((perm: any) => {
            permissions.push(perm.permission_nm)
            if (perm.permission_id.match(/^noo.*$/)) {
              defaultNoo.push(perm)
            }
          })
        })
        localStorage.setItem('user.permissions', JSON.stringify(permissions))
        localStorage.setItem('default.noo', JSON.stringify(defaultNoo))
      }

      // Store roles
      const store = useAppStore()
      const roles: string[] = []
      if (userData.roles && userData.roles.length > 0) {
        userData.roles.forEach((val: any) => roles.push(val.role_name))
        store.setRoles(roles)
      }

      // Store company ID
      const companyID: string[] = []
      if (userData.company_id && userData.company_id.length > 0) {
        companyID.push(userData.company_id[0])
      }
      store.setCompanyID(companyID)

      localStorage.setItem('user.data', JSON.stringify(userData))

      // Set Sentry user context
      const { $sentry } = useNuxtApp()
      if ($sentry) {
        $sentry.setUser({
          id: userData.user_id,
          fullname: decoded.name,
          app_version: config.public.appVersion,
        })
      }

      // TODO: Set up i18n locale
      // const langCode = userData.user_lang
      // setLocale(langCode)
    }
  } catch (error: any) {
    if (error?.response?.status === 401) {
      token.value = null
      refreshToken.value = null
      clearUserData()
      return navigateTo(loginUrl)
    }
  }

  // Redirect to stored path if exists
  const pathUrl = localStorage.getItem('path_url')
  if (pathUrl) {
    localStorage.removeItem('path_url')
    return navigateTo(pathUrl)
  }
})

function clearUserData() {
  localStorage.removeItem('user.data')
  localStorage.removeItem('user.permissions')
}
