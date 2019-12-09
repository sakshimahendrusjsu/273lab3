import { GET_MSG,PUT_MSG } from '../constants/actionsConstants';
import axios from 'axios';
import { HOST } from '../constants/host';


export function updateChat(data) {
    console.log("updateChat ", data);
    let body = {
      'order_id': data.order_id._id,
      'cart': data.order_id.items,
      'email': localStorage.getItem("email"),
      'name': localStorage.getItem("name"),
      'id': localStorage.getItem("_id"),
      'restaurant_name' : localStorage.getItem("restaurant_name")?localStorage.getItem("restaurant_name"):null,
      'restaurant_id' : localStorage.getItem("restaurant_id")?localStorage.getItem("restaurant_id"):null,
      'chat': data.chat
    }
    console.log("chat body ", body)
    return (dispatch) => {
      axios.post('http://'+HOST+'/mmsg/putMsg', body)
        .then((response) =>{ 
          console.log("chat updated");
          dispatch(sendChat(response))})
    }
  }

  function sendChat(data) {
    return { type: PUT_MSG, payload: data }
  }


export function getChat(data) {
  if(data!=undefined){
    let body = {
      'order_id': data,
    }
    console.log("chat body ", body)
    return (dispatch) => {
      axios.post('http://'+HOST+'/mmsg/getMsg', body)
        .then((response) =>{ 
          console.log("chat updated",response);
          dispatch(retrieveChatHistory(response))})
    }
  }
  }
  
  function retrieveChatHistory(data) {
    return { type: GET_MSG, payload: data }
  }

