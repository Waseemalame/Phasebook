const GET_LIKES = "likes/GET_LIKES"
const ADD_LIKE = "likes/ADD_LIKE"
const DELETE_LIKE = "likes/DELETE_LIKE"

const getLikes = (likes) => ({
  type: GET_LIKES,
  likes
})
export const getLikesThunk = () => async (dispatch) => {
  const res = await fetch("/api/likes")
  if(res.ok){
    const likes = await res.json()
    dispatch(getLikes(likes.likes))
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
    default:
      return state;
  }
};
export default likesReducer
