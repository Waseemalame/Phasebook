import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import "../components/Navigation/Navigation.css"
function UsersList({ searchString, setSearchList }) {
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
  let usersArr = []


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
  return (
    <>
      {/* <h1>User List: </h1> */}
      {/* <ul>{userComponents}</ul> */}
      {users.map(user => (
        <div>
          {console.log(user)}
          {((user.username).toLowerCase().includes(searchString.toLowerCase()) && searchString !== '') ||
              ((user.first_name).toLowerCase().includes(searchString.toLowerCase()) && searchString !== '')
           ? (
            <li key={user.id} className="user-list-item">
              <div onClick={() => userSearchRedirect(user.id)}>{user.username}</div>
            </li>
          ) : (
            ''
          )}
          </div>
      ))}
    </>
  );
}

export default UsersList;
