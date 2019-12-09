import {combineReducers} from 'redux'
import LoginReducer from './loginReducer';
import EditReducer from './editReducer';
import orderReducer from './orderReducer';
import sectionReducer from './sectionReducer';
import restaurantReducer from './restaurantReducer';
import messageReducer from './messageReducer';

const rootReducer = combineReducers({
    login: LoginReducer,
    edit : EditReducer,
    order :orderReducer,
    section : sectionReducer,
    res : restaurantReducer,
    msg : messageReducer
});

export default rootReducer;