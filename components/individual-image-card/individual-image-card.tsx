import Photo from '@/components/individual-image-card/photo'
import SimilarPhotos from '@/components/individual-image-card/similar-photos'
import { Photo as PhotoType, PhotoId, PhotoIds, Photos } from 'types/photos'

type IndividualImageCardProps = {
  isLikedPhoto: boolean,
  likedPhotosIds: PhotoIds,
  onClickLikeButton: (photoId: PhotoId) => void,
  photo: PhotoType,
  photos: Photos,
}

export default function IndividualImageCard(props: IndividualImageCardProps) {
  const {
    related_collections,
    id: photoId,
  } = props.photo ?? {}
  const { results: relatedTags } = related_collections

  return (
    <>
      <Photo
        photo={props.photo}
        isLiked={props.isLikedPhoto}
        onClickLikeButton={() => props.onClickLikeButton(photoId)}
        relatedTags={relatedTags}
      />
      <aside>
        <SimilarPhotos
          likedPhotosIds={props.likedPhotosIds}
          onClickLikeButton={props.onClickLikeButton}
          photos={excludeMainPhoto(props.photos, photoId)}
        />
      </aside>
    </>
  )
}

function excludeMainPhoto(photos = [], photoId) {
  return photos.filter(
      photo => photoId !== photo.id
  )
}
