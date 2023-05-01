export type PhotoId = string
export type PhotoIds = PhotoId[]

type RelatedCollection = {
  id: string,
  links: { html: string },
  title: string,
}

export type RelatedCollections = RelatedCollection[]

export type RelatedCollectionsInfo = {
  results: RelatedCollection[]
}

type PhotoUrls = {
  raw?: string,
  full?: string,
  regular?: string,
  small?: string,
  thumb?: string,
}

type ProfileUrl = {
  large?: string,
  medium? : string,
  small? : string,
}

type User = {
  instagram_username?: string,
  name: string,
  profile_image?: ProfileUrl,
}

export type Photo = {
  alt_description?: string,
  color?: number,
  description?: string,
  height: number,
  id: PhotoId,
  related_collections: RelatedCollectionsInfo,
  urls: PhotoUrls,
  user: User,
  width: number,
}

export type Photos = Photo[]
