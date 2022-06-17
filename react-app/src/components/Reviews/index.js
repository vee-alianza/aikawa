import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { fetchCurrentProductData } from "../../store/session"
import { rateProduct } from "../../store/products";
import './index.css';


const ReviewForm = ({ product }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const reviews = useSelector(state => state.products.currentProduct?.Product);
    const currentUserRating = useSelector(state => state.session.currentProductRating);
    const [content, setContent] = useState("");
    const [errors, setErrors] = useState([]);
    const [userRating, setUserRating] = useState(0);

    useEffect(() => {
        if (!currentUserRating) {
            dispatch(fetchCurrentProductData(product.id));
        } else {
            setUserRating(Number(currentUserRating));
        }
    }, [dispatch, currentUserRating, product.id]);

    const newerReview = async (e) => {
        e.preventDefault();
        const review = {
            userId: sessionUser.id,
            productId: product.id,
            content
        };

        // let newestReview = await dispatch(postReview(review))
        //     .catch(async (res) => {
        //         const data = await res.json();
        //         if (data && data.errors) {
        //             setErrors(data.errors);
        //         }
        //     });

        // setContent("");

        // if (errors.length && newestReview) {
        //     history.push(`/products/view/${product.id}`)
        // };
    };

    const handleRating = (userRating) => {
        dispatch(rateProduct(product.id, userRating));
    };

    // const handleLike = (reviewId) => {
    //     if (currentUserReviewLikes && currentUserReviewLikes.includes(reviewId)) {

    //         return (
    //             <button
    //                 onClick={() => dispatch(unlikeReview(reviewId))}
    //             >
    //                 Unlike
    //             </button>
    //         )
    //     }

    //     return (
    //         <button
    //             onClick={() => dispatch(likeReview(reviewId))}
    //         >
    //             Like
    //         </button>
    //     )
    // };

    return (
        <>
            <div className='review__container'>
                <h4>REVIEW BOX</h4>
                <div className='review__box'>
                    <div className='star__ratings'>
                        {/* {product.userId !== sessionUser.id && currentUserRating &&
                            <ReactStars
                                size={36}
                                value={userRating}
                                onChange={handleRating}
                            />} */}

                    </div>
                    <div className='reviews__list'>
                        <div className='review__inner__container'>
                            <img src='https://user-images.githubusercontent.com/92604480/173640320-852d46c1-2251-4057-950e-ce4e22ba39e5.png' alt='profile' />
                        </div>
                        <p>Username</p>
                        <div className='review__align__right'>
                        </div>
                        <div className='review__align__right'>
                            <i className='fa-solid fa-pencil'></i>
                            <i className='fa-solid fa-trash-can'></i>
                            {/* <p className='date'>{getDate(review.create_date)}</p> */}
                            {/* <div hidden ={currentUser.id !== review?.user_id} className='review__edit-btn'*/}
                            <p className='date'>Date</p>
                        </div>
                        <div className='review__content'>
                            <p>Review content Review content Review content Review content Review content Review content</p>
                        </div>
                        <div>
                            {/* {sessionUser.id === ReviewForm.userId && (
                                <button className='review__delete-btn' onClick={(e) => handleDelete(e, review.id)}
                                >
                                    Delete
                                </button>
                            )} */}
                            <button className='review__delete-btn'>Delete</button>
                            <button className='review__edit-btn'>Edit</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReviewForm;
