import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsThunk } from '../../store/products';
import './index.css'

const ProductsPage = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.allProducts);

    const productArray = new Array(30).fill({
        id: 2,
        title: 'title',
        description: 'description',
        price: 123.45,
        images: 'https://1fm5ponuc3s3s8eo12ml9f5x-wpengine.netdna-ssl.com/wp-content/uploads/2018/04/web-EllipseBench_angle-1600x1133.jpg',
        quantity: 5
    });
    console.log(productArray)
    useEffect(() => {
        if (!products) {
            dispatch(getProductsThunk(0));
        }
    }, [products]);


    return (
        <>
            <h1>Product Page</h1>
            <div className='products__container'>
                <div className='product-details__container'>
                    {/* <p>
                        top seller
                    </p> */}
                    {products && products.map((product) => (
                        < div className='product__image__container'>
                            <img className='product__image' src={product.images[0].url}></img>
                            <div className='product__image__overlay'>
                                <img className='product__image' src={product.images[1] ? product.images[1].url : product.images[0].url}></img>
                            </div>
                            <h3>{product.title}</h3>
                            <p>{product.price}</p>
                        </div>
                    ))}
                </div>
                {/* <button
                    type='submit'
                    className='addtobag__btn'
                > Add to bag
                </button> */}
            </div>
        </>
    );
};

export default ProductsPage;
