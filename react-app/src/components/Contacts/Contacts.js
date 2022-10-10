import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { loadMessagesThunk } from '../../store/message';
import { getAllFriendsThunk, getAllRequestsThunk } from '../../store/request';
import { useMessageContext } from '../context/messageContext';
import OneContact from './OneContact';
function Contacts({ searchString, setSearchList }) {
  const [users, setUsers] = useState([]);
  const [mutualFriends, setMutualFriends] = useState([]);
  const [currentFriend, setCurrentFriend] = useState('');
  const history = useHistory()
  const current_user = useSelector(state => state.session.user)
  const friends = useSelector(state => Object.values(state.friends))
  const { showMsgPopup, setShowMsgPopup, msgUser, setMsgUser, setMessages, mostRecentMessager } = useMessageContext()

  const dispatch = useDispatch()
  const [sortedFriends, setSortedFriends] = useState([]);

  useEffect(() => {
    dispatch(loadMessagesThunk())
  }, []);

  useEffect(() => {
    if(mostRecentMessager > 0){

      let index;
      for (let i = 0; i < friends.length; i++) {
      const friend = friends[i];
      if(friend.id === mostRecentMessager){
        index = i
      }
    }

    const friendAtIndex = friends[index]
    friends.splice(index, 1)
    friends.unshift(friendAtIndex)
    setSortedFriends(friends)
  } else {
    setSortedFriends(friends)
  }
  }, [mostRecentMessager]);

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
      setShowMsgPopup(false)
      setMsgUser(null)
      setShowMsgPopup(true)
      setMsgUser(user)
      setMessages([])
    }
      setShowMsgPopup(true)
      setMsgUser(user)

  }

  return (

      <div className='contacts-container'>
          {sortedFriends && sortedFriends.map((friend, i) => (
                <div key={`friends-messenger-${i}`} className="contact-wrapper">
                  <OneContact friend={friend} messagePopup={messagePopup}/>
                </div>
          ))}
      </div>

  );
}

export default Contacts;
