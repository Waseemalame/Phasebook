import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { useMessageContext } from '../context/messageContext';
import "./authStyles/LogoutButton.css"

const LogoutButton = () => {
  const { showMsgPopup, setShowMsgPopup, msgUser, setMsgUser } = useMessageContext()
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
    setShowMsgPopup(false)
    setMsgUser(null)
  };

  return <button className='logout-btn' onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
