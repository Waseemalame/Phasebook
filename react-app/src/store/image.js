const LOAD_IMAGES = "images/LOAD_IMAGES"
const DELETE_IMAGES = "images/DELETE_IMAGES"

const getImages = (images) => {
  return {
    type: LOAD_IMAGES,
    images
  }
}

const deleteImages = (imageId) => ({
  type: DELETE_IMAGES,
  imageId
})

export const getImagesThunk = () => async dispatch => {
  const response = await fetch('/api/images/')

  if (response.ok){
    const images = await response.json()
    dispatch(getImages(images))
  }
}

export const deleteImagesThunk = (imageId) => async dispatch => {
  const response = await fetch(`/api/images/${imageId}`, {
    method: 'delete'
  });

  if(response.ok){
    dispatch(deleteImages(imageId))
  }
}

const initialState = {};

const imagesReducer = (state = initialState, action) => {
  switch (action.type) {

    case LOAD_IMAGES:
      const newImages = {};
      action.images.images.forEach(image => {
      newImages[image.id] = image;
    })
    return {
      ...state,
      ...newImages
    }
    case DELETE_IMAGES:
      const newState = { ...state }
      delete newState[action.imageId]
      return newState
    default:
      return state;
  }
}

export default imagesReducer
