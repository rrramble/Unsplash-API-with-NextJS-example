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

export function saveSearchedTexts(text) {
  return lsSave('searchedTexts', text)
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
