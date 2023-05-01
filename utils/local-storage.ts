import { generateUniqueID } from '@/utils/helper-common'
import { SearchTopic, SearchTopics } from 'types/search-tags'
import { PlainFunction } from 'types/types'

export function getSearchedTexts(): SearchTopics {
  const texts = lsGetArray<SearchTopic>('searchedTexts')
  return texts
}

export function subscribeOnChangeSearchedTexts(cb: PlainFunction) { // TODO: use Store instead
  subscribeOnChange('searchedTexts', cb)
}

export function saveSearchedTexts(topic: string | SearchTopic): void {
  const searchedTopics = lsGetArray<SearchTopic>('searchedTexts')

  const isAlreadySaved = searchedTopics.some((searchedTopic: SearchTopic) => {
    return searchedTopic.title === topic ||
      (typeof topic === 'object' && searchedTopic.slug === topic.slug)
  })

  if (isAlreadySaved) {
    return
  }

  const itemToAdd = typeof topic === 'string' ?
    {
      id: generateUniqueID(),
      title: topic,
    } :
    topic

  lsAddItem('searchedTexts', itemToAdd)
}

// Local Storage direct manipulation functions
export function lsGetArray<T = any>(
    keyName: string
): T[] {
  let asString: string
  try {
    asString = localStorage.getItem(keyName) ?? '[]'
  } catch (e) {
    asString = '[]'
  }

  try {
    return JSON.parse(asString) || []
  } catch (e) {
    return []
  }
}

export function lsAddItem<T = any>(keyName: string, item: T) {
  const items = lsGetArray(keyName)
  if (items.includes(item)) {
    return
  }

  items.push(item)
  try {
    lsSave(keyName, items)
    callSubscribers(keyName)
  } catch (e) {
    return
  }
}

function lsSave(keyName: string, obj: unknown) {
  const str = JSON.stringify(obj)
  localStorage.setItem(keyName, str)
}

export function lsRemoveItem<T = any>(keyName: string, item: T) {
  const previousItems = lsGetArray(keyName)
  if (typeof previousItems !== 'object') {
    return
  }

  const restItems = previousItems.filter(oldItem => oldItem !== item)

  try {
    lsSave(keyName, restItems)
    callSubscribers(keyName)
  } catch (e) {
    return
  }
}

const subscribers:
{
  keyName: string,
  cb: PlainFunction,
}[] = []

export function subscribeOnChange(keyName: string, cb: PlainFunction) {
  subscribers.push({ keyName, cb })
}

function callSubscribers(keyName: string) {
  subscribers.forEach(item =>
    (item.keyName === keyName) && item.cb()
  )
}
