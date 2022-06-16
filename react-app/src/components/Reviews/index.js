import './index.css';




const ReviewForm = () => {
    return (
        <>
            <div className='review__container'>
                <h4>REVIEW BOX</h4>
                <div className='review__box'>
                    <div className='star__ratings'>
                        🚀 🚀 🚀 🚀 🚀
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
