import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getProductsThunk } from '../../store/products';
import './index.css'

const ProductsPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const products = useSelector(state => state.products.allProducts);
    const [applyHideClass, setApplyHideClass] = useState('');

    useEffect(() => {
        if (!products) {
            dispatch(getProductsThunk(0));
        }
    }, [dispatch, products]);

    const navigateToProduct = (productId) => {
        history.push(`/products/${productId}`);
    };

    const loadMore = async () => {
        const productsQty = await dispatch(getProductsThunk(products[products.length - 1].id));

        if (!productsQty) {
            setApplyHideClass('hide');
        }
    };

    return (
        <>
            <h1>Product Page</h1>
            <div className='products__container'>
                <div className='product-details__container'>
                    {products && products.map((product) => (
                        <div
                            className='product__image__container'
                            key={product.id}
                            onClick={() => navigateToProduct(product.id)}
                        >
                            <img
                                className='product__image'
                                src={product.images[0].url}
                                alt={product.title} />
                            <div className='product__image__overlay'>
                                <img
                                    className='product__image'
                                    src={product.images[1] ? product.images[1].url : product.images[0].url}
                                    alt={product.title} />
                            </div>
                            <h3>{product.title}</h3>
                            <p>{product.price}</p>
                        </div>
                    ))}
                </div>
                <button
                    className={`load-more__button ${applyHideClass}`}
                    onClick={loadMore}
                >
                    Load More
                </button>
            </div>
        </>
    );
};

export default ProductsPage;
