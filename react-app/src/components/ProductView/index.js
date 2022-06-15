import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductDetailsThunk } from '../../store/products';
import AddToCart from '../ProductsPage/AddToCart';
import './index.css';

const ProductView = () => {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const product = useSelector(state => state.products.currentProduct);
    const [displayImg, setDisplayImg] = useState('');
    const [prevImg, setPrevImg] = useState('');
    const [previewImgClicked, setPreviewImgClicked] = useState(false);

    useEffect(() => {
        dispatch(getProductDetailsThunk(productId));
    }, [dispatch, productId]);

    useEffect(() => {
        if (product) {
            setDisplayImg(product.images[0].url);
        }
    }, [product]);

    return (
        <div className='single-product-view__container'>
            {product &&
                <>
                    <div className='single-product-details__container'>
                        <img
                            className='single-product__image'
                            alt={product.title}
                            src={displayImg}
                        />
                        <div className='selector__container'>
                            {product.images.map((image) => (
                                <div
                                    className='image__selector'
                                    key={image.id}
                                    onClick={() => {
                                        setDisplayImg(image.url);
                                        setPreviewImgClicked(true);
                                    }}
                                    onMouseEnter={() => {
                                        setPrevImg(displayImg);
                                        setDisplayImg(image.url);
                                    }}
                                    onMouseLeave={() => {
                                        if (!previewImgClicked) {
                                            setPrevImg('');
                                            setDisplayImg(prevImg);
                                        } else {
                                            setPreviewImgClicked(false);
                                        }
                                    }}
                                />
                            ))}
                        </div>
                        <div className='single-product__description'>
                            {product.description}
                        </div>
                    </div>
                    <AddToCart product={product} />
                </>
            }
        </div>
    );
};

export default ProductView;
