import { saveFile, readFileContents, readFileContentsAsJSON } from 'utils/filesystem'
import { fetchPhotoRawEntry } from './unsplash'
import { Photo, Photos } from 'types/photos'
import { SearchTopics } from 'types/search-tags'

export const EMPTY_JSON_AS_TEXT = '{}'
export const EMPTY_JSON = JSON.parse(EMPTY_JSON_AS_TEXT)

export function getPromiseFulfilledValue<T>(promiseResult: PromiseSettledResult<T>): T {
  return  promiseResult.status === 'fulfilled' ?
    promiseResult.value :
    null
}

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
