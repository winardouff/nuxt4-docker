export function useGeo() {
  function getCurrentPosition(options?: PositionOptions): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        timeout: 10000,
        enableHighAccuracy: true,
        ...options,
      })
    })
  }

  function watchPosition(
    callback: PositionCallback,
    errorCallback?: PositionErrorCallback,
    options?: PositionOptions
  ): number {
    return navigator.geolocation.watchPosition(callback, errorCallback, {
      enableHighAccuracy: true,
      ...options,
    })
  }

  function clearWatch(watchId: number) {
    navigator.geolocation.clearWatch(watchId)
  }

  return {
    getCurrentPosition,
    watchPosition,
    clearWatch,
  }
}
