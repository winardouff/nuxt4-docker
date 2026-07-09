export function useAuth() {
  const config = useRuntimeConfig()
  const { httpPost } = useHttp()

  const cookieExpiredMinutes = Number(config.public.cookieExpiredInMinutes || 60)
  const cookieMaxAge = cookieExpiredMinutes * 60 // in seconds

  const token = useCookie('auth.token', { maxAge: cookieMaxAge })
  const refreshToken = useCookie('refresh.token', { maxAge: cookieMaxAge })
  const dbNameCookie = useCookie('db.name', { maxAge: cookieMaxAge })

  async function login(path: string, code: string) {
    const redirectUri = window.location.origin + window.location.pathname

    try {
      const response = await httpPost(path, {
        auth_code: code,
        redirect_uri: redirectUri,
      }, 'user')

      if (response?.data) {
        token.value = response.data.access_token
        refreshToken.value = response.data.refresh_token

        // Store db name if provided
        if (response.data.db_name) {
          dbNameCookie.value = response.data.db_name
        }

        let pathDirect = '/dashboard'
        if (response.data.default_page != null) {
          pathDirect = response.data.default_page
        }

        await navigateTo(pathDirect)
      }
    } catch (err: any) {
      if (window.location.pathname.includes('/callback')) {
        await navigateTo('/login')
      } else if (err?.response?.status === 500) {
        console.error(err)
        await navigateTo('/error')
      } else {
        console.error(err)
        await logout()
      }
    }
  }

  async function logout() {
    const toast = useToast()
    try {
      await httpPost('auth/logout', {
        refresh_token: refreshToken.value,
      }, 'user')
    } catch (err: any) {
      toast.show(err?.response?.data?.message || 'Logout failed')
    }

    token.value = null
    refreshToken.value = null
    localStorage.removeItem('user.data')
    localStorage.removeItem('user.permissions')
    await navigateTo('/login')
  }

  async function refreshTokenFn() {
    if (!refreshToken.value) return

    try {
      const response = await httpPost('auth/refresh', {
        refresh_token: refreshToken.value,
      }, 'user')

      if (response?.data) {
        // Re-create cookies with fresh maxAge (resets expiry timestamp)
        const freshToken = useCookie('auth.token', { maxAge: cookieMaxAge })
        const freshRefreshToken = useCookie('refresh.token', { maxAge: cookieMaxAge })
        freshToken.value = response.data.access_token
        freshRefreshToken.value = response.data.refresh_token
      }
    } catch (err) {
      console.error('RefreshToken Error:', err)
      // If refresh fails, force re-login
      token.value = null
      refreshToken.value = null
    }
  }

  function getUser(): any {
    try {
      return JSON.parse(localStorage.getItem('user.data') || 'null')
    } catch {
      return null
    }
  }

  function getPermissions(): string[] {
    try {
      return JSON.parse(localStorage.getItem('user.permissions') || '[]')
    } catch {
      return []
    }
  }

  function defaultPage(): string {
    const user = getUser()
    if (user?.roles?.[0]?.data?.default_page) {
      return user.roles[0].data.default_page
    }
    return '/dashboard'
  }

  function getDefaultNoo(): any[] {
    try {
      return JSON.parse(localStorage.getItem('default.noo') || '[]')
    } catch {
      return []
    }
  }

  function checkObjPermissions(objName: string, objValue: string): boolean {
    const user = getUser()
    if (!user) return true

    const relevantUserPerm =
      user.object_permissions?.filter(
        (op: any) => op.object_name === objName && op.is_grant_all !== 1
      ) || []

    const userPermMatch =
      relevantUserPerm.length === 0
        ? true
        : relevantUserPerm.some((op: any) => op.values.includes(objValue))

    const relevantRolePerm = (user.roles || [])
      .flatMap((role: any) => role.object_permissions || [])
      .filter((op: any) => op.object_name === objName && op.is_grant_all !== 1)

    const rolePermMatch =
      relevantRolePerm.length === 0
        ? true
        : relevantRolePerm.some((op: any) => op.values.includes(objValue))

    return userPermMatch && rolePermMatch
  }

  return {
    login,
    logout,
    refreshToken: refreshTokenFn,
    getUser,
    getPermissions,
    defaultPage,
    getDefaultNoo,
    checkObjPermissions,
  }
}
