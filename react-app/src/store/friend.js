export const LOAD_FRIENDS = "friends/LOAD_FRIENDS";
export const LOAD_FRIEND_REQUESTS = "friends/LOAD_FRIEND_REQUESTS"
export const LOAD_FRIENDS_POSTS = "friends/FRIENDS_POSTS"
export const CREATE_REQUEST = "friends/CREATE_REQUEST"
export const UPDATE_REQUEST = "friends/UPDATE_REQUEST"
export const DELETE_FRIEND = 'friends/DELETE_FRIEND'
const getFriendRequests = (friendRequests) => ({
  type: LOAD_FRIEND_REQUESTS,
  friendRequests
})

const getUserFriends = (friends) => ({
  type: LOAD_FRIENDS,
  friends
})

const userFriendsPosts = (friendPosts) => ({
  type: LOAD_FRIENDS_POSTS,
  friendPosts
})

const createFriendRequest = (newFriendRequest) => ({
  type: CREATE_REQUEST,
  newFriendRequest
})

const updateFriendRequest = (updatedRequest) => ({
  type: UPDATE_REQUEST,
  updatedRequest
})

const deleteFriend = (requestId) => ({
  type: DELETE_FRIEND,
  requestId
})

export const deleteFriendThunk = (requestId) => async (dispatch) => {
  const response = await fetch(`/api/friendships/requests/${requestId}`, {
    method: 'delete'
  })
  if (response.ok){
    dispatch(deleteFriend(requestId))
  }
}

export const getFriendRequestsThunk = (userId) => async (dispatch) => {
  const res = await fetch(`/api/friendships/${userId}`)
  if (res.ok){
    const friendRequests = await res.json()
    dispatch(getFriendRequests(friendRequests))
  }
}

export const getUserFriendsThunk = (userId) => async (dispatch) => {

  const res = await fetch(`/api/friendships/${userId}/friends`)
  if (res.ok){
    const friends = await res.json();
    dispatch(getUserFriends(friends))
  }
}

export const getFriendsPostsThunk = (userId) => async (dispatch) => {

  const res = await fetch(`/api/friendships/${userId}/posts`)
  if(res.ok){
    const friendPosts = await res.json()
    dispatch(userFriendsPosts(friendPosts))
  }
}

export const createFriendRequestThunk = (data) => async (dispatch) => {
  const {
    user1_id,
    user2_id,
    status
  } = data
  const formData = new FormData()

      formData.append('user1_id', user1_id)
      formData.append('user2_id', user2_id)
      formData.append('status', status)


  const res = await fetch(`/api/friendships/`, {
    method: 'POST',
    body: formData
  })
  if (res.ok){
    const newFriendRequest = await res.json()
    dispatch(createFriendRequest(newFriendRequest))
    return newFriendRequest
  }

}
export const acceptFriendRequestThunk = (data) => async (dispatch) => {

  const res = await fetch(`/api/friendships/requests/${data.id}`, {
    method: 'PUT',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  if(res.ok){
    const updatedRequest = await res.json()
    dispatch(updateFriendRequest(updatedRequest))
    return updatedRequest
  }
}



const initialState = {friends: [], friendships: []};
const friendsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_FRIEND_REQUESTS:
      const allRequests = {}
      console.log(action.friendRequests)
      // action.friendRequests.forEach(request => {
      //   allRequests[request.id] = request;
      // })
      return {
        ...state,
        ...action.friendRequests
      }
    case UPDATE_REQUEST:
      return {
        ...state,
        friends: [...state.friends, action.updatedRequest]
      }
    case LOAD_FRIENDS:
      return {
        ...state,
        // ...action.friends
      };
      case LOAD_FRIENDS_POSTS:
      const friendsPosts = {}
      return {
        ...state,
        ...action.friendPosts
      }
      case CREATE_REQUEST:
        console.log(state)
        return {
          ...state,
          // ...state.friends,
          friendships: [...state.friendships, action.newFriendRequest],
          // ...action.newFriendRequest,
          // ...state.friendships,
        }
      case DELETE_FRIEND:
        const newState = { ...state }

        console.log(newState.friends)
        console.log('new state!!!!!!!!!!===============================')
        console.log('new state!!!!!!!!!!===============================')
        console.log('new state!!!!!!!!!!===============================')
        console.log('new state!!!!!!!!!!===============================')
        console.log('new state!!!!!!!!!!===============================')
        console.log('new state!!!!!!!!!!===============================')
        newState.friends?.forEach((friend, index) => {
          if(friend.id === action.requestId)
          delete newState.friends[index]
        })
        newState.friendships?.forEach((friendship, index) => {
          if(friendship.id === action.requestId)
          delete newState.friendships[index]
        })
        // delete newState.friendships[action.requestId]
        return newState
    default:
      return state;
  }
};
export default friendsReducer
