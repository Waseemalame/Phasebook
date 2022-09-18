import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import "./OneFriend.css"
const OneFriend = ({ friend }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [mutualFriends, setMutualFriends] = useState([]);

  useEffect(() => {
    async function findMutualFriends() {
      const response = await fetch(`/api/users/mutualfriends/${friend.id}`);
      const responseData = await response.json();
      setMutualFriends(responseData.users);
    }
    findMutualFriends()
  }, []);

  const redirectProfile = (user) => {
    history.push(`/users/${user.id}`)
  }
  return (
    <div className='one-friend'>
      <div onClick={() => redirectProfile(friend)} className='friend'>

            <div>
              {friend.profile_image_url ? (
                <img className="friend-image" src={friend.profile_image_url} alt="" />
                ) : (
                <img className="friend-image" src="https://i.imgur.com/hrQWTvu.png" alt="" />
              )}
            </div>

            <div className="friend-info">
              <div>{friend.first_name} {friend.last_name}</div>
              {/* <div className='mutual-friend-click' onClick={async (e, friendId) =>{
                                                    // setCurrentFriend(friend.first_name + ' ' + friend.last_name)
                                                    }}>Mutual Friends</div> */}
            </div>
        </div>
    </div>
  )
}

export default OneFriend
