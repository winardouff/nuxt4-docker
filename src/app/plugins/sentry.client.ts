import * as Sentry from '@sentry/vue'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  if (!config.public.sentryDsn) return
  if (config.public.sentryDisabled === '1') return

  Sentry.init({
    app: nuxtApp.vueApp,
    dsn: config.public.sentryDsn as string,
    environment: config.public.sentryEnv as string,
    release: config.public.appVersion as string,
    integrations: [
      Sentry.browserTracingIntegration(),
    ],
    tracesSampleRate: 0.2,
  })

  return {
    provide: {
      sentry: Sentry,
    },
  }
})
