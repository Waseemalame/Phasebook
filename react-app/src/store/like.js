const GET_LIKES = "likes/GET_LIKES"
const ADD_LIKE = "likes/ADD_LIKE"
const DELETE_LIKE = "likes/DELETE_LIKE"

const getLikes = (likes) => ({
  type: GET_LIKES,
  likes
})
const addLike = (like) => ({
  type: ADD_LIKE,
  like
})
const deleteLike = (likeId) => ({
  type: DELETE_LIKE,
  likeId
})
export const getLikesThunk = () => async (dispatch) => {
  const res = await fetch("/api/likes")
  if(res.ok){
    const likes = await res.json()
    dispatch(getLikes(likes.likes))
  }
}
export const addLikeThunk = (data) => async (dispatch) => {
  const { post_id, user_id } = data
  const formData = new FormData()
  formData.append('post_id', post_id)
  formData.append('user_id', user_id)

  const res = await fetch(`/api/likes/`, {
    method: 'POST',
    body: formData,
  })
  if(res.ok){
    const like = await res.json()
    await dispatch(addLike(like))
    return like
  }
}

export const deleteLikeThunk = (likeId) => async (dispatch) => {
  const res = await fetch(`/api/likes/${likeId}`, {
    method: 'DELETE'
  })
  if(res.ok){
    await dispatch(deleteLike(likeId))
  }
}

const initialState = {};

const likesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIKES:
      const allLikes = {}
      action.likes.forEach(like => {
        allLikes[like.id] = like
      })
      return allLikes
    case ADD_LIKE:
      return {
        ...state,
        [action.like.id]: action.like
      }
    case DELETE_LIKE:
      const likeState = { ...state }
      delete likeState[action.likeId]
      return likeState
    default:
      return state;
  }
};
export default likesReducer
