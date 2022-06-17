import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, Link } from 'react-router-dom';
import { signUp } from '../../store/session';
import './auth.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
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
    return <Redirect to='/home' />;
  }

  return (
    <>
      <div className='sign-up__wrapper'>
        <div className='sign-up__container'>
          <h2>Sign Up</h2>
          <form onSubmit={onSignUp} className='auth__form sign-up'>
            <div className='sign-up__details'>
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}

              {/* <label>User Name</label> */}
              <input
                type='text'
                name='username'
                placeholder='Username'
                onChange={updateUsername}
                value={username}
              ></input>
            </div>
            <div className='sign-up__details'>
              {/* <label>Email</label> */}
              <input
                type='text'
                name='email'
                placeholder='Email'
                onChange={updateEmail}
                value={email}
              ></input>
            </div>
            <div className='sign-up__details'>
              {/* <label>Password</label> */}
              <input
                type='password'
                name='password'
                placeholder='Password'
                onChange={updatePassword}
                value={password}
              ></input>
            </div>
            <div className='sign-up__details'>
              {/* <label>Repeat Password</label> */}
              <input
                type='password'
                name='repeat_password'
                placeholder='Confirm Password'
                onChange={updateRepeatPassword}
                value={repeatPassword}
                required={true}
              ></input>

              <button type='submit' id='sign-up__btn'>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Sign Up</button>
            </div>
            <Link to="/login" className="auth__link">
              Already have an account? <span>Log In!</span>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
