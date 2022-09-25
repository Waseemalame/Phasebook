import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm/SignUpForm'
import ProtectedRoute from './components/auth/ProtectedRoute';
import ProfilePage from './components/ProfilePage';
import { authenticate } from './store/session';
import SideBar from './components/LeftSideBar';
import Navigation from './components/Navigation';
import { useMessageContext } from './components/context/messageContext';
import Posts from './components/Posts';
import Contacts from './components/Contacts/Contacts';
import MsgPopUp from './components/Message/MsgPopUp';

import "./index.css"

function App() {
  const [loaded, setLoaded] = useState(false);
  const [searchList, setSearchList] = useState(false);
  const user = useSelector(state => state.session.user)
  const { showMsgPopup, setShowMsgPopup, setMsgUser } = useMessageContext()
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      {/* <NavBar /> */}
      {user && <Navigation searchList={searchList} setSearchList={setSearchList} />}
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          {/* <UsersList/> */}
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <ProfilePage />
        </ProtectedRoute>
        <ProtectedRoute path='/users/friends/:userId/' exact={true} >
          <Contacts />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <div className='home-display'>
            <SideBar />
            <Posts />
            <Contacts />
          </div>
        </ProtectedRoute>
      </Switch>
      {user && showMsgPopup && <MsgPopUp />}
    </BrowserRouter>
  );
}

export default App;
