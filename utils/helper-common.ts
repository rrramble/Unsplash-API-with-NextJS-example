export const EMPTY_JSON_AS_TEXT = '{}'
export const EMPTY_JSON = JSON.parse(EMPTY_JSON_AS_TEXT)

type HTMLElementContainingParentNode = { parentNode: HTMLElementContainingParentNode | null } | null | undefined

export function getFulfilledValues<T>(promiseResults: PromiseSettledResult<T>[]): T[] {
  const fulfilledValues = promiseResults.
    filter(promiseResult => promiseResult.status === 'fulfilled') as PromiseFulfilledResult<T>[]

  return fulfilledValues.
    map(({ value }) => value)
}

export function getPromiseFulfilledValue<T>(promiseResult: PromiseSettledResult<T>): T | null {
  return promiseResult.status === 'fulfilled' ?
    promiseResult.value :
    null
}

export function contains(parent: HTMLElementContainingParentNode, item: HTMLElementContainingParentNode): boolean {
  if (parent === undefined || item === undefined || item === null || item === undefined) {
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
  let timerId: NodeJS.Timeout

  function run(...args: unknown[]) {
    if (timerId) {
      return
    }

    timerId = setTimeout(() => {
      cb(...args)

      clearTimeout(timerId)
    }, timeoutMs)
  }

  return run
}
