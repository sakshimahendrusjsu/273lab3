import { EDIT_EMAIL, EDIT_NAME, EDIT_CUISINE, EDIT_PHONE, EDIT_RESTAURANT,GET_ALL, EDIT_IMAGE } from '../constants/actionsConstants';

const initialState = {
    output: null,
    message: "",
    first:"",
    last:"",
    phone:"",
    email:"",
    restaurantName:"",
    cuisine:"",
    selectedFile: null,
    selectedFileName: null,
    image:"download.png"
}

export default function editReducer(state = [], action = {}) {
    switch (action.type) {
        case EDIT_EMAIL:
            return Object.assign({}, state, {
                output: action.payload.data.output,
                message: action.payload.data.message,
                email: action.payload.config.data.newEmail
            });
        case EDIT_NAME:
            console.log(action.payload)
            return Object.assign({}, state, {
                output: action.payload.data.output,
                message: action.payload.data.message,
                first: action.payload.config.data.first,
                last: action.payload.config.data.last
            });
        case EDIT_PHONE:
            console.log("Edit phone",action.payload)
            return Object.assign({}, state, {
                output: action.payload.data.output,
                message: action.payload.data.message,
                phone: action.payload.config.data.phone
            });
        case EDIT_CUISINE:
            console.log(action.payload)
            return Object.assign({}, state, {
                output: action.payload.data.output,
                message: action.payload.data.message,
                cuisine: action.payload.config.data.cuisine
            });
        case EDIT_RESTAURANT:
            console.log(action.payload)
            return Object.assign({}, state, {
                output: action.payload.data.output,
                message: action.payload.data.message,
                restaurantName:action.payload.data.restaurantName
            });
        case GET_ALL:
            console.log("heylo heylo", action.payload);
            let data = action.payload.data.message.result;
            if(data!=undefined || data!=null){
            return Object.assign({}, state, {
                first: data.firstName, 
                last: data.lastName,
                phone: data.phone == null ? "" : data.phone,
                email: data.email ,
                restaurantName: data.restaurant_name == null ? "" : data.restaurant_name , 
                image: data.image == null ? "download.png" : data.image
            });
        }
        default: return state;
    }
}