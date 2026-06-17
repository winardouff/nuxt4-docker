export function useHelper() {
  function validateEmail(mail: string): boolean {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true
    }
    return false
  }

  function sanitizeArray(data: any, key: string): any[] {
    let result: any[] = []

    if (Array.isArray(data) && data.length > 0) {
      result = data.map((val) => val[key])
    } else if (data && data[key] !== undefined) {
      result.push(data[key])
    }

    return result
  }

  function blink(eventTarget: HTMLElement, color: string = 'blue') {
    const initialBg = eventTarget.style.background
    eventTarget.style.background = color
    setTimeout(() => {
      eventTarget.style.background = initialBg
    }, 500)
  }

  async function checkPermission(): Promise<MediaStream> {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true })
    if (stream) {
      const tracks = stream.getTracks()
      tracks.forEach((track) => track.stop())
    }
    return stream
  }

  function randomChar(chars: string, length: number): string {
    let result = ''
    const charArr = chars.split('')
    for (let i = 0; i < length; i++) {
      result += charArr[Math.floor(Math.random() * charArr.length)]
    }
    return result
  }

  function maxLengthNumber(event: Event, length: number): boolean {
    const input = (event.target as HTMLInputElement).value
    if (input.length > length) {
      event.preventDefault()
      return true
    }
    return false
  }

  function getPermissions(): string[] {
    try {
      const perms = localStorage.getItem('user.permissions')
      return perms ? JSON.parse(perms) : []
    } catch {
      return []
    }
  }

  function defaultPage(): string {
    // TODO: Determine default page based on user role
    return '/dashboard'
  }

  return {
    validateEmail,
    sanitizeArray,
    blink,
    checkPermission,
    randomChar,
    maxLengthNumber,
    getPermissions,
    defaultPage,
  }
}
