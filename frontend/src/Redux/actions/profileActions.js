import { EDIT_EMAIL,EDIT_NAME,EDIT_CUISINE,EDIT_PHONE,EDIT_RESTAURANT,EDIT_IMAGE,GET_ALL} from '../constants/actionsConstants';
import axios from 'axios';
import { HOST } from '../constants/host';

export function editName(formdata) {
  let email=localStorage.getItem("email");
  let type=localStorage.getItem("type");
  console.log("edit name action ",formdata);
  return (dispatch)=>{
      let data = {'type':type,
                  'email':email}
      formdata=Object.assign(formdata,data);
      console.log("object assign ",formdata);
  axios.put('http://'+HOST+'/mprofile/editName',formdata)
  .then((response)=>dispatch(updateName(response)))
    }
}

function updateName(returndata) {
  console.log("in sign up update",returndata);
  if(returndata.data.output) {
    returndata.config.data = JSON.parse(returndata.config.data);
    localStorage.setItem("first",returndata.config.data.first);
    localStorage.setItem("last",returndata.config.data.last);
  }
    return { type: EDIT_NAME, payload:returndata}
}

export function editEmail(formdata){
  let email=localStorage.getItem("email");
  let type=localStorage.getItem("type");
  console.log("edit email action ",formdata);
  return (dispatch)=>{
      let data = {'type':type,
                  'email':email}
      formdata=Object.assign(formdata,data);
      console.log("object assign ",formdata);
  axios.put('http://'+HOST+'/mprofile/editEmail',formdata)
  .then((response)=>dispatch(updateEmail(response)))
    }
    }

function updateEmail(returndata) {
    console.log("in function",returndata);
    if(returndata.data.output) {
      returndata.config.data = JSON.parse(returndata.config.data);
      localStorage.setItem("email",returndata.config.data.newEmail)
    }
    return { type: EDIT_EMAIL, payload:returndata}
  }

  export function editPhone(formdata){
  let email=localStorage.getItem("email");
  let type=localStorage.getItem("type");
  console.log("edit phone action ",formdata);
  return (dispatch)=>{
      let data = {'type':type,
                  'email':email}
      formdata=Object.assign(formdata,data);
      console.log("object assign ",formdata);
      axios.put('http://'+HOST+'/mprofile/editPhone',formdata)
      .then((response)=>dispatch(updatePhone(response)));   
      }    
  }
  
  function updatePhone(returndata) {
      console.log("in updatePhone function",returndata);
      if(returndata.data.output) {
        returndata.config.data = JSON.parse(returndata.config.data);
        localStorage.setItem("phone",returndata.config.data.phone)
      }
      return { type: EDIT_PHONE, payload:returndata}
    }
    
export function editImage(formdata) {
  const config = {
    headers: {
        'content-type': 'multipart/form-data'
    }
};
  console.log("edit image action ",formdata);
  return (dispatch)=>{
 axios.post('http://'+HOST+'/mprofile/fileUpload',formdata,config)
   .then((response) =>dispatch(updateImage(response)))
}}

  function updateImage(returndata) {
    console.log("in function",returndata);
    return { type: EDIT_IMAGE, payload:returndata}
  }

  export function editCuisine(formdata) {
    let email=localStorage.getItem("email");
    let type=localStorage.getItem("type");
    console.log("edit Cuisine action ",formdata);
    return (dispatch)=>{
        var data = {'type':type,
                    'email':email}
        formdata=Object.assign(formdata,data);
        console.log("object assign ",formdata);
    axios.put('http://'+HOST+'/mprofile/editCuisine',formdata)
    .then((response)=>dispatch(updateCuisine(response)))
  }
}

  function updateCuisine(returndata) {
    console.log("in function",returndata);
    if(returndata.data.output) {
      returndata.config.data = JSON.parse(returndata.config.data);
    }
    return { type: EDIT_CUISINE, payload:returndata}
  }

  export function editRestuarantName(formdata) {
    let email=localStorage.getItem("email");
    let type=localStorage.getItem("type");
    console.log("edit RestuarantName action ",formdata);
    return (dispatch)=>{
        var data = {'type':type,
                    'email':email}
        formdata=Object.assign(formdata,data);
        console.log("object assign ",formdata);
    axios.put('http://'+HOST+'/mprofile/editRestaurantName',formdata)
    .then((response)=>dispatch(updateRestuarantName(response)))
    getAll(data);
  }
}

  function updateRestuarantName(returndata) {
    console.log("in function",returndata);
    if(returndata.data.output) {
      returndata.config.data = JSON.parse(returndata.config.data);
    }
    return { type: EDIT_RESTAURANT, payload:returndata}
  }

  export function getAll(formdata) {
    console.log("GET ALL ",formdata);
    return (dispatch)=>{ 
    axios.post('http://'+HOST+'/mprofile/getAll',formdata)
    .then((response)=>dispatch(updateDetails(response)))
    };
}

  function updateDetails(returndata) {
    console.log("update deatils",returndata);
    return { type: GET_ALL, payload:returndata}
  }