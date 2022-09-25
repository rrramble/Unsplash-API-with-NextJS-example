export const initialState = {
  favoritePhotosIds: [],
}

export const AppReducer = (state, action) => {
  switch (action.type) {
    case "toggle_like_status": {
      return {
        ...state,
        favoritePhotosIds: toggleLikeStatus(state.favoritePhotosIds, action.value),
      }
    }
    default: {
      return state
    }
  }
}

function addPhotoId(photoIds, newId) {
  if (photoIds.includes(newId)) {
    return photoIds
  }
  return [ ...photoIds, newId ]
}

function removePhotoId(photoIds, newId) {
  return photoIds.filter(id => id !== newId)
}

function toggleLikeStatus(photoIds, id) {
  if (photoIds.includes(id)) {
    return removePhotoId(photoIds, newId)
  } else {
    return addPhotoId(photoIds, newId)
  }
}
