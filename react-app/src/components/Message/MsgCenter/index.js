import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import Contacts from '../../Contacts/Contacts'
import "./MsgCenter.css"
const MessageCenter = () => {
  const [showMessenger, setShowMessenger] = useState(false);
  const current_user = useSelector(state => state.session.user)
  useEffect(() => {
    const msgCenterTab = document.querySelector('.msg-center-tab')
    if(showMessenger){
      msgCenterTab.style.bottom = '20em'
    } else {
      msgCenterTab.style.bottom = '0em'
    }
  }, [showMessenger]);
  const handleMsgCenterClick = () => {
    setShowMessenger(!showMessenger)
  }

  return (
    <div className="msg-center-container">

      <div onClick={handleMsgCenterClick} className='msg-center-tab'>
        <div><img className='msg-center-user-img' src={current_user.profile_image_url || "https://i.imgur.com/hrQWTvu.png"} alt="" /></div>
        <div className='msg-center-header'>Messaging</div>
        <div>
          {showMessenger ? (
            <i class="fa-solid fa-chevron-down up-caret"></i>
          ) : (
            <i class="fa-solid fa-chevron-up up-caret"></i>
          )}
          </div>
      </div>
      {showMessenger && (
        <div className="message-contacts">
          <Contacts />
        </div>
      )}
    </div>
  )
}

export default MessageCenter
