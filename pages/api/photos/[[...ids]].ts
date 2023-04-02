import { getPhotoRawEntry } from '@/utils/helper-filesystem'
import { NextApiRequest, NextApiResponse } from "next"
import { PhotoIds } from 'types/photos'
import { EMPTY_JSON_AS_TEXT } from '@/utils/helper-common'

type queryType = {
  ids?: PhotoIds,
}

export default function handler(req: NextApiRequest, res: NextApiResponse): void {
  const { ids } = req.query as queryType
  if (typeof ids === 'undefined') {
    res.end(EMPTY_JSON_AS_TEXT)
    return
  }

  const [ id ] = ids // TODO: fetch all ids
  getPhotoRawEntry(id)
    .then(photoRawEntry => res.end(photoRawEntry))
}
