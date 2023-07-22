import * as ActionTypes from './ActionTypes';

export const Orders = (state = { loading: true,
    errMess: null,
    orders:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_ORDERS:
            return {...state, loading: false, errMess: null, orders: action.orders};

        case ActionTypes.ADD_NEW_ORDER:
            return { ...state, orders: state.orders.concat(action.order)};

        case ActionTypes.ORDERS_LOADING:
            return {...state, loading: true, errMess: null, orders: []}

        case ActionTypes.ORDERS_FAILURE:
            return {...state, loading: false, errMess: action.errMess};

        default:
            return state;
    }
};