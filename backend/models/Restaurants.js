var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const RestaurantSchema =new Schema({
name:{
     type:String,
     required:true
},
email:{
     type:String,
     required:true
  },
sections:  [{
          section_name:String,
          items:[{
          name: String,
          description: String,
          price: String,
          cuisine:String,
          image:String  
          }]
     }]
})


module.exports = Restaurants =mongoose.model('restaurantlab3', RestaurantSchema);
