import { getPhoto } from "@/utils/helper"

export default function handler(req, res) {
  const parsedIds = parseIds(req?.query?.ids)
  const photosPromises = parsedIds.map(getPhoto)

  Promise.allSettled(photosPromises).
    then(photos => {
      photos = photos.filter(photo => photo)
      res.end(JSON.stringify(photos))
    }).
    catch(e => console.log(e))
}

function parseIds(ids) {
  try {
    return JSON.parse(ids) || []
  } catch(e) {
    return []
  }
}
