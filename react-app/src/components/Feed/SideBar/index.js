import React from 'react'
import { useSelector } from 'react-redux'
import './SideBar.css'

const SideBar = () => {
  const current_user = useSelector(state => state.session.user)

  return (
    <div className='sidebar-container'>
        <div><img className='profile-icon' src={current_user.profile_image_url} alt=""/>Waseem Alame</div>
        <div><img src="https://static.xx.fbcdn.net/rsrc.php/v3/y8/r/S0U5ECzYUSu.png" alt=""/>Friends</div>
        <div><img src="https://static.xx.fbcdn.net/rsrc.php/v3/yU/r/D2y-jJ2C_hO.png" alt=""/>Marketplace</div>
        <div><img src="https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/PrjLkDYpYbH.png" alt=""/>Groups</div>
        <div><img src="https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/duk32h44Y31.png" alt=""/>Watch</div>
        <div><img src="https://static.xx.fbcdn.net/rsrc.php/v3/y8/r/he-BkogidIc.png" alt=""/>Memories</div>
        <div><img src="https://static.xx.fbcdn.net/rsrc.php/v3/yD/r/lVijPkTeN-r.png" alt=""/>Saved</div>
    </div>
  )
}

export default SideBar
