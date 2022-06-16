import { useEffect, useState } from 'react';
import { QuantityPicker } from 'react-qty-picker';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getOrderDetailsThunk, updateOrderItemQty, removeOrderItem } from '../../store/orders';
import './index.css';

let delayedUpdate = {};

const OrderSummary = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const order = useSelector(state => state.orders.currentOrder);
  const [orderItems, setOrderItems] = useState([]);
  const [orderTotal, setOrderTotal] = useState(0);

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
              <div>{`$${item.totalPrice.toFixed(2)}`}</div>
            </div>
          ))}
          <h2>{`Total: $${orderTotal.toFixed(2)}`}</h2>
        </>
      }
    </div>
  );
};

export default OrderSummary;
