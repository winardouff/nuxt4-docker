export function useKeycloak() {
  const config = useRuntimeConfig()
  const token = useCookie('auth.token')
  const refreshToken = useCookie('refresh.token')

  const keycloakUrl = config.public.keycloakUrl as string
  const keycloakRealm = config.public.keycloakRealm as string
  const keycloakClientId = config.public.keycloakClientId as string
  const keycloakRedirectUri = config.public.keycloakRedirectUri as string

  function getAuthUrl(): string {
    const params = new URLSearchParams({
      client_id: keycloakClientId,
      redirect_uri: keycloakRedirectUri,
      response_type: 'code',
      scope: 'openid',
    })
    return `${keycloakUrl}/realms/${keycloakRealm}/protocol/openid-connect/auth?${params.toString()}`
  }

  function login() {
    window.location.href = getAuthUrl()
  }

  async function handleCallback(code: string): Promise<boolean> {
    try {
      const tokenUrl = `${keycloakUrl}/realms/${keycloakRealm}/protocol/openid-connect/token`

      const body = new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: keycloakClientId,
        redirect_uri: keycloakRedirectUri,
        code,
      })

      const response = await $fetch<any>(tokenUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      })

      if (response.access_token) {
        token.value = response.access_token
        refreshToken.value = response.refresh_token
        return true
      }
      return false
    } catch (error) {
      console.error('Keycloak callback error:', error)
      return false
    }
  }

  function logout() {
    const logoutUrl = `${keycloakUrl}/realms/${keycloakRealm}/protocol/openid-connect/logout`
    token.value = null
    refreshToken.value = null
    localStorage.clear()

    const params = new URLSearchParams({
      client_id: keycloakClientId,
      post_logout_redirect_uri: keycloakRedirectUri,
    })
    window.location.href = `${logoutUrl}?${params.toString()}`
  }

  return {
    login,
    handleCallback,
    logout,
  }
}
