import {GET_SECTIONS,ADD_SECTION,DELETE_SECTION,ADD_ITEM,DEL_SECTION_ITEM } from '../constants/actionsConstants';

const initialState= {
   output : "",
   message : "",
   sections: [],
   items:[]
};

export default function sectionReducer(state=[],action={}){
    switch(action.type){
        case GET_SECTIONS: 
                console.log("get sections reducer",action.payload);
                if(action.payload.data.message!=null){
                 return Object.assign({}, state, {
                    ...state,
                    sections: action.payload.data.message.message.sections
                 }); 
               }
        case ADD_SECTION: 
                 console.log("add section reducer",action.payload);
                 console.log("add section reducer msg",action.payload.data.message)
               //   if(action.payload.data.output){
               //      alert("Section Added successfully!!")
               //   }
                  return Object.assign({}, state, {
                     output: action.payload.data.output,
                     message: action.payload.data.message,
           }); 
        case DELETE_SECTION: 
           console.log("delete section reducer",action.payload);
           console.log("delete section reducer msg",action.payload.message)
            return Object.assign({}, state, {
               output: action.payload.output,
               message: action.payload.message,
          });  
        case ADD_ITEM: 
          console.log("add item section reducer",action.payload);
          console.log("add item  reducer msg",action.payload.message)
           return Object.assign({}, state, {
              output: action.payload.output,
              message: action.payload.message,
         });  
         case DEL_SECTION_ITEM:
               console.log("add item section reducer",action.payload);
               console.log("add item  reducer msg",action.payload.message)
                return Object.assign({}, state, {
                   output: action.payload.output,
                   message: action.payload.message,
              });  
        default: return state;
    }
}