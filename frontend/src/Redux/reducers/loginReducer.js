import {SIGN} from '../constants/actionsConstants';

const initialState= {
        output : "",
        message : "",
};

export default function loginReducer(state=[],action={}){
    switch(action.type){
        case SIGN: 
                console.log("login reducer",action.payload);
                console.log("login reducer msg",action.payload.message)
                 return Object.assign({}, state, {
                    output: action.payload.output,
                    message: action.payload.message
                 }); 
        default: return state;
    }
}