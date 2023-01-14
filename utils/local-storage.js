export function getFavoritePhotosIds(type) {
  return lsGetArray('favoritePhotosIds', type)
}

export function getSearchedTexts(type) {
  return lsGetArray('searchedTexts', type)
}

export function isPhotoIdLiked(id) {
  return getFavoritePhotosIds().includes(id)
}

export function saveFavoritePhotoId(id) {
  return lsAddItem('favoritePhotosIds', id)
}

export function subscribeOnChangeSearchedTexts(cb) {
  subscribeOnChange('searchedTexts', cb)
}

export function removeFavoritePhotoId(id) {
  return lsRemoveItem('favoritePhotosIds', id, id => id)
}

export function saveSearchedTexts(topic) {
  const searchedTopics = lsGetArray('searchedTexts')

  if (typeof topic === 'string') {
    const isAlreadySearched = searchedTopics.some(({ title }) => title === topic)
    if (isAlreadySearched) {
      return
    }

    return lsAddItem('searchedTexts', {
      id: generateUniqueID(),
      title: topic,
    })
  }

  const isAlreadySearched = searchedTopics.some(({ slug }) => slug === topic.slug)
  if (isAlreadySearched) {
    return
  }
  return lsAddItem('searchedTexts', topic)
}


// Local Storage direct manipulation functions
function lsGetArray(keyName, resultType) {
  let asString
  try {
    asString = localStorage.getItem(keyName)
  } catch (e) {
    asString = '{}'
  }

  if (resultType === 'string') {
    return asString
  }

  try {
    return JSON.parse(asString) || []
  } catch (e) {
    return []
  }
}

function lsAddItem(keyName, item) {
  const items = lsGetArray(keyName)
  if (items.includes(item)) {
    return
  }

  items.push(item)
  try {
    lsSaveArray(keyName, items)
    callSubscribers(keyName)
  } catch (e) {
    return
  }
}

function lsSaveArray(keyName, items) {
  const str = JSON.stringify(items)
  localStorage.setItem(keyName, str)
}

function lsRemoveItem(keyName, item, fn) {
  const items = lsGetArray(keyName).filter(
    oldItem => fn(oldItem) !== fn(item)
  )
  lsSaveArray(keyName, items)
}

const subscribers = []

function subscribeOnChange(keyName, cb) {
  subscribers.push({ keyName, cb })
}

function callSubscribers(keyName) {
  subscribers.forEach(item =>
    (item.keyName === keyName) && item.cb()
  )
}

// TODO: move to its own library/part
function generateUniqueID() {
  const timePart = Date.now()
  const randomPart = Math.floor(Math.random() * 1000000)
  return `${timePart}${randomPart}`
}
