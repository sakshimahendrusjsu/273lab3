var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//schema
const UserSchema = new Schema({

    firstName: {
      type: String,
    required: true,
    trim: true,
    },
    lastName:{
        type: String,
        required: true,
        trim: true,
    },
    email :{
        type:String,
        required: true,
        trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    user_type:{
        type:String,
        required: true,
        trim: true,
    },
    restaurant_name:{
        type: String,
      
    },
    phone: {
      type: String,
     
      // validate: {
      //   validator: function(v) {
      //     return /^[0-9]{10})?$/.test(v);
      //   },
      //   message: props => `${props.value} is not a valid zipcode number!`
      // },
      
    },
    image:{
        type: String,
       
    },
    zipcode: {
        type: String,
        // validate: {
        //   validator: function(v) {
        //     return /^[0-9]{5}(?:-[0-9]{4})?$/.test(v);
        //   },
        //   message: props => `${props.value} is not a valid zipcode number!`
        // },
        
      },
    timestamp: {
        type: Date, 
          default: Date.now,
          required: true
      }
    });
        
    module.exports = User = mongoose.model('userlab3',UserSchema);
    
