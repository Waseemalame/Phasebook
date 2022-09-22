import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMessageContext } from '../../../context/messageContext'
import { createMessageThunk, loadMessagesThunk } from '../../../store/message'
import { io } from 'socket.io-client'
import "./MsgPopUp.css"

let socket;

const MsgPopUp = () => {
  const { showMsgPopup, setShowMsgPopup, msgUser, setMsgUser, messages, setMessages } = useMessageContext()
  const current_user = useSelector(state => state.session.user)
  const directMessages = useSelector(state => Object.values(state.messages))
  const [chatInput, setChatInput] = useState('')
  const dispatch = useDispatch()
  const [messageHistory, setMessageHistory] = useState([])


    const joinedId = [current_user?.id, msgUser?.id].sort();
    const roomId = `${joinedId[0]}-${joinedId[1]}`;

    useEffect(() => {
      if(!current_user) return
      console.log(roomId)
      console.log(current_user.id)
      console.log(msgUser.id)
      if(current_user.id !== msgUser.id){

          if(roomId === `${current_user.id}-${msgUser.id}` || roomId === `${msgUser.id}-${current_user.id}`){

            (async () => {
              if(roomId === `${current_user.id}-${msgUser.id}` || roomId === `${msgUser.id}-${current_user.id}`){

                const res = await fetch(`/api/messages/${msgUser.id}`)
                console.log(res)
                if(res.ok){
                  const messages = await res.json()
                  console.log(messages.all_messages)
                  setMessageHistory(messages.all_messages)
                }
              }
            })()
            }
          }


    }, [current_user, msgUser, roomId]);
    // useEffect(() => {
    //   if(roomId === `${current_user.id}-${msgUser.id}` || roomId === `${msgUser.id}-${current_user.id}`){
    //     dispatch(loadMessagesThunk(msgUser.id))

    //   }
    // }, []);


    useEffect(() => {
        // create websocket/connect
        socket = io();
        if (socket && msgUser.id && current_user) socket.emit("join", { username: current_user.username, room: roomId })
        // listen for chat events
        socket.on("chat", (chat) => {

          // when we recieve a chat, add it into our messages array in state
          setMessages(messages => [...messages, chat])
        })

        // when component unmounts, disconnect
        return (() => {
            socket.disconnect()
            setMessages([]);
        })
    }, [])

    // additional code to be added
    let msgContainer = document.querySelector(".message-container")
    useEffect(() => {
      if(msgContainer){
        msgContainer.scrollTop = msgContainer.scrollHeight

        console.log(msgContainer.scrollHeight)
      }
    });



  const sendChat = (e) => {
    e.preventDefault()
    const data = {
      msg_body: chatInput,
      msg_sender_id: current_user.id,
      msg_recipient_id: msgUser.id
    }

    dispatch(createMessageThunk(data))

    // emit a message
    socket.emit("chat", { currUserId: current_user.id, otherId: msgUser.id, user_img: current_user.profile_image_url, msg: chatInput, room: roomId });

    // clear the input field after the message is sent
    setChatInput('')

  }
  useEffect(() => {
  }, []);

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
          <div className="close-msg-popup" onClick={() =>{
             setMsgUser(null)
             setShowMsgPopup(false)
             }}>
            X
          </div>
        </div>

        <div className='message-container'>
          {current_user && messageHistory.map((message, ind) => (
              <div key={ind} className={message.sender.id === current_user.id ? "one-msg-current-user" : "one-msg"}>
                <div className='msg-img-container'><img className="message-user-img" src={message.sender.profile_image_url} alt="" /></div>
                <div className="message-content">{message.msg_body}</div>
              </div>
            ))}

          {current_user && messages.map((message, ind) => (
            <div>
              {(message.currUserId === current_user.id &&
              message.otherId === msgUser.id) || (message.currUserId === msgUser.id &&
                message.otherId === current_user.id) ? (

                  <div key={ind} className={message.currUserId === current_user.id ? "one-msg-current-user" : "one-msg"}>
                  <div className='msg-img-container'><img className="message-user-img" src={message.user_img} alt="" /></div>
                  <div className="message-content">{message.msg}</div>
                </div>
                    ) : ''}
            </div>
            ))}
        </div>
        <form className='msg-form' onSubmit={sendChat}>
          <input
              className='msg-input'
              placeholder='Aa'
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              type="text" />

          <button className='submit-msg' type="submit">Send</button>
        </form>
      </div>
    </div>
  )
}

export default MsgPopUp
