import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
// import ErrorMessage from "../ErrorMessage";
import './auth.css'

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
      const errors = {};
      if (Array.isArray(data)) {
        data.forEach((error) => {
          const label = error.split(':')[0].slice(0, -1);
          const message = error.split(':')[1].slice(1);
          errors[label] = message;
        });
      } else {
        errors.overall = data;
      }
      setErrors(data);
    }
  };

  const DemoUser = async (e) => {
    e.preventDefault();
    const data = await dispatch(login('demo@aa.io', 'password'));
    if (data) {
      const errors = {};
      if (Array.isArray(data)) {
        data.forEach((error) => {
          const label = error.split(':')[0].slice(0, -1);
          const message = error.split(':')[1].slice(1);
          errors[label] = message;
        });
      }
      setErrors(errors);
    }
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/home' />;
  }

  return (
    <>
      <div className='login__wrapper'>
        <div className='login__container'>
          <h2>Login</h2>
          <form onSubmit={onLogin} className='auth__form login'>
            <div className='login__details'>
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
              {/* <label htmlFor='email' className='email__label'>Email</label>> */}
              {/* <h4>Email</h4> */}
              <input
                className='email__input'
                name='email'
                type='text'
                placeholder='Email'
                value={email}
                onChange={updateEmail}
              />
            </div>
            <div className='login__details'>
              {/* <label htmlFor='password' className='password__label'>Password</label> */}
              <input
                name='password'
                type='password'
                placeholder='Password'
                value={password}
                onChange={updatePassword}
              />
              <button type='submit'
                id='login__btn'
              >
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Login
              </button>
              <button type='submit'
                id='demo__btn' onClick={DemoUser}
              >
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Demo User
              </button>
            </div>
          </form>
        </div >
      </div>
    </>
  );
};

export default LoginForm;
