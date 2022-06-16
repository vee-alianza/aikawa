import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
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

  return (
    <>
      <div className='login__container'>
        <h2>Login</h2>
        <form onSubmit={onLogin} className='auth__form login'>
          <div className='login__details'>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
            <label htmlFor='email' className='input__label'>Email</label>
            <input
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div className='login__details'>
            <label htmlFor='password' className='input__label'>Password</label>
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
          </div>

        </form>
      </div >
    </>
  );
};

export default LoginForm;
