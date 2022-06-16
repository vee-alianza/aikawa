
import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { logout } from '../../store/session';
import LogoutButton from '../auth/LogoutButton';

const NavBar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const onLogout = async (e) => {
    history.push('/');
    await dispatch(logout());
  }
  return (
    <nav>
      <div className='navbar__container'>
        <div className='navbar__logo'>
          <img src='' alt='logo' />

        </div>

        <div className='navbar__container'>
          <div className='navbar__icons'>
            <span>
              <i className="fa-solid fa-rocket"></i>'
            </span>
            <NavLink to='/' exact={true} activeClassName='active'>
              Home
            </NavLink>
          </div>
          <li>
            <NavLink to='/login' exact={true} activeClassName='active'>
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to='/sign-up' exact={true} activeClassName='active'>
              Sign Up
            </NavLink>
          </li>
          <li>
            <NavLink to='/users' exact={true} activeClassName='active'>
              Users
            </NavLink>
          </li>
          <li>
            <LogoutButton />
          </li>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
