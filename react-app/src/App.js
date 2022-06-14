import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import SplashPage from './components/SplashPage';
import Homepage from './components/Homepage';
import ProductsPage from './components/ProductsPage';
import ProductView from './components/ProductView';
import ShoppingCart from './components/ShoppingCart';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);



  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact={true} >
          <SplashPage />
        </Route>
        <Route path='/login' exact={true}>
          {/* <NavBar /> */}
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/home' exact={true} loaded={loaded}>
          <Homepage />
        </ProtectedRoute>
        <ProtectedRoute path='/users' exact={true} loaded={loaded}>
          <UsersList />
        </ProtectedRoute>

        <ProtectedRoute path='/users/:userId' exact={true} loaded={loaded}>
          <User />
        </ProtectedRoute>

        <Route path='/products' exact={true} loaded={loaded}>
          <ProductsPage />
        </Route>
        <Route path='/products/:productId' exact={true}>
          <ProductView />
        </Route>
        <Route path='/shoppingcart' exact={true}>
          <ShoppingCart />
        </Route>
        <Route path='/ordersummary' exact={true}>
          <h1>ORDER SUMMARY PAGE</h1>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
