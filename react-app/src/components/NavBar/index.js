import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { logout } from '../../store/session';
import { BsCart2, BsFillPersonFill } from 'react-icons/bs';
import './index.css'

const NavBar = () => {
  const currentLocation = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const dropdownContainer = useRef();
  const user = useSelector(state => state.session.user);
  const [activeClass, setActiveClass] = useState({ home: 'active', products: '' });
  const [dropdown, setDropdown] = useState(false);
  const [dispNavbar, setDispNavbar] = useState(true);

  useEffect(() => {
    if (currentLocation.pathname === '/') {
      setDispNavbar(false);
    } else {
      if (currentLocation.pathname.includes('home')) {
        setActiveClass({ home: 'active', products: '' });
      } else if (currentLocation.pathname.includes('products')) {
        const productId = currentLocation.pathname.split('/');
        if (!productId[2]) {
          setActiveClass({ home: '', products: 'active' });
        } else {
          setActiveClass({ home: '', products: '' });
        }
      } else {
        setActiveClass({ home: '', products: '' });
      }
      setDispNavbar(true);
    }

  }, [currentLocation.pathname]);

  const onLogout = async (e) => {
    history.push('/');
    await dispatch(logout());
    setDropdown(false);
  };

  const handleNavigate = (e) => {
    const containerId = e.currentTarget.id;
    if (containerId.includes('home') && !currentLocation.pathname.includes('home')) {
      history.push('/home');
    } else if (containerId.includes('products')) {
      const productId = currentLocation.pathname.split('/');
      if (!currentLocation.pathname.includes('products') || parseInt(productId[2], 10)) {
        history.push('/products');
      }
    } else if (containerId.includes('shopping-cart') && !currentLocation.pathname.includes('shoppingcart')) {
      history.push('/shoppingcart');
    }
  };

  return (
    <nav className='navbar__container'>
      <div className='navbar__logo'>
        <img src='https://user-images.githubusercontent.com/92604480/174006897-c3e8cf74-4c4a-4ed9-8080-039238d4bf18.png' alt='' />
        <p>AIKAWA</p>
      </div>
      {dispNavbar &&
        <ul className='navbar__navigation'>
          <li>
            <button
              id='navbar-home'
              className={activeClass.home}
              onClick={handleNavigate}
            >
              Home
            </button>
          </li>
          <li>
            <button
              id='navbar-products'
              className={activeClass.products}
              onClick={handleNavigate}
            >
              Products
            </button>
          </li>
          <li style={{ float: 'right' }}>
            <button
              ref={dropdownContainer}
              onFocus={() => setDropdown(true)}
              onBlur={() => setDropdown(false)}
            >
              <BsFillPersonFill />
              {dropdown &&
                <div className='profile-dropdown__container'>
                  <div
                    onClick={() => {
                      history.push('/shoppingcart');
                      dropdownContainer.current.blur();
                    }}
                  >
                    Cart
                  </div>
                  {user &&
                    <div onClick={onLogout}>
                      Log out
                    </div>
                  }
                </div>
              }
            </button>
          </li>
          <li style={{ float: 'right' }}>
            <button
              id='navbar-shopping-cart'
              onClick={handleNavigate}
            >
              <BsCart2 />
            </button>
          </li>
        </ul>
      }
    </nav >
  );
}

export default NavBar;
