import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOrderDetailsThunk } from '../../store/orders';
import './index.css';

const OrderSummary = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const order = useSelector(state => state.orders.currentOrder);

  useEffect(() => {
    if (!order) {
      dispatch(getOrderDetailsThunk(orderId));
    }
  }, [dispatch, order, orderId]);

  return (
    <div className='order-details__container'>
      <h1>Order details:</h1>
      {order &&
        <>
          <h2>{`Status: ${order.status}`}</h2>
          <h3>Items:</h3>
          {order.ordered_items.map((item) => (
            <div key={item.id} className='order-item__container'>
              <img src={item.image} alt={item.title} />
              <div>{item.title}</div>
              <div>{item.description}</div>
              <div>{`Quantity: ${item.quantity}`}</div>
              <div>{`$${item.totalPrice.toFixed(2)}`}</div>
            </div>
          ))}
        </>
      }
      <h2>{`Total: $${order.total_cost.toFixed(2)}`}</h2>
    </div>
  );
};

export default OrderSummary;
