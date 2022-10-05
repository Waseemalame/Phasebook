import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { deleteRequestThunk, getAllFriendsThunk, updateFriendRequestThunk } from '../../../store/request'
import "./ShowFriends.css"

const FriendCard = ({ friend, user, setClickedPosts, setClickedFriends, deleted, setDeleted, accepted, setAccepted, setMutualFriends }) => {
  const current_user = useSelector(state => state.session.user)
  const [status, setStatus] = useState('');
  const [one_request, setOne_request] = useState('');

  const history = useHistory()
  const dispatch = useDispatch()

  // Updating Mutual Friends between current user and profile-owner
  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/users/mutualfriends/${user.id}`);
      const responseData = await response.json();
      setMutualFriends(responseData.users);
    })();
  }, [user, setMutualFriends, deleted, accepted]);

  // Find Request between current user and a friend of profile-owner
  useEffect(() => {
    (async () => {
        if(friend.id === current_user.id) return;
        const response = await fetch(`/api/requests/profile/${friend.id}`);
        const oneRequest = await response.json();
        setOne_request(oneRequest)
        setStatus(oneRequest.status)
    })();
  }, [current_user.id, friend.id]);


  const redirectProfile = (user) => {
    setClickedFriends(false)
    setClickedPosts(true)
    history.push(`/users/${user.id}`)
  }

  const createRequest = async () => {
    const formData = new FormData()
    formData.append("sender_id", current_user.id)
    formData.append("recipient_id", friend.id)
    formData.append("status", "pending")
    const res = await fetch(`/api/requests`, {
      method: 'POST',
      body: formData
    })
    const result = await res.json()
    setOne_request(result.one_request)
    setStatus('pending')
  }

  const updateRequest = async () => {
    const data = {
      id: one_request.id,
      sender_id: friend.id,
      recipient_id: current_user.id,
      status: 'accepted'
    }
    const updatedReq = await dispatch(updateFriendRequestThunk(data))

    setAccepted(true)
    setStatus('accepted')
    dispatch(getAllFriendsThunk())
  }
  const deleteRequest = async () => {
    if(status === 'accepted') {

      const data = {
        requestId: one_request.id,
        userId: friend.id
      }
      const deletedFriend = await dispatch(deleteRequestThunk(data))
      setOne_request('')
      setDeleted(true)
      setStatus('')
      dispatch(getAllFriendsThunk())
    }
    else if(status !== 'accepted'){
      const res = await fetch(`/api/requests/${one_request.id}/${friend.id}`, {
        method: "DELETE"
      })
      if (res.ok){
        setStatus('')
      }
    }
  }
  return (
    <div className='sf-one'>
      <div className='sf-friend'>

        <div>
          {friend.profile_image_url ? (
            <img onClick={() => redirectProfile(friend)} className="sf-friend-image" src={friend.profile_image_url} alt="" />
            ) : (
            <img onClick={() => redirectProfile(friend)} className="sf-friend-image" src="https://i.imgur.com/hrQWTvu.png" alt="" />
          )}
        </div>

        <div className="sf-friend-info">
          <div className='sf-user-fullname' onClick={() => redirectProfile(friend)}>{friend.first_name} {friend.last_name}</div>
        </div>
        {current_user.id !== friend.id && (

          <>
            {status === 'accepted' && (
              <button className='sf-friend-btn' onClick={deleteRequest}>Remove friend</button>
            )}

            {(status === 'pending' && one_request?.recipient_id !== current_user.id) && (
              <button className='sf-friend-btn' onClick={deleteRequest}>Cancel request</button>
            )}

            {(status === 'pending' && one_request?.recipient_id === current_user.id) && (
              <button className='sf-friend-btn' onClick={updateRequest}>Approve request</button>
            )}

            {(!one_request.status || status === '') && (
              <button className='sf-friend-btn' onClick={createRequest}>Add friend</button>
            )}

          </>
        )}
      </div>
    </div>
  )
}

export default FriendCard
