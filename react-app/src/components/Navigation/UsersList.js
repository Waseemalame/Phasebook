import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const UsersList = ({ searchList, searchString, setSearchList }) => {
  const [users, setUsers] = useState([]);
  const history = useHistory()
  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const userListContainer = document.querySelector('.userlist-container')
    if(userListContainer.scrollHeight > 300){
      userListContainer.style.overflowY = 'scroll'
    } else {
      userListContainer.style.overflowY = ''
    }
  });

  const userSearchRedirect = (userId) => {
    window.scroll(0, 0)
    setSearchList(false)
    history.push(`/users/${userId}`)
  }

  return (
    <div className='userlist-container'>
        {users.map((user, i) => (
          <div className='searched-user'>
            {((user.username).toLowerCase().includes(searchString.toLowerCase()) && searchString !== '') ||
                ((user.first_name).toLowerCase().includes(searchString.toLowerCase()) && searchString !== '') ||
                ((user.last_name).toLowerCase().includes(searchString.toLowerCase()) && searchString !== '')
             ? (
              <div onClick={() => userSearchRedirect(user.id)} className='search-list-item' key={user.id}>
                <div><img className='search-user-img' src={user.profile_image_url} alt="" /></div>
                <div className='search-users-name'>{user.username} <span className='search-users-firstname'>({user.first_name})</span></div>
              </div>
            ) : (
              ''
            )}
            </div>
        ))}
    </div>
  )
}

export default UsersList
