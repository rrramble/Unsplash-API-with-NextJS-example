import { NextApiRequest, NextApiResponse } from "next"
import { getPhoto } from "@/utils/helper-filesystem"

export default function handler(req: NextApiRequest, res: NextApiResponse): void {
  const parsedIds = parseIds(req.query?.ids)
  const photosPromises = parsedIds.map(getPhoto)

  Promise.allSettled(photosPromises).
    then(photos => {
      photos = photos.filter(photo => photo)
      return res.end(JSON.stringify(photos))
    }).
    catch(e => console.log(e))
}

function parseIds(ids: string | string[]) {
  if (typeof ids === 'object') {
    return []
  }

  try {
    return JSON.parse(ids) || []
  } catch(e) {
    return []
  }
}
