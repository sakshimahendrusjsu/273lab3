import { SIGN } from '../constants/actionsConstants';
import axios from 'axios';
import {HOST} from '../constants/host';

export function signup(formdata) {
  console.log("Signup", formdata);
  console.log('http://'+HOST+'/msignup/signup');
  return (dispatch) => {
    axios.post('http://'+HOST+'/msignup/signup', formdata)
      .then((response) => dispatch(updateSignUp(response)))
      .catch(error => {
        console.log("catch", dispatch(updateSignUp(error)));
      })
  }
}

function updateSignUp(returndata) {
  console.log("in sign up update", returndata);
  if(returndata!==undefined){
  return { type: SIGN, payload: returndata.data }
  }else{
    return { type: SIGN, payload: returndata.response.data }
  }
}

export function signin(formdata) {
  console.log("Signin", formdata);
  console.log('http://'+HOST+'/msignup/signup');
  axios.defaults.withCredentials = true;
  return (dispatch) => {
    axios.post('http://'+HOST+'/mlogin/login', formdata)
      .then((response) => dispatch(updateSignIn(response)))
      .catch(error => {
        console.log("catch", dispatch(updateSignUp(error.response)));
      })
  }
}

function updateSignIn(returndata) {
  console.log("in sign in function", returndata);
  if (returndata!==undefined && returndata.data.output) {
    console.log("localstorage");
    console.log("data",returndata.data);
    console.log("type",returndata.data.user.user_type);
    localStorage.setItem("email", returndata.data.user.email)
    localStorage.setItem("type", returndata.data.user.user_type);
    localStorage.setItem("token", returndata.data.token);
    localStorage.setItem("_id",returndata.data.user._id);
    localStorage.setItem("restaurant_name",returndata.data.user.restaurant_name);
    return { type: SIGN, payload: returndata.data }
  }
  if (returndata!==undefined){
    console.log("somethign went wrong",returndata.data);
    return { type: SIGN, payload: returndata.data }
  }
  else{
    return { type: SIGN, payload: returndata.response.data }
  }
}