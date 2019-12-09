import { GET_CART, SET_PRICE, SET_ORDER, DEL_ITEMS, GET_ORDER , ORDER_STATUS} from '../constants/actionsConstants';
import axios from 'axios';
import cookie from 'react-cookies';
import { HOST } from '../constants/host';

export function getCartItems() {
  console.log("get cart items action ");
  let cartData;
  if (localStorage.getItem('cartItems')) {
    cartData = {
      cartItems: JSON.parse(localStorage.getItem('cartItems'))
    }
    console.log("action caritmes", cartData);
    return (dispatch) => dispatch(updateCartItems(cartData))
  }
}
function updateCartItems(cartData) {
  return { type: GET_CART, payload: cartData }
}


export function setPrice(price) {
  console.log("set price called ", price);
  let data = {
    'price': price
  }
  return (dispatch) => {
  dispatch(updatePrice(data))
  }
}
function updatePrice(data) {
  return { type: SET_PRICE, payload: data.price }
}


export function placeOrder(data) {
  console.log("place order ", data);
  let user = cookie.load('cookyou');
  console.log("cookyou", user);
  let body = {
    'cart': data.cartItems,
    'price': data.totalPrice,
    'email': localStorage.getItem("email"),
    'name': localStorage.getItem("name"),
    'owner_id': localStorage.getItem("owner_id"),
    'id': localStorage.getItem("_id"),
    'restaurant_name' : localStorage.getItem("restaurant_name")?localStorage.getItem("restaurant_name"):null,
    'restaurant_id' : localStorage.getItem("restaurant_id")?localStorage.getItem("restaurant_id"):null,
  }
  console.log("placing order with body", body)
  return (dispatch) => {
    axios.post('http://'+HOST+'/morder/placeOrder', body)
      .then((response) =>{ 
        console.log("order placed");
        dispatch(updatePlaceOrder(response))})
  }
}

function updatePlaceOrder(data) {
  localStorage.removeItem("restaurant_name");
  localStorage.removeItem("restaurant_id");
  return { type: SET_ORDER, payload: data }
}


export function clearCartItems() {
  let cart= {
   'carItems' :[]
  }
  return (dispatch) => {
     dispatch(deleteCarItems(cart))
  }
}
function deleteCarItems(cart) {
  return { type: DEL_ITEMS, payload:cart  }
}

export function getOrderDeatilsBuyer(status) {
      let data = {
      'status': status,
      'id': localStorage.getItem("_id"),
      'email': localStorage.getItem("email")
    }
    return (dispatch) => {
   axios.post('http://'+HOST+'/morder/getOrderDeatilsBuyer/', data)
   .then((response) =>{ 
    console.log("GET BUYER order ACTION");
    dispatch(updateOrderDeatils(response))})
    }
}

export function getOrderDeatilsOwner(status) {
  let data = {
  'status': status,
  'id': localStorage.getItem("_id"),
  'name': localStorage.getItem("restaurant_name"),
  'email': localStorage.getItem("email")
}
return (dispatch) => {
 axios.post('http://'+HOST+'/morder/getOrderDeatilsOwnerWithStatus/', data)
 .then((response) =>{ 
  console.log("GET order owner action");
  dispatch(updateOrderDeatils(response))})
}
}

function updateOrderDeatils(returndata) {
  console.log("in updateOrderDeatils update",returndata);
    return { type: GET_ORDER, payload:returndata}
}

export function handleStatus(body) {
  console.log("handle status",body)
return (dispatch) => {
 axios.post('http://'+HOST+'/morder/updateStatus', body)
 .then((response) =>{ 
  console.log("handleStatus order action");
  dispatch(updateStatus(response))})
}
}

function updateStatus(returndata) {
  console.log("in updateStatus update",returndata);
    return { type: ORDER_STATUS, payload:returndata}
}