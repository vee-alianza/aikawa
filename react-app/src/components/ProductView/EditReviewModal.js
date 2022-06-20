import { useState } from 'react';
import { HiPencilAlt } from 'react-icons/hi';
import { IoPlanetSharp, IoPlanetOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import Rating from 'react-rating';
import { Modal } from '../../context/Modal';
import { updateUserReview } from '../../store/reviews';

const errorClassname = {
  title: 'hide',
  content: 'hide'
};

const EditReviewModal = ({ review, setReviews }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState(review.title);
  const [content, setContent] = useState(review.content);
  const [rating, setRating] = useState(review.rating);
  const [error, setErrors] = useState(errorClassname);

  const handleEdit = async (reviewId) => {
    const data = await dispatch(updateUserReview({
      id: reviewId,
      title,
      content,
      rating
    }));

    if (!data.errors) {
      setReviews((prev) => {
        return prev.map((review) => {
          if (review.id === reviewId) {
            const reviewCopy = { ...review };
            reviewCopy.title = title;
            reviewCopy.content = content;
            reviewCopy.rating = rating;
            return reviewCopy;
          } else {
            return review;
          }
        });
      });
      setShowModal(false);
    } else {
      data.errors.forEach((error) => {
        if (error.includes('Title')) {
          setErrors((prev) => ({ ...prev, title: '' }));
        }
        if (error.includes('Content')) {
          setErrors((prev) => ({ ...prev, content: '' }));
        }
      });
    }
  };

  return (
    <>
      {user && user.id === review.user.id &&
        <div>
          <button
            className='edit-review__edit-btn'
            onClick={() => setShowModal(true)}
          >
            <HiPencilAlt />
          </button>
          {showModal &&
            <Modal onClose={() => setShowModal(false)}>
              <div className='edit-review-form__container'>
                <div className='edit-review-title__container'>
                  <div>
                    Title:
                    <span className={`edit-review__errors ${error.title}`}>Title required!</span>
                  </div>
                  <input
                    value={title}
                    onChange={(e) => {
                      if (!error.title) {
                        setErrors((prev) => ({ ...prev, title: 'hide' }));
                      }
                      setTitle(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <div>
                    Review:
                    <span className={`edit-review__errors ${error.content}`}>Review required!</span>
                  </div>
                  <textarea
                    value={content}
                    onChange={(e) => {
                      if (!error.content) {
                        setErrors((prev) => ({ ...prev, content: 'hide' }));
                      }
                      setContent(e.target.value);
                    }}
                  />
                </div>
                <Rating
                  initialRating={rating}
                  emptySymbol={<IoPlanetOutline />}
                  fullSymbol={<IoPlanetSharp />}
                  onChange={(value) => setRating(value)}
                />
                <div className='edit-review-buttons__container'>
                  <button
                    onClick={() => handleEdit(review.id)}
                  >
                    Submit
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Modal>
          }
        </div>
      }
    </>
  );
};

export default EditReviewModal;
