export function useSentry() {
  const { $sentry } = useNuxtApp()

  function catchError(err: any) {
    if ($sentry) {
      $sentry.captureException(err, {
        extra: {
          message: err?.message || 'Unknown error',
        },
      })
    } else {
      console.error('[Sentry not initialized]', err)
    }
  }

  return {
    catchError,
  }
}
