import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useProfileContext } from '../context/profileContext'
import './SideBar.css'
const SideBar = () => {
  const { clickedFriends, setClickedFriends, setClickedPosts, setScrollToFriends } = useProfileContext()
  const current_user = useSelector(state => state.session.user)
  const history = useHistory()

  const redirectProfile = (user) => {
    window.scrollTo(0, 0)
    setScrollToFriends(false)
    history.push(`/users/${user.id}`)
  }
  const redirectToFriends = (user) => {
    setClickedFriends(true)
    setClickedPosts(false)
    setScrollToFriends(true)
    history.push(`/users/${user.id}`)

  }

  return (
    <div className='sidebar-container'>
        <div className='sidebar-to-profile' onClick={() => redirectProfile(current_user)}><img className='profile-icon' src={current_user.profile_image_url} alt=""/>{current_user.first_name} {current_user.last_name}</div>
        <div className='sidebar-to-friends' onClick={() => redirectToFriends(current_user)}><img src="https://static.xx.fbcdn.net/rsrc.php/v3/y8/r/S0U5ECzYUSu.png" alt=""/>Friends</div>
        <div className="tech-used">Technologies Used</div>
        <li className='react'><img src="https://img.icons8.com/office/30/000000/react.png" alt="react"/>React</li>
        <li className='react'><img src="https://img.icons8.com/color/30/000000/redux.png" alt='redux'/>Redux</li>
        <li className='aws'><i class="fa-brands fa-aws aws-icon"></i>Amazon Web Services</li>
        <li className='python'><i class="fa-brands fa-python python-icon"></i>Python/Flask</li>
        <li className='psql'><img src="https://img.icons8.com/color/30/000000/postgreesql.png" alt='psql'/>PostgreSQL</li>
    </div>
  )
}

export default SideBar
