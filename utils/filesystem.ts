import path from 'path'
import { promises as fs } from 'fs'

export async function readFileContents(pathParts: string[]): Promise<string> {
  const fileFullPath = path.join(process.cwd(), 'data', ...pathParts)
  try {
    return await fs.readFile(fileFullPath, 'utf8')
  } catch (_err) {
    throw new Error(`Error reading file: "${fileFullPath}"`) // TODO await?
  }
}

export async function readFileContentsAsArray<T>(pathParts: string[]): Promise<Array<T>> {
  try {
    let contents = await readFileContents(pathParts)
    return JSON.parse(contents)
  } catch (_err) {
    return []
  }
}

export async function saveFile(pathParts: string[], contents: string) {
  const fileFullPath = path.join(process.cwd(), 'data', ...pathParts)
  try {
    await fs.writeFile(fileFullPath, contents)
  } catch (_err) {
    console.log(`Could not save file: ${fileFullPath}`)
  }
}
