const GET_PRODUCTS = 'products/GET_PRODUCTS';
const GET_PRODUCT_DETAILS = 'products/GET_PRODUCT_DETAILS';
const GET_USER_CART = 'products/GET_USER_CART';
const REMOVE_CART_PRODUCT = 'products/REMOVE_CART_PRODUCT';
const USER_ORDER_PLACED = 'products/USER_ORDER_PLACED';

const getProducts = (products) => {
    return {
        type: GET_PRODUCTS,
        payload: products
    }
};

const getProductDetails = (product) => {
    return {
        type: GET_PRODUCT_DETAILS,
        payload: product
    }
};

const getUserCart = (cartItems) => {
    return {
        type: GET_USER_CART,
        payload: cartItems
    }
};

const removeCartProduct = (productId) => {
    return {
        type: REMOVE_CART_PRODUCT,
        payload: productId
    }
};

const userOrderPlaced = () => {
    return {
        type: USER_ORDER_PLACED
    }
};

export const getProductsThunk = (lastProductId) => async (dispatch) => {
    const response = await fetch(`/api/products/?lastProductId=${lastProductId}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(getProducts(data.products));
        return data.products.length;
    } else {
        console.error('Error fetching products data...');
        return;
    }
};

export const getProductDetailsThunk = (productId) => async (dispatch) => {
    const response = await fetch(`/api/products/${productId}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(getProductDetails(data.product));
    } else {
        console.error('Error fetching product details...');
    }
};

export const getUserCartThunk = () => async (dispatch) => {
    const response = await fetch('/api/products/cart');
    if (response.ok) {
        const data = await response.json();
        dispatch(getUserCart(data.cartItems));
    } else {
        console.error('Error fetching user cart');
    }
};

export const removeCartProductThunk = (productId) => async (dispatch) => {
    const response = await fetch(`/api/products/cart/${productId}`, {
        method: 'DELETE'
    });
    const data = await response.json();
    if (data.success) {
        dispatch(removeCartProduct(productId));
        return true;
    } else {
        console.error('Error removing product from cart...');
        return;
    }
};

export const placeUserOrderThunk = (orderedItems) => async (dispatch) => {
    const response = await fetch('/api/products/cart', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ orderedItems })
    });
    const data = await response.json();
    if (data.success) {
        dispatch(userOrderPlaced());
    } else {
        console.error('Error checking out cart...');
    }
};

export const addToCart = (productId) => async (dispatch) => {
    const response = await fetch(`/api/products/${productId}`, {
        method: 'POST'
    });
    if (response.ok) {
        const data = await response.json();
        return data.success;
    } else {
        console.error('Error adding product to cart...');
        return;
    }
};

const initialState = {
    allProducts: null,
    currentProduct: null,
    userCart: null
};

const productReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_PRODUCTS:
            newState = { ...state };
            if (state.allProducts) {
                newState.allProducts = [...state.allProducts, ...action.payload];
            } else {
                newState.allProducts = [...action.payload];
            }
            return newState;
        case GET_PRODUCT_DETAILS:
            newState = { ...state };
            newState.currentProduct = action.payload;
            return newState;
        case GET_USER_CART:
            newState = { ...state };
            newState.userCart = action.payload;
            return newState;
        case REMOVE_CART_PRODUCT:
            newState = { ...state };
            newState.userCart = state.userCart.filter((item) => item.productId !== action.payload);
            return newState;
        case USER_ORDER_PLACED:
            newState = { ...state };
            newState.userCart = null;
            return newState;
        default:
            return state;
    }
};

export default productReducer;
