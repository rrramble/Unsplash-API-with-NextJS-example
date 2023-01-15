import path from 'path'
import { promises as fs } from 'fs'

async function getJSONDataFile(pathParts: string[]) {
  const jsonFileFullPath = path.join(process.cwd(), 'data', ...pathParts)
  let contents: string
  try {
    contents = await fs.readFile(jsonFileFullPath, 'utf8')
    return JSON.parse(contents)
  } catch (e) {
    return null
  }
}

export async function getPhoto(id: string) {
  return await getJSONDataFile(['photos', id + '.json'])
}

export async function getPhotos(slugName: string) {
  return await getJSONDataFile(['topics', slugName + '.json'])
}

export async function getTopics() {
  return await getJSONDataFile(['topics', '__items__.json'])
}
