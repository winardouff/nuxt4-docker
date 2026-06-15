interface ToastState {
  message: string
  visible: boolean
  timeout: ReturnType<typeof setTimeout> | null
}

const state = reactive<ToastState>({
  message: '',
  visible: false,
  timeout: null,
})

export function useToast() {
  function show(message: string, duration: number = 3000) {
    if (state.timeout) {
      clearTimeout(state.timeout)
    }

    state.message = message
    state.visible = true

    state.timeout = setTimeout(() => {
      state.visible = false
      state.message = ''
    }, duration)
  }

  function hide() {
    if (state.timeout) {
      clearTimeout(state.timeout)
    }
    state.visible = false
    state.message = ''
  }

  return {
    state: readonly(state),
    show,
    hide,
  }
}
