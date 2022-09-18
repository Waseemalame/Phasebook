const ALL_FRIENDS = "requests/ALL_FRIENDS"
const UPDATE_REQUEST = "requests/UPDATE_REQUEST"
const DELETE_REQUEST = "requests/DELETE_REQUEST"

const getAll = (friends) => ({
  type: ALL_FRIENDS,
  friends
})
const updateFriendRequest = (request) => ({
  type: UPDATE_REQUEST,
  request
})
const deleteOne = (requestId) => ({
  type: DELETE_REQUEST,
  requestId
})

export const getAllFriendsThunk = () => async (dispatch) => {
  const res = await fetch(`/api/requests`)
  if(res.ok){
    const friends = await res.json()
    dispatch(getAll(friends.all_friends))
  }
}
export const updateFriendRequestThunk = (data) => async (dispatch) => {

  const res = await fetch(`/api/requests/${data.id}`, {
    method: 'PUT',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  if(res.ok){
    const request = await res.json()
    dispatch(updateFriendRequest(request))
    return request
  }
}
export const deleteRequestThunk = (data) => async (dispatch) => {

  const res = await fetch(`/api/requests/${data.requestId}/${data.userId}`, {
    method: "DELETE"
  })
  if (res.ok){

    dispatch(deleteOne(data.userId))
  }
}

const initialState = {};
const requestsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_FRIENDS:
      const newRequests = {};
      action.friends.forEach(friend => {
        newRequests[friend.id] = friend
      })
      return {
        // ...state,
        ...newRequests
      }
    case UPDATE_REQUEST:
      return {
        ...state,
        [action.request.id]: action.request
      }
    case DELETE_REQUEST:
      const newState = { ...state }
      delete newState[action.requestId]
      return newState

    default:
      return state;
  }
};
export default requestsReducer
