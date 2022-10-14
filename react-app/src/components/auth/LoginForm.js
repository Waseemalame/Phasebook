import React, { useState } from 'react';
import { useEffect } from 'react';
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

  useEffect(() => {
    const signupBtn = document.querySelector(".signup-div")
    if(!errors.length > 0){
      signupBtn.style.marginTop = '50px'
    } else {
      signupBtn.style.marginTop = '20px'
    }
  }, [errors]);

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
    <div className='login-page-container'>
      <div className="login-page-top">
        <div className="left-login-page">
          <div className="fb-header-div"><img className='fb-header-img' src="https://i.imgur.com/HwGVt4u.png" alt="" /></div>
          <p className="sub-header-text">Connect with friends and the world around you on Phasedbook</p>
        </div>
        <form className='login-form' onSubmit={onLogin}>
        {errors.length > 0 && (
                    <div className='login-errors'>
                    {errors.map((error, ind) => (
                      <div key={ind}>{error}</div>
                    ))}
                  </div>
            )}
          <div className='email-div'>
            <input
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
              />
          </div>
          <div>
            <input
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
              />
          </div>
            <button className='login-submit' type='submit'>Log In</button>
          <p className='or-text'>Or login as a guest!</p>
          <button onClick={handleDemoLogin} className='login-submit' type='button'>Guest Login</button>
          <SignUpFormModal />
        </form>
      </div>
      <div className="login-footer">
        <div className="login-footer-top"><div className='about-text'>Phasedbook allows users to access a world-wide social network for creating posts and comments. By logging in or creating an account, you acknowledge that this is not Facebook and anything you post is at your discretion. Enjoy!</div>
          </div>
        <div className="login-footer-bottom">
          <div className='login-footer-bottom'>
            <div className='footer-technologies'>
              <div className='tech-container'>
                <i class="fa-brands fa-react"></i><p className="tech">React</p>
              </div>
              <div className='tech-container'>
                <i class="fa-brands fa-js"></i><p className="tech">JavaScript</p>
              </div>
              <div className='tech-container'>
                <i class="fa-brands fa-python"></i><p className="tech">Python/Flask</p>
              </div>
              <div className='tech-container'>
                <i class="fa-brands fa-node"></i><p className="tech">NodeJS</p>
              </div>
              <div className='tech-container'>
                <i class="fa-brands fa-html5"></i><p className="tech">HTML5</p>
              </div>
              <div className="tech-container">
                <i class="fa-brands fa-css3"></i><p className="tech">CSS3</p>
              </div>
              {/* <div className="tech-container"></div>
              <div className="tech-container"></div>
              <div className="tech-container"></div>
              <div className="tech-container"></div> */}
              {/* <i class="fa-brands fa-css3"></i><p className="tech">CSS3</p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
