import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { QuantityPicker } from 'react-qty-picker';
import {
  getUserCartThunk,
  removeCartProductThunk,
  checkoutCart,
  updateCartItemQty
} from '../../store/products';
import './index.css';


let delayedUpdate = {};

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userCart = useSelector(state => state.products.userCart);
  const [quantity, setQuantity] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    if (!userCart) {
      dispatch(getUserCartThunk());
    } else {
      const itemMap = {};
      let totalPrice = 0;

      for (let i = 0; i < userCart.length; i++) {
        itemMap[userCart[i].title] = userCart[i].quantity;
        totalPrice += userCart[i].price;
      }

      setQuantity(itemMap);
      setCartItems(userCart);
      setCartTotal(totalPrice);
    }

    return () => delayedUpdate = {};
  }, [dispatch, userCart]);

  const handleQtyChange = (value, productTitle, productId) => {
    setQuantity(prev => {
      const stateCopy = { ...prev };
      stateCopy[productTitle] = value;
      return stateCopy;
    });
    setCartItems(prev => {
      return prev.map((item) => {
        if (item.title === productTitle) {
          const itemCopy = { ...item };
          itemCopy.price = itemCopy.basePrice * value;
          itemCopy.quantity = value;
          return itemCopy;
        } else {
          return item;
        }
      });
    });

    let totalPrice = 0;

    for (const key in quantity) {
      const item = cartItems.find((item) => item.title === key);

      if (item.title === productTitle) {
        totalPrice += item.basePrice * value;
      } else {
        totalPrice += item.basePrice * quantity[key];
      }
    }

    setCartTotal(totalPrice);
    clearTimeout(delayedUpdate[productId]);
    delayedUpdate[productId] = setTimeout(() => {
      dispatch(updateCartItemQty(productId, value));
    }, 1000);
  };

  const removeItemInCart = async (productId) => {
    const success = await dispatch(removeCartProductThunk(productId));
    if (success) {
      setCartItems(prev => {
        return prev.filter((item) => item.productId !== productId);
      });
    }
  };

  const placeOrder = async () => {
    const orderedItems = [];

    for (let i = 0; i < cartItems.length; i++) {
      orderedItems.push({
        productId: cartItems[i].productId,
        quantity: cartItems[i].quantity
      });
    }

    const { success, orderId, status } = await dispatch(checkoutCart(orderedItems));

    if (success) {
      history.push(`/ordersummary/${orderId}`);
    } else if (status === 405) {
      // do logic to display modal for user to log in
      // temporary modal
      window.alert('please log in');
    }
  };

  return (
    <div className='shopping-cart__container'>
      {userCart &&
        <>
          <div className='cart-items__container'>
            <h1>Shopping Cart</h1>
            {cartItems.map((item, idx) => (
              <div
                key={`${item.id}+${idx}`}
                className='full-item__container'
              >
                <div className='item__container'>
                  <img
                    src={item.image}
                    alt={item.title}
                  />
                  <div className='item-details__container'>
                    <h3>
                      {item.title}
                    </h3>
                    <div>
                      {item.description}
                    </div>
                  </div>
                  <div className='item-price__div'>{`$${item.price.toFixed(2)}`}</div>
                </div>
                <div className='item-quantity__container'>
                  <QuantityPicker
                    min={1}
                    max={99}
                    value={quantity[item.title]}
                    onChange={(value) => handleQtyChange(value, item.title, item.productId)}
                  />
                  <button
                    onClick={() => removeItemInCart(item.productId)}
                  >
                    Remove item
                  </button>
                </div>
              </div>
            ))}
            {cartItems.length === 0 &&
              <h1>YOUR CART IS EMPTY</h1>
            }
          </div>
          <div className='checkout-details__container'>
            <h2>Order summary:</h2>
            <div className='order-total__container'>
              <div>Total:</div>
              <h2>{`$${cartTotal.toFixed(2)}`}</h2>
            </div>
            {cartItems.length > 0 &&
              <button
                onClick={placeOrder}
              >
                Proceed to checkout
              </button>
            }
          </div>
        </>
      }
    </div>
  );
};

export default ShoppingCart;
