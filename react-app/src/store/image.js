const LOAD_IMAGES = "images/LOAD_IMAGES"

const getImages = (images) => {
  return {
    type: LOAD_IMAGES,
    images
  }
}

export const getImagesThunk = () => async dispatch => {
  const response = await fetch('/api/images/')

  if (response.ok){
    const images = await response.json()
    dispatch(getImages(images))
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
    default:
      return state;
  }
}

export default imagesReducer
