import { readFileContents, readFileContentsAsArray, saveFile } from '@/utils/filesystem'
import { fetchPhotoRawEntry } from '@/utils/unsplash'
import { Photo, Photos } from 'types/photos'
import { SearchTopic, SearchTopics } from 'types/search-tags'

export async function getPhoto(id: string): Promise<Photo | null> {
  const photoRawEntry = await getPhotoRawEntry(id)

  try {
    console.info('Reading of fetching photo with id:', id)
    return JSON.parse(photoRawEntry)
  } catch (err: unknown) {
    console.error(err)
    return Promise.reject(`Could not parse read photo with id: "${id}"`)
  }
}

export async function getPhotoRawEntry(id: string): Promise<string> {
  try {
    return await readFileContents(['photos', `${id}.json`])
  } catch (err) {
    const errMessage = err !== null && typeof err === 'object' && 'message' in err ? err.message : `Could not read file with photo id: "${id}"`
    console.info(errMessage)
  }

  // If not found in our server - download from Unsplash API
  let contents: string

  try {
    contents = await fetchPhotoRawEntry(id)
    JSON.parse(contents)
  } catch (err) {
    const errMessage = err !== null && typeof err === 'object' && 'message' in err ? err.message : `Error fetching url: "${id}"`
    console.log(errMessage)
    return Promise.reject(errMessage)
  }

  try {
    saveFile(['photos', `${id}.json`], contents)
  } catch (err) {
    const errMessage = err !== null && typeof err === 'object' && 'message' in err ? err.message : `Error saving photo with id: "${id}"`
    console.log(errMessage)
  }

  return contents
}

export async function getPhotos(slugName: string): Promise<Photos> {
  return await readFileContentsAsArray<Photo>(['topics', slugName + '.json'])
}

export async function getTopics(): Promise<SearchTopics> {
  return await readFileContentsAsArray<SearchTopic>(['topics', '__items__.json'])
}
