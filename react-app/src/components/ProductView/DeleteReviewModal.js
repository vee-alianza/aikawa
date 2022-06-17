import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../../context/Modal';
import { deleteUserReview } from '../../store/reviews';
import { getUserProductReview } from '../../store/products';

const DeleteReviewModal = ({ review, setReviews }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async (reviewId) => {
    const success = await dispatch(deleteUserReview(reviewId));

    if (success) {
      setReviews((prev) => prev.filter((review) => review.id !== reviewId));
      dispatch(getUserProductReview(false));
      setShowModal(false);
    }
  };

  return (
    <>
      {user && user.id === review.user.id &&
        <div>
          <button
            onClick={() => setShowModal(true)}
          >
            Delete
          </button>
          {showModal &&
            <Modal onClose={() => setShowModal(false)}>
              <div className='delete-review__header'>
                Delete review?
              </div>
              <div className='delete-review-buttons__container'>
                <button
                  onClick={() => handleDelete(review.id)}
                >
                  Yes
                </button>
                <button
                  onClick={() => setShowModal(false)}
                >
                  No
                </button>
              </div>
            </Modal>
          }
        </div>
      }
    </>
  );
};

export default DeleteReviewModal;
