export function useImage() {
  async function reduceImageSize(
    base64Str: string,
    maxWidth: number,
    maxHeight: number,
    maxSize: number = 300,
    quality: number = 1
  ): Promise<string> {
    let y = 1
    if (base64Str.endsWith('==')) {
      y = 2
    }
    const xSize = base64Str.length * (3 / 4) - y
    const photoSize = Math.round(xSize / 1024)
    if (photoSize <= maxSize) {
      return base64Str
    }

    const resizedBase64 = await new Promise<string>((resolve) => {
      const img = new Image()
      img.src = base64Str
      img.onload = () => {
        const canvas = document.createElement('canvas')
        let width = img.width
        let height = img.height

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width
            width = maxWidth
          }
        } else if (height > maxHeight) {
          width *= maxHeight / height
          height = maxHeight
        }
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')!
        ctx.drawImage(img, 0, 0, width, height)
        resolve(canvas.toDataURL('image/jpeg', quality))
      }
    })
    return resizedBase64
  }

  return {
    reduceImageSize,
  }
}
