// import {createStore , applyMiddleware} from 'redux';
// import rootReducer from '../reducers/rootReducer'
// import thunk from 'react-thunk';
// import { composeWithDevTools } from 'redux-devtools-extension';


import { createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer'

//redux middleware
const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  storeEnhancers(applyMiddleware(thunk))
);
  
export default store;

// const store = createStore(
//     rootReducer,composeWithDevTools(applyMiddleware(thunk))
// );

// export default store;