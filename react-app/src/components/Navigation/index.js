import React from 'react'
import './Navigation.css'
const Navigation = () => {
  return (
    <div className="nav-container">
      <ul className='nav-list'>
        <li>
          <div className='nav-left'>
            <img src="https://img.icons8.com/color/50/000000/facebook-new.png" alt=""/>
            <div className="search-bar">
              <img src="https://img.icons8.com/fluency-systems-filled/15/000000/search.png" alt=""/>
              <input className='search-input' type="search" placeholder='Search Facebook' />
            </div>
          </div>
        </li>
        <li>
          <div className="nav-middle">
            <img src="https://img.icons8.com/material-outlined/20/000000/home--v4.png" alt=""/>
            <img src="https://img.icons8.com/ios-glyphs/20/000000/github.png" alt=""/>
          </div>
        </li>
        <li>
          <div className="nav-right">
            <img src="https://img.icons8.com/small/20/000000/user-male-circle.png" alt=""/>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default Navigation
