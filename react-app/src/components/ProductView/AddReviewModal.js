import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillRobot, AiOutlineRobot } from 'react-icons/ai';
import Rating from "react-rating";
import { Modal } from "../../context/Modal";
import { addUserReview } from "../../store/reviews";

const errorClassname = {
  title: 'hide',
  content: 'hide'
};

const AddReviewModal = ({ productId, setReviews }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const hasUserReview = useSelector(state => state.products.hasUserReview);
  const [showModal, setShowModal] = useState(false);
  const [isReviewed, setIsReviewed] = useState(true);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(1);
  const [error, setErrors] = useState(errorClassname);

  useEffect(() => {
    if (hasUserReview !== null) {
      setIsReviewed(hasUserReview);
    }
  }, [hasUserReview]);

  const handleSubmit = async () => {
    const data = await dispatch(addUserReview({ productId, title, content, rating }));
    if (data.review) {
      setReviews((prev) => {
        return [data.review, ...prev];
      });
      setShowModal(false);
      setTitle('');
      setContent('');
      setRating(1);
      setIsReviewed(true);
    } else if (data.errors) {
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
      {user && !isReviewed &&
        <div>
          <button
            onClick={() => setShowModal(true)}
          >
            Add review
          </button>
          {showModal &&
            <Modal onClose={() => setShowModal(false)}>
              <div className='add-review-form__container'>
                <div className='add-review-title__container'>
                  <div>
                    Title:
                    <span className={`add-review__errors ${error.title}`}>Title required!</span>
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
                    <span className={`add-review__errors ${error.content}`}>Review required!</span>
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
                  emptySymbol={<AiOutlineRobot />}
                  fullSymbol={<AiFillRobot />}
                  onChange={(value) => setRating(value)}
                />
                <div className='add-review-buttons__container'>
                  <button
                    onClick={handleSubmit}
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

export default AddReviewModal;
