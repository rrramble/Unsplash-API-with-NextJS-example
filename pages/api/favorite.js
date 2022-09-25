import { getPhoto } from "@/utils/helper"

export default function handler(req, res) {
  const { ids } = req.query
  let parsedIds
  try {
    parsedIds = JSON.parse(ids) || []
  } catch (e) {
    parsedIds = []
  }

  const urlPromises = parsedIds.map(getPhoto)

  Promise.all(urlPromises).
  then(photos => {
    photos = photos.filter(photo => photo)
    res.end(JSON.stringify(photos))
  }).
  catch(e => console.log(e))
}
