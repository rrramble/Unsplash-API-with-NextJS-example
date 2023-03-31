import { generateUniqueID } from '@/utils/helper-browser'
import { SearchTopic, SearchTopics } from 'types/search-tags'
import { PlainFunction } from 'types/types'

export function getSearchedTexts(): SearchTopics {
  const texts = lsGetArray<SearchTopic>('searchedTexts')
  return texts
}

export function subscribeOnChangeSearchedTexts(cb) {
  subscribeOnChange('searchedTexts', cb)
}

export function saveSearchedTexts(topic: string | SearchTopic): void {
  const searchedTopics = lsGetArray<SearchTopic>('searchedTexts')

  if (typeof topic === 'string') {
    const isAlreadySaved = searchedTopics.some(({ title }) => title === topic)
    if (isAlreadySaved) {
      return
    }

    return lsAddItem('searchedTexts', {
      id: generateUniqueID(),
      title: topic,
    })
  }

  const isAlreadySaved = searchedTopics.some(
      (searched: SearchTopic): boolean => 'slug' in searched && searched.slug === topic.slug
  )
  if (isAlreadySaved) {
    return
  }
  return lsAddItem('searchedTexts', topic)
}


// Local Storage direct manipulation functions
export function lsGetArray<T>(
    keyName: string
): T[] {
  let asString: string
  try {
    asString = localStorage.getItem(keyName)
  } catch (e) {
    asString = '{}'
  }

  try {
    return JSON.parse(asString) || []
  } catch (e) {
    return []
  }
}

export function lsAddItem(keyName: string, item) {
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

export function lsRemoveItem(keyName: string, item, cb) {
  const unfilteredItems = lsGetArray(keyName);
  if (typeof unfilteredItems !== 'object') {
    return
  }

  const items = unfilteredItems.filter(
      oldItem => cb(oldItem) !== cb(item)
  )

  try {
    lsSave(keyName, items)
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
