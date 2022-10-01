import { getPageFiles } from "next/dist/server/get-page-files"

export function getFavoritePhotosIds(type) {
  return lsGet('favoritePhotosIds', type)
}

export function getSearchedTexts(type) {
  return lsGet('searchedTexts', type)
}

export function isPhotoIdLiked(id) {
  return getFavoritePhotosIds().includes(id)
}

export function saveFavoritePhotoId(id) {
  return lsSave('favoritePhotosIds', id)
}

export function removeFavoritePhotoId(id) {
  return lsRemoveItem('favoritePhotosIds', id, id => id)
}

export function saveSearchedTexts(topic) {
  const searchedTopics = lsGet('searchedTexts')

  if (typeof topic === 'string') {
    const isAlreadySearched = searchedTopics.some(({ title }) => title === topic)
    if (isAlreadySearched) {
      return
    }

    return lsSave('searchedTexts', {
      id: generateUniqueID(),
      title: topic,
    })
  }

  const isAlreadySearched = searchedTopics.some(({ slug }) => slug === topic.slug)
  if (isAlreadySearched) {
    return
  }
  return lsSave('searchedTexts', topic)
}

export function lsGet(keyName, type) {
  let asString
  try {
    asString = localStorage.getItem(keyName)
  } catch (e) {
    asString = '{}'
  }

  if (type === 'string') {
    return asString
  }

  try {
    return JSON.parse(asString) || []
  } catch (e) {
    return []
  }
}

export function lsSave(keyName, item) {
  const items = lsGet(keyName)
  if (items.includes(item)) {
    return
  }

  items.push(item)
  const str = JSON.stringify(items)
  try {
    localStorage.setItem(keyName, str)
  } catch (e) {
  }
}

export function lsRemoveItem(keyName, item, fn) {
  const items = lsGet(keyName).filter(
    oldItem => fn(oldItem) !== fn(item)
  )
  const str = JSON.stringify(items)
  try {
    localStorage.setItem(keyName, str)
  } catch (e) {
  }
}

// TODO: move to its own library/part
function generateUniqueID() {
  const timePart = Date.now()
  const randomPart = Math.floor(Math.random() * 1000000)
  return `${timePart}${randomPart}`
}