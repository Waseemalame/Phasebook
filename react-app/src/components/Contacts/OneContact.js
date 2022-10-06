import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LatestMessage from './LatestMessage'

const OneContact = ({ friend, messagePopup }) => {

  if(!friend) return ''
  return (
    <div onClick={() => messagePopup(friend)} className='contact'>
                    <div>
                      {(friend && friend.profile_image_url) ? (
                        <img className="contact-image" src={friend.profile_image_url} alt="" />

                        ) : (

                          <img className="contact-image" src="https://i.imgur.com/hrQWTvu.png" alt="" />
                          )}
                      </div>
                      <div className="contact-bottom">

                      <div className='contact-name'>{friend.first_name} {friend.last_name}</div>
                      <div className="latest-message">
                          <LatestMessage friend={friend}/>
                      </div>
                      <div className="contact-underline"></div>
                      </div>

                  </div>
  )
}

export default OneContact
