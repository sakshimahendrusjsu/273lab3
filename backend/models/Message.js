var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const MessageSchema =new Schema({
order_id:{
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
messages:[],
items:[{
          name: String,
          description: String,
          price: String,
          quantity:String,
          image:String  
          }]      
})

module.exports = Message =mongoose.model('orders', MessageSchema);
