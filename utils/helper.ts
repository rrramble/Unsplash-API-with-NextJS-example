import path from 'path'
import { promises as fs } from 'fs'
import { fetchPhoto } from './unsplash'

export async function getPhoto(id: string) {
  try {
    return await getJSONDataFile(['photos', id + '.json'])
  } catch (e) {
    console.info(e.message)
  }

  let contents: string
  try {
    contents = await fetchPhoto(id)
  } catch (e) {
    throw new Error(e.message)
  }

  let json
  try {
    json = JSON.parse(contents)
  } catch (e) {
    throw new Error(`Could not parse json with photo ID: ${id}`)
  }

  try {
    await saveFile(['photos', `${id}.json`], contents)
  } catch (e) {
    console.log(`Could not save photo info with ID: ${id}`)
  }
  return json
}

export async function getPhotos(slugName: string) {
  return await getJSONDataFile(['topics', slugName + '.json'])
}

export async function getTopics() {
  return await getJSONDataFile(['topics', '__items__.json'])
}


// Internal functions

async function getFileContents(pathParts: string[]) {
  const fileFullPath = path.join(process.cwd(), 'data', ...pathParts)
  try {
    return await fs.readFile(fileFullPath, 'utf8')
  } catch(e) {
    throw new Error(`Error reading file: "${fileFullPath}"`)
  }
}

async function getJSONDataFile(pathParts: string[]) {
  let contents: string
  try {
    contents = await getFileContents(pathParts)
  } catch(e) {
    throw new Error(e.message)
  }

  try {
    return JSON.parse(contents)
  } catch (e) {
    return JSON.parse('[]')
  }
}

async function saveFile(pathParts: string[], contents: string) {
  const fileFullPath = path.join(process.cwd(), 'data', ...pathParts)
  try {
    await fs.writeFile(fileFullPath, contents)
  } catch (e) {
    throw new Error(`Could not save file: ${fileFullPath}`)
  }
}
