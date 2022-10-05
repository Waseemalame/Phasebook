import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { getAllFriendsThunk, getAllRequestsThunk } from '../../store/request';
import { useMessageContext } from '../context/messageContext';
// import "../RightSideBar/RightSideBar.css"
function Contacts({ searchString, setSearchList }) {
  const [users, setUsers] = useState([]);
  const [mutualFriends, setMutualFriends] = useState([]);
  const [currentFriend, setCurrentFriend] = useState('');
  const history = useHistory()
  const current_user = useSelector(state => state.session.user)
  const friends = useSelector(state => Object.values(state.friends))
  const { showMsgPopup, setShowMsgPopup, msgUser, setMsgUser, messages, setMessages } = useMessageContext()
  const dispatch = useDispatch()

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

useEffect(() => {
  dispatch(getAllFriendsThunk())
}, [dispatch]);



  const findMutualFriends = async (e, friendId) => {
    e.stopPropagation()
    const response = await fetch(`/api/users/mutualfriends/${friendId}`);
    const responseData = await response.json();
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
  const messagePopup = (user) => {
    if(user.id === current_user.id){
      setShowMsgPopup(false)
      setMsgUser(null)
      return
    }
    if(msgUser){
      setShowMsgPopup(false)
      setMsgUser(null)
      setMessages([])
    } else
    if(showMsgPopup){
      // return;
      setShowMsgPopup(false)
      setMsgUser(null)
      setShowMsgPopup(true)
      setMsgUser(user)
      setMessages([])


      // return
    }
      setShowMsgPopup(true)
      setMsgUser(user)

  }

  return (

      <div className='contacts-container'>
          {friends && friends.map(friend => (
                            <div onClick={() => messagePopup(friend)} className='contact'>
                              <div>
                                {friend.profile_image_url ? (
                                  <img className="contact-image" src={friend.profile_image_url} alt="" />

                                  ) : (

                                  <img className="contact-image" src="https://i.imgur.com/hrQWTvu.png" alt="" />
                                )}
                                </div>

                              <div className='contact-name'>{friend.first_name} {friend.last_name}</div>
                            </div>
          ))}
      </div>

  );
}

export default Contacts;
