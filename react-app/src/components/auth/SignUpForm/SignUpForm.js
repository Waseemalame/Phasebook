import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../../store/session';
import "../authStyles/SignUpForm.css"

const SignUpForm = ({ setShowSignupModal }) => {
  const [errors, setErrors] = useState([]);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if(submitAttempted){

      if(password === repeatPassword){
        if(password.length < 8){
          setErrors(['Password must be greater than 7 characters'])
        } else {
          setErrors([])
        }
      } else {

        setErrors(['Passwords must match'])
      }

    }
  }, [password, repeatPassword, submitAttempted])

  const onSignUp = async (e) => {
    e.preventDefault();
    e.stopPropagation();


    setSubmitAttempted(true)
    if (password === repeatPassword && !(password.length < 7)) {
      const data = await dispatch(signUp(username, email, password, firstname, lastname));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };
  const updateFirstname = (e) => {
    setFirstname(e.target.value);
  };
  const updateLastname = (e) => {
    setLastname(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  const cancelSignup = () => {
    setShowSignupModal(false)
  }

  return (
    <form className='signup-form' onSubmit={onSignUp}>
      <div className="signup-header">
        <h1>Sign Up</h1>
        <p>It's quick and easy.</p>
      </div>
      <div onClick={cancelSignup} className="cancel-signup">
        <img className='cancel-signup-icon' src="https://img.icons8.com/sf-regular-filled/24/000000/x.png" alt="cancel"/>

      </div>
      <div className='all-errors'>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>

      <div className="first-last-signup">

          <input
            type='text'
            name='firstname'
            placeholder='First name'
            onChange={updateFirstname}
            value={firstname}
          ></input>


          <input
            type='text'
            name='lastname'
            placeholder='Last name'
            onChange={updateLastname}
            value={lastname}
          ></input>

      </div>
        <input
          type='text'
          name='username'
          placeholder='Username'
          onChange={updateUsername}
          value={username}
        ></input>


        <input
          type='text'
          name='email'
          placeholder='Email'
          onChange={updateEmail}
          value={email}
        ></input>


        <input
          type='password'
          name='password'
          placeholder='New password'
          onChange={updatePassword}
          value={password}
        ></input>


        <input
          type='password'
          name='repeat_password'
          placeholder='Confirm password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>

      <button className='signup-form-btn' type='submit'>Sign Up</button>
    </form>
  );
};

export default SignUpForm;
