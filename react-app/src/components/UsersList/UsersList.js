import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { getAllRequestsThunk } from '../../store/request';
import "./UsersList.css"
function UsersList({ searchString, setSearchList }) {
  const [users, setUsers] = useState([]);
  const history = useHistory()
  const requests = useSelector(state => Object.values(state.friendRequests))
  const current_user = useSelector(state => state.session.user)
  const dispatch = useDispatch()
  useEffect(() => {
    console.log('we doing this again?')
    console.log('we doing this again?')
    console.log('we doing this again?')
    console.log('we doing this again?')
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);
  useEffect(() => {
    dispatch(getAllRequestsThunk())
  }, [dispatch]);
  let usersArr = []

  useEffect(() => {
    console.log(current_user)
    console.log(requests)
  }, [current_user, requests])
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
        {/* <h1>User List: </h1> */}
        {/* <ul>{userComponents}</ul> */}
        {users.map(user => (
          <div>
            {requests.map(request => (
              <div>
                {
                (user.id === request.sender_id || current_user.id === request.sender_id)
                &&
                (user.id === request.recipient_id || current_user.id === request.recipient_id)
                && request.status === "accepted" && (
                  <div className='friends'>

                    <div>
                      {user.profile_image_url ? (
                        <img onClick={() => redirectProfile(user)} className="friend-image" src={user.profile_image_url} alt="" />

                        ) : (

                        <img onClick={() => redirectProfile(user)} className="friend-image" src="https://i.imgur.com/hrQWTvu.png" alt="" />
                      )}
                    </div>

                    <div>{user.first_name} {user.last_name}</div>
                  </div>
                )
                }
              </div>
            ))}
          </div>
        ))}
      </div>

  );
}

export default UsersList;
