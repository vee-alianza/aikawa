// const CREATE_ORDER = "order/CREATE_ORDER";
// const READ_ORDER = 'order/READ_ORDER';
// const UPDATE_ORDER = 'order/UPDATE_ORDER';
// const REMOVE_ORDER = 'order/REMOVE_ORDER';

// const createOrder = (order) => {
//     return {
//         type: CREATE_ORDER,
//         payload: order
//     };
// };

// const readOrder = (order) => {
//     return {
//         type: READ_ORDER,
//         payload: order
//     };
// };

// const updateOrder = (order) => {
//     return {
//         type: UPDATE_ORDER,
//         payload: order
//     };
// };

// const removeOrder = (id) => {
//     return {
//         type: REMOVE_ORDER,
//         payload: id
//     };
// };


// export const getOrder = (order) => async dispatch => {
//     const response = await fetch(`/api/orders`, {
//         method: 'POST',
//         body: JSON.stringify(order)
//     })
//     const data = await response.json();
//     dispatch(createOrder(data.order));
//     return (response);
// };

// const orderReducer = (state = initialState, action) => {

// }

// export default orderReducer;
