import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import OneFriend from '../OneFriend';
import FriendCard from './FriendCard';
import "./ShowFriends.css"
const ShowFriends = ({ user, setClickedPosts, setClickedFriends, mutualFriends, setDeleted, setAccepted, deleted, setMutualFriends, accepted }) => {
  const [friends, setFriends] = useState([]);
  const userId = user.id

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

  return (
    // sf stands for 'show-friends'
    <div className='sf-container'>
      <div className='sf-upper'>
        <h3 className="sf-header">Friends</h3>
      </div>
      <div className="sf-body">
        {friends && friends.map((friend, i) => (
          <div className='show-friend-cards'>
              <FriendCard
                        friend={friend}
                        setClickedPosts={setClickedPosts}
                        setClickedFriends={setClickedFriends}
                        mutualFriends={mutualFriends}
                        setAccepted={setAccepted}
                        setDeleted={setDeleted}
                        deleted={deleted}
                        accepted={accepted}
                        user={user}
                        setMutualFriends={setMutualFriends}
                        />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ShowFriends
