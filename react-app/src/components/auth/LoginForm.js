import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { demoLogin, login } from '../../store/session';

import "./authStyles/LoginForm.css"
import SignUpFormModal from './SignUpForm';
const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }
  const handleDemoLogin = () => {
    dispatch(demoLogin())
  }

  return (
    <div>
      <div className="fb-header-div"><img className='fb-header-img' src="https://i.imgur.com/HwGVt4u.png" alt="" /></div>
      <form className='login-form' onSubmit={onLogin}>
        <div className='email-div'>
          {/* <label htmlFor='email'>Email</label> */}
          <input
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
            />
        </div>
        <div>
          {/* <label htmlFor='password'>Password</label> */}
          <input
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
            />
        </div>
          <button className='login-submit' type='submit'>Log In</button>
          {errors.length > 0 && (
                  <div>
                  {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                  ))}
                </div>
          )}
        <p className='or-text'>Or</p>
        <button onClick={handleDemoLogin} className='login-submit' type='button'>Demo Login</button>
        <SignUpFormModal />
      </form>
    </div>
  );
};

export default LoginForm;
