import IndividualImageCard from '@/components/IndividualImageCard/individual-image-card'
import SimilarPhotos from '@/components/IndividualImageCard/similar-photos'

export default function Photo({
  isLikedPhoto,
  likedPhotosIds,
  onClickLikeButton,
  photo,
  photos,
}) {

  const {
    related_collections,
    id: photoId,
  } = photo
  const relatedTags = related_collections?.results

  return (
    <>
      <IndividualImageCard
        photo={photo}
        isLiked={isLikedPhoto}
        onClickLikeButton={() => onClickLikeButton(photoId)}
        relatedTags={relatedTags}
      />
      <aside>
        <SimilarPhotos
          likedPhotosIds={likedPhotosIds}
          onClickLikeButton={onClickLikeButton}
          photos={excludeMainPhoto(photos, photoId)}
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
