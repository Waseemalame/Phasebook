import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm/SignUpForm'
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import ProfilePage from './components/ProfilePage';
import { authenticate } from './store/session';
import SideBar from './components/Feed/SideBar';
import LeftSideBar from './components/LeftSideBar';
import Navigation from './components/Navigation';
import Posts from './components/Feed/Posts';
import "./index.css"

function App() {
  const [loaded, setLoaded] = useState(false);
  const [searchList, setSearchList] = useState(false);
  const user = useSelector(state => state.session.user)

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
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <ProfilePage />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          {/* <div className='home-display'> */}
            <SideBar />
            <Posts />
            <LeftSideBar />
          {/* </div> */}
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
