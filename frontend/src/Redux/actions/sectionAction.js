import { GET_SECTIONS,ADD_SECTION,DELETE_SECTION,ADD_ITEM,DEL_SECTION_ITEM } from '../constants/actionsConstants';
import axios from 'axios';
import cookie from 'react-cookies';
import { HOST } from '../constants/host';

export function addSection(formdata) {
  console.log("action- add section", formdata);
  return (dispatch) => {
    axios.post('http://'+HOST+'/msec/add', formdata)
      .then((response) => dispatch(
        updateSection(response)))
        .catch(error => {
          console.log("catch", error);
        })
  }
}

function updateSection(returndata) {
  console.log("in update section", returndata);
  return { type: ADD_SECTION, payload: returndata }
}


export function getAll(formdata) {
  console.log("action- get all", formdata);
  return (dispatch) => {
    axios.post('http://'+HOST+'/msec/getAll', formdata)
      .then((response) => dispatch(getSections(response)))
      .catch(error => {
        console.log("catch", error);
      })
  }
}

function getSections(returndata) {
  console.log("in get all update", returndata);
  return { type: GET_SECTIONS, payload: returndata }
}


export function addItem(formdata) {
  console.log("Add Item", formdata);
  axios.defaults.withCredentials = true;
  const config = {
    headers: {
        'content-type': 'multipart/form-data'
    }
  }
  return (dispatch) => {
    axios.post('http://'+HOST+'/msec/insertItem', formdata)
      .then((response) => dispatch(updateItem(response)))
      .catch(error => {
        console.log("catch", error);
      })
  }
}

function updateItem(returndata) {
  console.log("add item in function", returndata);
  if (returndata.data.output) {
    return { type: ADD_ITEM, payload: returndata.data }
  }
  else{
    console.log("something went wrong",returndata.data);
    return { type: ADD_ITEM, payload: returndata.data }
  }
}

export function deleteSection(formdata) {
    console.log("in delete section", formdata);
    return (dispatch) => {
      axios.post('http://'+HOST+'/msec/del', formdata)
        .then((response) => dispatch(updateDelete(response)))
        .catch(error => {
          console.log("catch", error);
        })
    }
  }
  
  function updateDelete(returndata) {
    console.log("in update delete", returndata);
    return { type: DELETE_SECTION, payload: returndata }
  }


  export function deleteSectionItem(formdata) {
    console.log("in delete section item", formdata);
    return (dispatch) => {
      axios.post('http://'+HOST+'/msec/delItem', formdata)
        .then((response) => dispatch(updateDeleteItem(response)))
        .catch(error => {
          console.log("catch", error);
        })
    }
  }
  
  function updateDeleteItem(returndata) {
    console.log("in update delete item", returndata);
    return { type: DEL_SECTION_ITEM, payload: returndata }
  }
  