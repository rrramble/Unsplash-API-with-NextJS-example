import path from 'path'
import { promises as fs } from 'fs'

export async function readFileContents(pathParts: string[]) {
  const fileFullPath = path.join(process.cwd(), 'data', ...pathParts)
  try {
    return await fs.readFile(fileFullPath, 'utf8')
  } catch(e) {
    throw new Error(`Error reading file: "${fileFullPath}"`)
  }
}

export async function readFileContentsAsJSON(pathParts: string[]) {
  let contents: string
  try {
    contents = await readFileContents(pathParts)
  } catch(e) {
    throw new Error(e.message)
  }

  try {
    return JSON.parse(contents)
  } catch (e) {
    return JSON.parse('{}')
  }
}

export async function saveFile(pathParts: string[], contents: string) {
  const fileFullPath = path.join(process.cwd(), 'data', ...pathParts)
  try {
    await fs.writeFile(fileFullPath, contents)
  } catch (e) {
    throw new Error(`Could not save file: ${fileFullPath}`)
  }
}
