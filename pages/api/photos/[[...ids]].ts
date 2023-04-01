import { getPhotoRawEntry } from '@/utils/helper'
import { NextApiRequest, NextApiResponse } from "next"
import { PhotoIds } from 'types/photos'

const EMPTY_JSON_TEXT = JSON.stringify('{}')

type queryType = {
  ids?: PhotoIds,
}

export default function handler(req: NextApiRequest, res: NextApiResponse): void {
  const { ids } = req.query as queryType
  if (typeof ids === 'undefined') {
    res.end(EMPTY_JSON_TEXT)
    return
  }

  const [ id ] = ids
  getPhotoRawEntry(id)
    .then(photoRawEntry => res.send(photoRawEntry))
}
