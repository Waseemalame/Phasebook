// const ONE_REQUEST = "requests/ONE_REQUEST"
const ALL_REQUESTS = "requests/ALL_REQUESTS"
const CREATE_REQUEST = "requests/CREATE_REQUEST"
const UPDATE_REQUEST = "friends/UPDATE_REQUEST"
const DELETE_REQUEST = "requests/DELETE_REQUEST"
// const getOne = (request) => ({
//   type: ONE_REQUEST,
//   request
// })
const getAll = (requests) => ({
  type: ALL_REQUESTS,
  requests
})
const createOne = (request) => ({
  type: CREATE_REQUEST,
  request
})
const updateFriendRequest = (request) => ({
  type: UPDATE_REQUEST,
  request
})
const deleteOne = (requestId) => ({
  type: DELETE_REQUEST,
  requestId
})

// export const getOneRequestThunk = (userId) => async (dispatch) => {
//   const res = await fetch(`/api/requests/profile/${userId}`)
//   if(res.ok){
//     const request = await res.json()
//     dispatch(getOne(request))
//   }
// }
export const getAllRequestsThunk = () => async (dispatch) => {
  const res = await fetch(`/api/requests`)
  if(res.ok){
    const requests = await res.json()
    dispatch(getAll(requests))
  }
}
export const createRequestThunk = (data) => async (dispatch) => {
  const {
    sender_id,
    recipient_id,
    status
  } = data
  const formData = new FormData()
  formData.append("sender_id", sender_id)
  formData.append("recipient_id", recipient_id)
  formData.append("status", status)
  const res = await fetch(`/api/requests`, {
    method: 'POST',
    body: formData
  })
  if(res.ok){
    const request = await res.json()
    dispatch(createOne(request))
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
export const deleteRequestThunk = (requestId) => async (dispatch) => {
  const res = await fetch(`/api/requests/${requestId}`, {
    method: "DELETE"
  })
  if (res.ok){
    dispatch(deleteOne(requestId))
  }
}

const initialState = {};


const requestsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_REQUESTS:
      const newRequests = {};
      action.requests.all_requests.forEach(request => {
        newRequests[request.id] = request
      })
      return {
        ...state,
        ...newRequests
      }
    // case ONE_REQUEST:
    //   console.log(action.request.one_request)
    //   console.log(state.oneRequest)
    //   return {
    //     ...state,
    //     oneRequest: action.request.one_request[0],
    //   }
    case CREATE_REQUEST:
      console.log(state)
      console.log(action.request)
      return {
        ...state,
        [action.request.one_request.id]: action.request.one_request
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
