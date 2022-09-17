import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { getAllRequestsThunk } from '../../store/request';
import "./UsersList.css"
function UsersList({ searchString, setSearchList }) {
  const [users, setUsers] = useState([]);
  const [mutualFriends, setMutualFriends] = useState([]);
  const [currentFriend, setCurrentFriend] = useState('');
  const history = useHistory()
  const current_user = useSelector(state => state.session.user)
  const dispatch = useDispatch()
  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);





  const findMutualFriends = async (e, friendId) => {
    e.stopPropagation()
    const response = await fetch(`/api/users/mutualfriends/${friendId}`);
    const responseData = await response.json();
    console.log(responseData)
    setMutualFriends(responseData.users);

  }

  const userComponents = users.map((user) => {
    return (
      <li key={user.id} className="user-list-item">
        <NavLink to={`/users/${user.id}`}>{user.username}</NavLink>
      </li>
    );
  });
  const userSearchRedirect = (userId) => {
    setSearchList(false)
    history.push(`/users/${userId}`)

  }
  const redirectProfile = (user) => {
    history.push(`/users/${user.id}`)
  }

  return (

      <div className='friend-list-container'>
        <span className='friends-header'>Friends</span>
          {current_user.friends.map(friend => (
                            <div onClick={() => redirectProfile(friend)} className='friend'>
                              <div>
                                {friend.profile_image_url ? (
                                  <img className="friend-image" src={friend.profile_image_url} alt="" />

                                  ) : (

                                  <img className="friend-image" src="https://i.imgur.com/hrQWTvu.png" alt="" />
                                )}
                                </div>

                              <div>{friend.first_name} {friend.last_name}</div>

                              <div className='mutual-friend-click' onClick={async (e, friendId) =>{
                                                                    // findMutualFriends(e, friend.id)
                                                                    setCurrentFriend(friend.first_name + ' ' + friend.last_name)
                                                                    }}>Mutual Friends</div>
                            </div>
          ))}
          {/* {currentFriend && <div>Mutual Friends with {currentFriend}</div>}

          {mutualFriends.length > 0 && mutualFriends.map(mutualFriend => (
            <div className='mutual-friend-container'>
            <div>
                                {mutualFriend.profile_image_url ? (
                                  <img onClick={() => redirectProfile(mutualFriend)} className="friend-image" src={mutualFriend.profile_image_url} alt="" />

                                  ) : (

                                  <img onClick={() => redirectProfile(mutualFriend)} className="friend-image" src="https://i.imgur.com/hrQWTvu.png" alt="" />
                                )}
                                </div>

                              <div>{mutualFriend.first_name} {mutualFriend.last_name}</div>
            </div>
          ))} */}
      </div>

  );
}

export default UsersList;
