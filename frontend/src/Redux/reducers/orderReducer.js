import { GET_ITEMS, GET_CART, SET_PRICE,SET_ORDER,DEL_ITEMS,GET_ORDER } from '../constants/actionsConstants';

const initialState = {
    items: [],
    total: 0,
    cartItems: [],
    message: "",
    ouput: "",
    price:"",
    order:"",
    orderItems:[]
}

export default function orderReducer(state = [], action = {}) {
    switch (action.type) {
        case GET_ITEMS:
            console.log("in  items reducer", action.payload)
            return Object.assign({}, state, {
                output: action.payload.data.output,
                message: action.payload.data.message,
                items: action.payload.data.message,
            });
        case GET_CART:
            console.log("in cart reducer", action.payload)
            console.log("state", state)
            return Object.assign({}, state, {
                ...state,
                cartItems: action.payload.cartItems,
            });
        case SET_PRICE:
            console.log("in SET PRICE reducer", action.payload)
            console.log("state price", state)
            return Object.assign({}, state, {
                ...state,
                price : action.payload,
            });
        case SET_ORDER:
            console.log("in SET order reducer", action.payload)
            console.log("state", state);
            localStorage.removeItem('cartItems');
            return Object.assign({}, state, {
                order:action.payload.message,
                cartItems:[]
            });
        case GET_ORDER:
                console.log("in GET ORDER  reducer", action.payload)
                console.log("state", state)
                return Object.assign({}, state, {
                    ...state,
                    orderItems : action.payload.data.message.message
            });
        case GET_ORDER:
                console.log("in GET ORDER  reducer", action.payload)
                return Object.assign({}, state, {
                    ...state,
                    orderItems : action.payload.data.message.message
        });
        case DEL_ITEMS:
                    console.log("in SET delete items reducer", action.payload)
                    console.log("state", state)
                    return Object.assign({}, state, {
                        ...state,
                        cartItems:[]
                    });
        default: return state;
    }
}

