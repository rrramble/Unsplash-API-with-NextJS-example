export function contains(parent, item) {
  if (parent === undefined || item === undefined || item === null) {
    return false
  }

  if (parent === item) {
    return true
  }

  const { parentNode: itemParentNode } = item
  return contains(parent, itemParentNode)
}

export function generateUniqueID(): string {
  const timePart = Date.now()
  const randomPart = Math.floor(Math.random() * 1000000)
  return `${timePart}${randomPart}`
}

export async function downloadPhotoByUrl(url: string, filename: string): Promise<void> {
  let image: Response
  try {
    image = await fetch(url);
    if (!image.ok) {
      return
    }
  } catch(e) {
    return
  }

  const blob = await image.blob()
  const imageURL = URL.createObjectURL(blob)
  const el = document.createElement('a')
  el.href = imageURL
  el.download = filename ?? `${url}.jpeg`
  el.style.display = 'none'
  document.body.appendChild(el)
  el.click()
  document.body.removeChild(el)
}

export function throttle(cb: (...args: unknown[]) => void, timeoutMs: number) {
  let timerId = null

  function run(...args) {
    if (timerId) {
      return
    }

    timerId = setTimeout(() => {
      cb(...args)

      clearTimeout(timerId)
      timerId = null
    }, timeoutMs)
  }

  return run
}
