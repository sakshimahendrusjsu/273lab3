var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const OrderSchema =new Schema({
status:{
        type:String,
   },
buyer_id:{
     type:String,
},
buyer_name:{
     type:String,
  },
restuarant_id:{
    type:String,  
},
restuarant_name:{
    type:String,
 },
total_price:{
    type: Number
},
total_quantity:{
    type: Number
},
status:{
    type:String
},
items:[{
          name: String,
          description: String,
          price: String,
          quantity:String,
          image:String  
          }],
div_index:{
            type: Number
        },
list_index:{
            type: Number
}        
})


module.exports = Orders =mongoose.model('orders', OrderSchema);
