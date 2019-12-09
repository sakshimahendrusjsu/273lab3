import { GET_MSG, PUT_MSG } from '../constants/actionsConstants';

const initialState = {
    output: "",
    message: "",
    chat: []
};

export default function messageReducer(state = [], action = {}) {
    switch (action.type) {
        case GET_MSG:
            console.log("get MSG reducer", action.payload);
            console.log("get MSG reducer msg", action.payload.data.message)
            if(action.payload.data.message.message!=undefined){
            return Object.assign({}, state, {
                output: action.payload.data.message.output,
                message: action.payload.data.message.message,
                chat: action.payload.data.message.message.messages
            });
        }else{
            return state;
        }
        case PUT_MSG:
            console.log("PUT MSG reducer", action.payload);
            console.log("PUT MSG reducer msg", action.payload.data.message)
            return Object.assign({}, state, {
                output: action.payload.data.output,
                message: action.payload.data.message.message,
                chat: action.payload.data.message.message.messages
            });
        default: return state;
    }
}