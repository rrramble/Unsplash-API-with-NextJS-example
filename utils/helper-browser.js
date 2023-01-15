export function contains (parent, item) {
  if (parent === undefined || item === undefined || item === null) {
    return false
  }

  if (parent === item) {
    return true
  }

  const { parentNode: itemParentNode } = item
  return contains(parent, itemParentNode)
}


export function generateUniqueID() {
  const timePart = Date.now()
  const randomPart = Math.floor(Math.random() * 1000000)
  return `${timePart}${randomPart}`
}
