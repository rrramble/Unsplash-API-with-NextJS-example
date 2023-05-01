import { env } from 'node:process'
if (!env) {
  throw new Error('Error accessing Environment.')
}

function getUrlOfJsonOfPhoto(id: string): string {
  if (!env?.UNSPLASH_API_KEY) {
    throw new Error(
        'Error. Provide UNSPLASH_KEY in your NodeJS environment.'
    )
  }
  return (
    `https://api.unsplash.com/photos/${id}?client_id=${env.UNSPLASH_API_KEY}`
  )
}

export async function fetchPhotoRawEntry(id: string): Promise<string> {
  const url = getUrlOfJsonOfPhoto(id)
  let response: Response

  try {
    response = await fetch(url)
    if (response.status !== 200) {
      const errMessage = `Error fetching from url "${url}" with status: ${response.status}.`
      return Promise.reject(errMessage)
    }
  } catch (err: unknown) {
    const errMessage = err !== null && typeof err === 'object' && 'message' in err ? err.message : `Error fetching url: "${url}"`
    return Promise.reject(errMessage)
  }

  try {
    return await response.text()
  } catch (err) {
    const errMessage = err !== null && typeof err === 'object' && 'message' in err ? err.message : `Error fetching url: "${url}"`
    return Promise.reject(
        `Received response from Unsplash.com,
        but could not get text content from it. Error message: "${errMessage}"`
    )
  }
}
