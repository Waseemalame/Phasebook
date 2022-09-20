import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useMessageContext } from '../../../context/messageContext'

import "./MsgPopUp.css"

const MsgPopUp = () => {
  const { showMsgPopup, setShowMsgPopup, msgUser, setMsgUser } = useMessageContext()
  const current_user = useSelector(state => state.session.user)
  const [msgBody, setMsgBody] = useState('')

  useEffect(() => {
    // console.log(msgUser)
    // console.log(msgBody)
  }, [msgUser, msgBody])


  const sendMessage = async (e) => {
    e.preventDefault()
    const data = {
      msg_body: msgBody,
      msg_sender_id: current_user.id,
      msg_recipient_id: msgUser.id
    }

    console.log(data)
  }

  if(!msgUser){
    return ''
  }
  return (
    <div className='msg-popup-container'>
      <div className="one-msg-popup">
        <div className="msg-popup-header">
          <div>
            <img className="msg-header-img" src={msgUser.profile_image_url} alt="" />
          </div>
          <div className="msg-user-info">
            <span className='msg-user-name'><strong>{msgUser.first_name}</strong></span>
          </div>
        </div>
        <form className='msg-form' onSubmit={sendMessage}>
          <input
              className='msg-input'
              placeholder='Aa'
              value={msgBody}
              onChange={(e) => setMsgBody(e.target.value)}
              type="text" />

          <button className='submit-msg' type="submit">Send</button>
        </form>
      </div>
    </div>
  )
}

export default MsgPopUp
