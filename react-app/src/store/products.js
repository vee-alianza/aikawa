const GET_PRODUCTS = 'products/GET_PRODUCTS';
const EDIT_PRODUCT = 'products/EDIT_PRODUCT';
const REMOVE_PRODUCT = 'products/REMOVE_PRODUCT';

const getProducts = (products) => {
    return {
        type: GET_PRODUCTS,
        payload: products
    }
}

export const getProductsThunk = (lastProductId) => async (dispatch) => {
    const response = await fetch(`/api/products/?lastProductId=${lastProductId}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(getProducts(data.products));
    }
};

const initialState = {
    allProducts: null,
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
        default:
            return state;
    }
};

export default productReducer;
