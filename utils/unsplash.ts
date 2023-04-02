import { env } from 'node:process'

function getUrlOfJsonOfPhoto(id: string) {
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
      throw new Error(
          `Error fetching status: ${response.status}.`
      )
    }
  } catch (e) {
    throw new Error(e.message)
  }

  try {
    return await response.text()
  } catch(e) {
    throw new Error(
        `Recieved response from Unsplash.com,
        but could not get its data.`
    )
  }
}
