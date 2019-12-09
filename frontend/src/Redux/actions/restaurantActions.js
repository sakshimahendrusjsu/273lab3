import { GET_RESTAURANTS,GET_RESTAURANTS_CUISINE } from '../constants/actionsConstants';
import axios from 'axios';
import cookie from 'react-cookies';
import { HOST } from '../constants/host';

export function selectRestuarantByItems(formdata) {
  console.log("in selectRestuarantByItems", formdata);
  return (dispatch) => {
    axios.post('http://'+HOST+'/mres/selectRestuarantByItems', formdata)
      .then((response) => dispatch(updateRestuarantByItems(response)))
      .catch(error => {
        console.log("catch", (error));
      })
  }
}

function updateRestuarantByItems(returndata) {
  console.log("in updateRestuarantByItems", returndata);
  if(returndata!==undefined){
    return { type: GET_RESTAURANTS, payload: returndata.data }
    }
 
}


export function selectRestuarantByCuisine(formdata) {
  console.log("in selectRestuarantByCuisine", formdata);
  return (dispatch) => {
    axios.post('http://'+HOST+'/mres/selectRestuarantByItemsAndCuisine', formdata)
      .then((response) => dispatch(updateRestuarantByCuisine(response)))
      .catch(error => {
        console.log("catch", (error));
      })
  }
}

function updateRestuarantByCuisine(returndata) {
  console.log("in updateRestuarantByCuisine", returndata);
  if(returndata!==undefined){
  return { type: GET_RESTAURANTS_CUISINE, payload: returndata }
  }
}
