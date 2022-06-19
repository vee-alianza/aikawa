import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addToCart } from '../../store/products';
import './index.css';

const AddToCart = ({ product }) => {
    const toUSD = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
    const dispatch = useDispatch();
    const [addMsg, setAddMsg] = useState('Add to cart');

    const handleAdd = async () => {
        const success = await dispatch(addToCart(product.id));

        if (success) {
            setAddMsg('Added to cart!');
            setTimeout(() => {
                setAddMsg('Add to cart');
            }, 2000);
        } else {
            setAddMsg('Error adding to cart...');
            setTimeout(() => {
                setAddMsg('Add to cart');
            }, 2000);
        }
    };

    return (
        <div className='add-to-cart__container'>
            <div className='add-to-cart__header'>
                <h2>{product.title}</h2>
                <h2>{toUSD.format(product.price)}</h2>
            </div>
            <div>{product.description}</div>
            <button
                className='add-to-cart__button'
                onClick={handleAdd}
            >
                {addMsg}
            </button>
        </div>
    );
};

export default AddToCart;
