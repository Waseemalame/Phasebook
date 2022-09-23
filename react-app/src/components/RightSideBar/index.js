import React from 'react'
import Contacts from '../Contacts/Contacts'
import "./RightSideBar.css"
const RightSideBar = () => {
  return (
    <div className='right-sidebar-container'>
      <div className="contacts">
        <Contacts />
      </div>
    </div>
  )
}

export default RightSideBar
