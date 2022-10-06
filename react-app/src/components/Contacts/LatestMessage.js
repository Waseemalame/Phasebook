import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useMessageContext } from '../context/messageContext';

const LatestMessage = ({ friend }) => {
  const [userMessages, setUserMessages] = useState();
  const { messageSent, messages } = useMessageContext()
  const current_user = useSelector(state => state.session.user)
  const [oneLastMessage, setOneLastMessage] = useState();

  useEffect(() => {
    (async () => {


        const res = await fetch(`/api/messages/${friend.id}`)
        if(res.ok){
          const msgs = await res.json()
          setUserMessages(msgs.messages)

        }

    })()
  }, [messageSent, friend, messages.length]);
  useEffect(() => {
    if(userMessages){
      if(userMessages[userMessages.length - 1]){
        setOneLastMessage(userMessages[userMessages.length - 1])
      }
    }
  });

  return (
    <div className='last-message-wrapper'>
      {oneLastMessage ? (
        <div className='latest-message-container'>
          {oneLastMessage.msg_sender_id === current_user.id ? (
            <div className='latest-message-username'>You:</div>
          ) : (
            <div className='latest-message-username'>{friend.username}:</div>
          )}
          <div className='latest-message-body'>{oneLastMessage.msg_body}</div>

        </div>
      ) : (
        <div className='last-message-placeholder'></div>
      )}
    </div>
  )
}

export default LatestMessage
