const ALL_FRIENDS = "requests/ALL_FRIENDS"
const UPDATE_REQUEST = "friends/UPDATE_REQUEST"
const DELETE_REQUEST = "requests/DELETE_REQUEST"
// const getOne = (request) => ({
//   type: ONE_REQUEST,
//   request
// })
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
    const requests = await res.json()
    dispatch(getAll(requests))
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
      action.friends.all_requests.forEach(friend => {
        newRequests[friend.id] = friend
      })
      return {

        ...newRequests
      }
    case UPDATE_REQUEST:
      return {
        ...state,
        [action.request.id]: action.request
      }
    case DELETE_REQUEST:
      console.log(action)
      console.log('---------------------------action')
      const newState = { ...state }
      delete newState[action.requestId]
      return newState

    default:
      return state;
  }
};
export default requestsReducer
