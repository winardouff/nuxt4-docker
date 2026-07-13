import { jwtDecode } from 'jwt-decode'

export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie('auth.token')
  const refreshToken = useCookie('refresh.token')

  if (token.value && refreshToken.value) {
    try {
      const decoded = jwtDecode(token.value)
      if (decoded) {
        return navigateTo('/dashboard')
      }
    } catch {
      // Invalid token, allow access to login page
    }
  }
})
