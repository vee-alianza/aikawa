import { getCartItemCountThunk } from "./products";

// constants
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';
const UPDATE_USER_RATING = 'session/updateUserRating';
const GET_CURRENT_REVIEW_DATA = 'session/getCurrentReviewData';
const GET_USER_SHIPPING_DETAILS = 'session/GET_USER_SHIPPING_DETAILS';


const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER,
})

const getCurrentReviewData = (data) => {
  return {
    type: GET_CURRENT_REVIEW_DATA,
    payload: data
  };
};

export const updateUserRating = (rating) => {
  return {
    type: UPDATE_USER_RATING,
    payload: rating
  };
};

export const getUserShippingDetails = (shippingDetails) => {
  return {
    type: GET_USER_SHIPPING_DETAILS,
    payload: shippingDetails
  }
};


export const fetchCurrentProductData = (reviewId) => async (dispatch) => {
  const response = await fetch(`/api/session/review/${reviewId}`);
  const data = await response.json();
  dispatch(getCurrentReviewData(data));
  return response;
};

export const authenticate = () => async (dispatch) => {
  const response = await fetch('/api/auth/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
}

export const login = (email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });


  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    dispatch(getCartItemCountThunk());
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }

}

export const logout = () => async (dispatch) => {
  const response = await fetch('/api/auth/logout', {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    dispatch(removeUser());
    dispatch(getCartItemCountThunk());
  }
};


export const signUp = (username, email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
};


const initialState = {
  user: null,
  shippingDetails: null
};


export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { ...state, user: null };
    case GET_USER_SHIPPING_DETAILS:
      return { ...state, shippingDetails: action.payload }
    default:
      return state;
  }
}
