import { useEffect, useState } from 'react';
import { QuantityPicker } from 'react-qty-picker';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getOrderDetailsThunk, updateOrderItemQty, removeOrderItem } from '../../store/orders';
import EditAddressModal from './EditAddressModal';
import './index.css';

let delayedUpdate = {};

const OrderSummary = () => {
  const { orderId } = useParams();
  const toUSD = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
  const dispatch = useDispatch();
  const history = useHistory();
  const order = useSelector(state => state.orders.currentOrder);
  const user = useSelector(state => state.session.user);
  const shippingDetails = useSelector(state => state.session.shippingDetails);
  const [orderItems, setOrderItems] = useState([]);
  const [orderTotal, setOrderTotal] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [country, setCountry] = useState('');

  useEffect(() => {
    if (!order) {
      dispatch(getOrderDetailsThunk(orderId));
    } else {
      let totalPrice = 0;

      for (let i = 0; i < order.ordered_items.length; i++) {
        totalPrice += order.ordered_items[i].totalPrice;
      }

      setOrderItems(order.ordered_items);
      setOrderTotal(totalPrice);
    }

    return () => delayedUpdate = {};
  }, [dispatch, order, orderId]);

  useEffect(() => {
    if (shippingDetails) {
      setFirstName(shippingDetails.firstName);
      setLastName(shippingDetails.lastName);
      setAddress(shippingDetails.address);
      setCity(shippingDetails.city);
      setState(shippingDetails.state);
      setZip(shippingDetails.zip);
      setCountry(shippingDetails.country);
    }
  }, [shippingDetails]);

  const handleQtyChange = (value, itemTitle, orderItemId) => {
    setOrderItems(prev => {
      return prev.map((item) => {
        if (item.title === itemTitle) {
          const itemCopy = { ...item };
          itemCopy.quantity = value;
          itemCopy.totalPrice = itemCopy.basePrice * value;
          total += itemCopy.totalPrice;
          return itemCopy;
        } else {
          total += item.totalPrice;
          return item;
        }
      });
    });

    let total = 0;

    for (let i = 0; i < orderItems.length; i++) {
      if (orderItems[i].title === itemTitle) {
        total += orderItems[i].basePrice * value;
      } else {
        total += orderItems[i].basePrice * orderItems[i].quantity;
      }
    }

    setOrderTotal(total);
    clearTimeout(delayedUpdate[orderItemId]);
    delayedUpdate[orderItemId] = setTimeout(() => {
      dispatch(updateOrderItemQty(orderItemId, value));
    }, 1000);
  };

  const handleRemoveOrderItem = async (orderItemId) => {
    const success = await dispatch(removeOrderItem(orderItemId));
    if (success) {
      if (orderItems.length === 1) return history.push('/products');

      let total = 0;
      setOrderItems(prev => prev.filter((item) => item.id !== orderItemId));
      for (let i = 0; i < orderItems.length; i++) {
        if (orderItems[i].id !== orderItemId) {
          total += orderItems[i].totalPrice;
        }
      }
      setOrderTotal(total);
    }
  };

  if (!user) return history.push('/products');

  return (
    <div className='order-details__container'>
      <h1>Order details:</h1>
      {order &&
        <>
          <h2>{`Status: ${order.status}`}</h2>
          <h3>Items:</h3>
          {orderItems.map((item) => (
            <div key={item.id} className='order-item__container'>
              <img src={item.image} alt={item.title} />
              <div>{item.title}</div>
              <div>{item.description}</div>
              <QuantityPicker
                min={1}
                max={99}
                value={item.quantity}
                onChange={(value) => handleQtyChange(value, item.title, item.id)}
              />
              <button
                onClick={() => handleRemoveOrderItem(item.id)}
              >
                Remove item
              </button>
              <div>{`${toUSD.format(item.totalPrice)}`}</div>
            </div>
          ))}
          <h2>{`Total: ${toUSD.format(orderTotal)}`}</h2>
          <div className='order-details__shipping-info'>
            <h3>Ship to:</h3>
            <div>{`${firstName} ${lastName}`}</div>
            <div>{`${address}, ${city}`}</div>
            <div>{`${state} ${zip}`}</div>
            <div>{country}</div>
            <div>
              <EditAddressModal
                firstName={firstName}
                lastName={lastName}
                address={address}
                city={city}
                state={state}
                zip={zip}
                country={country}
                setFirstName={setFirstName}
                setLastName={setLastName}
                setAddress={setAddress}
                setCity={setCity}
                setState={setState}
                setZip={setZip}
                setCountry={setCountry}
              />
            </div>
          </div>
        </>
      }
    </div>
  );
};

export default OrderSummary;
