const GET_REVIEWS = 'reviews/GET_REVIEWS';
const ADD_REVIEW = 'reviews/ADD_REVIEW';
const UPDATE_REVIEW = 'reviews/UPDATE_REVIEW';
const DELETE_REVIEW = 'reviews/DELETE_REVIEW';

const getReviews = (reviews) => {
    return {
        type: GET_REVIEWS,
        payload: reviews
    };
};
const addReviews = (review) => {
    return {
        type: ADD_REVIEW,
        payload: review
    };
};
const updateReviews = (review) => {
    return {
        type: UPDATE_REVIEW,
        payload: review
    };
};
const removeReviews = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        payload: reviewId
    };
};

export const getReviewsThunk = () => async (dispatch) => {
    const response = await fetch('/api/reviews/');
    if (response.ok) {
        const data = await response.json();
        dispatch(getReviews(data.reviews));
    }
};

export const addNewReview = (review) => async dispatch => {
    const response = await fetch('/api/reviews/new', {
        method: 'POST',
        body: JSON.stringify(review)
    });
    if (response.ok) {
        const data = await response.json();
        // console.log(data);
        dispatch(addReviews(data.review));
    } else {
        const error = await response.json();
        Promise.reject(error.errors);
    }
    return response;
};

export const deleteReview = (reviewId) => async dispatch => {
    const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        dispatch(removeReviews(reviewId));
    }
    return (response);
};

const initialState = {};

const reviewReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_REVIEWS:
            newState = { ...state };
            action.payload.reviews.forEach(review => {
                newState[reviewReducer.id] = review;
            });
            return newState;
        default:
            return state;
    }
};

export default reviewReducer;
