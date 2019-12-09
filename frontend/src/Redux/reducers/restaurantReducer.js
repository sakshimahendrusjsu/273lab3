import {GET_RESTAURANTS,GET_RESTAURANTS_CUISINE } from '../constants/actionsConstants';

const initialState= {
   output : "",
   message : "",
   res:[],
};

export default function restaurantReducerr(state=[],action={}){
    switch(action.type){
        case GET_RESTAURANTS: 
                console.log("restaurant reducer",action.payload);
                console.log("restaurant reducer msg",action.payload.message)
                 return Object.assign({}, state, {
                    output: action.payload.message.output,
                    message: action.payload.message.message,
                    res: action.payload.message.message
                 }); 
        case GET_RESTAURANTS_CUISINE: 
        console.log("restaurant cusine reducer",action.payload);
        console.log("restaurant cusine reducer msg",action.payload.data.message)
         return Object.assign({}, state, {
            output: action.payload.data.message.output,
            message: action.payload.data.message.message,
            res: action.payload.data.message.message
         });
        default: return state;
    }
}