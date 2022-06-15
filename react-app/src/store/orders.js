const GET_ORDER_DETAILS = 'order/GET_ORDER_DETAILS';
const CREATE_ORDER = "order/CREATE_ORDER";
const UPDATE_ORDER = 'order/UPDATE_ORDER';
const REMOVE_ORDER = 'order/REMOVE_ORDER';

const getOrderDetails = (order) => {
    return {
        type: GET_ORDER_DETAILS,
        payload: order
    }
};

const createOrder = (order) => {
    return {
        type: CREATE_ORDER,
        payload: order
    };
};

const updateOrder = (order) => {
    return {
        type: UPDATE_ORDER,
        payload: order
    };
};

const removeOrder = (id) => {
    return {
        type: REMOVE_ORDER,
        payload: id
    };
};


export const getOrderDetailsThunk = (id) => async (dispatch) => {
    const response = await fetch(`/api/orders/${id}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(getOrderDetails(data.order));
    } else {
        console.error('Error fetching order details...');
    }
};

export const postOrder = (order) => async (dispatch) => {
    const response = await fetch(`/api/orders`, {
        method: 'POST',
        body: JSON.stringify(order)
    })
    const data = await response.json();
    dispatch(createOrder(data.order));
    return (response);
};


const initialState = {
    currentOrder: null,
    allOrders: null
}

const orderReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case CREATE_ORDER: {
            newState = { ...state };
            newState = Object.assign(action.order, newState);
            return newState
        }
        case GET_ORDER_DETAILS:
            newState = Object.assign({}, state);
            newState.currentOrder = action.payload
            return newState;
        case UPDATE_ORDER:
            newState = Object.assign({}, state);
            if (state.allOrders) {
                newState.allOrders = state.allOrders.map((order) => {
                    if (order.id === action.payload.id) {
                        return action.payload;
                    } else {
                        return order;
                    }
                });
            } if (state.currentOrder) {
                newState.currentOrder = action.payload;
            }
            return newState;
        case REMOVE_ORDER:
            newState = Object.assign({}, state);
            newState.allOrders = state.allOrders.filter(order => {
                return order.id !== action.payload;
            });
            newState.currentOrder = null;
            return newState;
        default:
            return state;
    }
};

export default orderReducer;
