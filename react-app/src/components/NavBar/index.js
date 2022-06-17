
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { logout } from '../../store/session';
import { FaShoppingCart, FaRocket, FaMoon } from "react-icons/fa";
import LogoutButton from '../auth/LogoutButton';
import './index.css'


const NavBar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const onLogout = async (e) => {
    history.push('/');
    await dispatch(logout());
  }
  // const sessionUser = useSelector((state) => state.session.user);

  return (
    <nav className='navbar__container'>
      <div className='navbar__logo'>
        <img src='https://user-images.githubusercontent.com/92604480/174006897-c3e8cf74-4c4a-4ed9-8080-039238d4bf18.png' alt='' />
        <p>AIKAWA</p>
      </div>
      <div className='navbar__right'>
        <div className='navbar__icons'>
          <span>
            <FaMoon size={26} />
          </span>
          <NavLink to='/products' exact={true}
            activeClassName='active' id='link'>
            Products
          </NavLink>
          <span>
            <FaShoppingCart size={26} />

            Add to Cart
          </span>
          <div className='navbar__icons navbar-logout__btn' onClick={onLogout}>
            <span>
              <FaRocket size={26} />
              <LogoutButton />
            </span>
          </div>
        </div>
      </div>
      {/* <div className='navbar__icons'>
        <span>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </span>
      </div>
      <div className='navbar__icons'>
        <NavLink to='/sign-up' exact={true} activeClassName='active'>
          Sign Up
        </NavLink>
      </div> */}

      {/* <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink> */}
    </nav >
  );
}

export default NavBar;
