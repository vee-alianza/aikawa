import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillRobot, AiOutlineRobot } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import Rating from 'react-rating';
import { getUserProductReviewThunk } from '../../store/reviews';
import { getProductDetailsThunk } from '../../store/products';
import AddToCart from '../ProductsPage/AddToCart';
import EditReviewModal from './EditReviewModal';
import DeleteReviewModal from './DeleteReviewModal';
import './index.css';
import AddReviewModal from './AddReviewModal';
import NavBar from '../NavBar';

const ProductView = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(state => state.products.currentProduct);
  const [displayImg, setDisplayImg] = useState('');
  const [prevImg, setPrevImg] = useState('');
  const [previewImgClicked, setPreviewImgClicked] = useState(false);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    dispatch(getProductDetailsThunk(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    if (product) {
      setDisplayImg(product.images[0].url);
      setReviews(product.reviews);
      dispatch(getUserProductReviewThunk(product.id));
    }
  }, [dispatch, product]);

  return (
    <>
      <NavBar />
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
              <AddReviewModal
                productId={product.id}
                setReviews={setReviews}
              />
              <div className='single-product__reviews'>
                {reviews.map((review) => (
                  <div key={review.id} className='user-review__container'>
                    <div className='user-review__header'>
                      <Rating
                        initialRating={review.rating}
                        emptySymbol={<AiOutlineRobot />}
                        fullSymbol={<AiFillRobot />}
                        readonly
                      />
                      <div>{review.user.username}</div>
                      <EditReviewModal
                        review={review}
                        setReviews={setReviews}
                      />
                      <DeleteReviewModal
                        review={review}
                        setReviews={setReviews}
                      />
                    </div>
                    <h3>{review.title}</h3>
                    <div>{review.content}</div>
                  </div>
                ))}
              </div>
            </div>
            <AddToCart product={product} />
          </>
        }
      </div>
    </>
  );
};

export default ProductView;
