import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getAllFriendsThunk } from '../../../store/request'
import OneFriend from '../OneFriend'
import "./FriendList.css"
const FriendsList = ({ user, mutualFriends, accepted, deleted, setAccepted, setDeleted }) => {
  const current_user = useSelector(state => state.session.user)
  const [friends, setFriends] = useState([]);

  // const { userId }  = useParams();
  const userId = user.id
  const dispatch = useDispatch()

  useEffect(() => {

    (async () => {
      const response = await fetch(`/api/users/${userId}/friends`);

      const users_friends = await response.json();
      setFriends(users_friends.friends);
    })();
    if(deleted === true){
      setDeleted(false)
    }
    if(accepted === true){
      setAccepted(false)
    }
  }, [userId, user, accepted, deleted]);


  let friendsList = document.querySelector(".friends-list")
  useEffect(() => {
    if(friends.length === 2 ||
      friends.length === 5 ||
      friends.length === 8
      ){
        if(friendsList){

          friendsList.style.justifyContent = 'space-around'
        } else {
          friendsList.style.justifyContent = 'space-between'
        }
      }
  }, [friends, friendsList]);


  return (
    <>
      <div className="profile-friends-info">
        <div className='friends-info-top'>
          <h3 className='friend-header'>Friends</h3>
          <p className='see-all-friends'>{friends.length > 8 && 'See all friends'}</p>
        </div>
        <span className='friends-amount'>{friends.length} {current_user.id !== userId ? (
          `(${mutualFriends.length} mutual)`
        ) : 'friend(s)'} </span>
      </div>
      <div className='friends-list'>
        {friends && friends.map((friend, i) => (
          <>
            {i > 8 ? '' : (
              <OneFriend friend={friend}/>
            )}
          </>
        ))}
      </div>
    </>
  )
}

export default FriendsList