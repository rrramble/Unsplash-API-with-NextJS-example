import { saveFile, getFileContents, getFileContentsAsJSON } from 'utils/filesystem'
import { fetchPhotoRawEntry } from './unsplash'
import { Photo, Photos } from 'types/photos'
import { SearchTopics } from 'types/search-tags'

const EMPTY_JSON_AS_TEXT = '{}'
const EMPTY_JSON = JSON.parse(EMPTY_JSON_AS_TEXT)

export async function getPhoto(id: string): Promise<Photo> {
  const  photoRawEntry = await getPhotoRawEntry(id)
  try {
    return JSON.parse(photoRawEntry)
  } catch (err) {
    console.info(err.message)
    return EMPTY_JSON // TODO: Promise.reject(e.message)
  }
}

export async function getPhotoRawEntry(id: string): Promise<string> {
  try {
    return await getFileContents(['photos', `${id}.json`])
  } catch (err) {
    console.info(err.message)
  }

  // If not found - download from Unsplash API
  let contents: string
  try {
    contents = await fetchPhotoRawEntry(id)
    const _ = JSON.parse(contents)
  } catch (err) {
    console.log(err.message)
    return EMPTY_JSON_AS_TEXT // TODO: Promise.reject(e.message)
  }

  try {
    saveFile(['photos', `${id}.json`], contents)
  } catch (err) {
    console.log(err.message)
  }
  return contents
}

export async function getPhotos(slugName: string): Promise<Photos> {
  return await getFileContentsAsJSON(['topics', slugName + '.json'])
}

export function getPromiseFulfilledValue<T>(promiseResult: PromiseSettledResult<T>): T {
  return  promiseResult.status === 'fulfilled' ?
    promiseResult.value :
    null
}

export async function getTopics(): Promise<SearchTopics> {
  return await getFileContentsAsJSON(['topics', '__items__.json'])
}
