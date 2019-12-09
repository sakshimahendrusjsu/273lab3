const graphql = require("graphql");
var bcrypt = require("bcrypt-nodejs");
const Users = require('../models/UserSchema');
const Restaurants = require('../models/Restaurants');
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList, GraphQLBoolean, GraphQLDate } = graphql;
const saltRounds = 10;
const keys = require("../config/settings");

const UserDetailsType = new GraphQLObjectType({
  name: "UserDetailsType",
  fields: () => ({
    email: {
      type: GraphQLString
    },
    password: {
      type: GraphQLString
    },
    user_type: {
      type: GraphQLString
    },
    firstName: {
      type: GraphQLString
    },
    lastName: {
      type: GraphQLString
    },
    phone: {
      type: GraphQLString
    },
    restaurant_name: {
      type: GraphQLString
    },
    zipcode: {
      type: GraphQLString
    }
    // restaurantQL:{
    //   type: RestaurantDetailType,
    //   resolve(parent, args){
    //     return Restaurants.findById(parent.restaurantId);
    // }
    // }
  })
});


const RestaurantDetailsType = new GraphQLObjectType({
  name: "RestaurantDetailsType",
  fields: () => ({
    RestaurantId: { type: GraphQLString },
    RestaurantName: { type: GraphQLString },
    Sections: { type: GraphQLString }
  })
});

// const SectionDetailType = new GraphQLObjectType({
//   name: "SectionDetailsType",
//   fields: () => ({
//     SectionId: { type: GraphQLString },
//     SectionName: { type: GraphQLString },
//     ItemsQL : {type : ItemDetailsType,
//     resolve(parent, args){
//       return Restaurants.findById(parent.itemId);
//   }}
//   })
// });

// const ItemDetailsType = new GraphQLObjectType({
//   name: "CourseDetailsType",
//   fields: () => ({
//     ItemId: { type: GraphQLString },
//     ItemName: { type: GraphQLString },
//     Description: { type: GraphQLString },
//     Price: { type: GraphQLString },
//   })
// });

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    loginn: {
      // Login existing user
      type: UserDetailsType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        user_type : { type:GraphQLString }
      },
     async resolve(parent, args) {
       let output=null;
       const user= await Users.findOne({ 'email':args.email,'user_type':args.user_type })
          if (user==null || user.length==0) {
          error = "Hey Stranger! We don't recognize that login. Spell check your info and try again!";
          console.log("error")
            throw new Error("invalid request"); 
          } 
          // Check Password
        console.log("user",user);
       console.log("checking password");
       const isMatch = await bcrypt.compare(args.password, user.pswd);
       console.log("after await");
       if(!isMatch){
        let error = "Password incorrect";
        console.log(error);
        throw new Error(error);
       }else{
        console.log("output");
           output=user
       };
       console.log("rteurn",output);
     return output;
     
    }},
    profile: {
      // Get user profile
      type: UserDetailsType,
      args: {
        email: {
          type: GraphQLString
        },
        user_type:{
          type: GraphQLString
        }
      },
      async resolve(parent, args) {
        console.log("args: ", args);
        var profileData = {};
        await Users.findOne({ 'email':args.email,'user_type':args.user_type },
          (err, user) => {
            if (err) {
              console.log("errot while fetching profile")
            } else {
              console.log("User Porfile: ", user);
              profileData = user;
            }
          }
        );

        return profileData;
      }
    },
    getListItems: {
      type: RestaurantDetailsType,
      args: {
        email: { type: GraphQLString },
        restaurant_name: { type: GraphQLString },
      },
      async resolve(parent, args) {
        let sections=null;
        console.log("args: ", args);
        var message = {};
        var query = { 'name': args.restaurant_name, 'email': args.email }
        await Restaurants.findOne(query, function (error, result) {
          if (err) {
            console.log("errot while fetching restaurant details")
          } else {
            console.log("Restaurant deatisld: ", result);
            sections = result;
          }
        });
        return result;
      }
    },
    login: {
      // Login existing user
      type: UserDetailsType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        user_type : { type:GraphQLString }
      },
     async resolve(parent, args) {
       let output=null;
       const user= await Users.findOne({ 'email':args.email,'user_type':args.user_type })
          if (user==null || user.length==0) {
          error = "Hey Stranger! We don't recognize that login. Spell check your info and try again!";
          console.log("error")
            throw new Error("invalid request"); 
          } 
          // Check Password
        console.log("user",user);
       console.log("checking password");
      //  const isMatch = await bcrypt.compare(args.password, user.pswd);
       console.log("after await");
      //  if(!isMatch){
      //   let error = "Password incorrect";
      //   console.log(error);
      //   throw new Error(error);
      //  }else{
        console.log("output");
           output=user
      //  };
       console.log("rteurn",output);
     return output;
     
    }},
  })
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    addUser: {
      type: UserDetailsType,
      args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        user_type: { type: GraphQLString },
        phone: { type: GraphQLInt },
        restaurant_name: { type: GraphQLString },
        zipcode: { type: GraphQLInt }
      },
    async  resolve(parent, args) {
        let newUser=null;
      await Users.findOne({ $and: [{ email: args.email }, { user_type: args.user_type }] }, (err, user) => {
          if (err) {
            return console.log("erro while fetahcing data");
          } else {
            if (user) {
              console.log("User already exists!", user);
              return { 
                message: "User already exists!", 
                user : user};
            } else {
              //hash the password
              var salt = bcrypt.genSaltSync(saltRounds);
              const hashedPassword = bcrypt.hashSync(args.password, salt);
              //create a new user
              newUser = new Users({
                firstName: args.firstName,
                lastName: args.lastName,
                email: args.email,
                password: hashedPassword,
                user_type: args.user_type,
                restaurant_name: args.restaurant_name ? args.restaurant_name : null,
                phone: args.phone ? args.phone : null,
                zipcode: args.zipcode ? args.zipcode : null,
                image: null
              })
            }
          }
        });
        console.log("newuser",newUser);
     return newUser.save().then(
            doc => {
              console.log("User saved successfully.", doc);
              return  doc
            },
            err => {
              console.log("Unable to save user details.", err);
            }
          )
      }
    },
    addSection: {
      type: RestaurantDetailsType,
      args: {
        email: { type: GraphQLString },
        restaurant_name: { type: GraphQLString },
        section_name:{type:GraphQLString}
      },
      async resolve(parent, args) {
        let message=null;
        console.log("args: ", args);
        var query = { 'name': args.restaurant_name, 'email': args.email },
        update = { $push: { 'sections': { 'section_name': args.section_name } } },
        options = { upsert: true, new: true, setDefaultsOnInsert: true };
        await  Restaurants.update(query, update, options, function (error, result) {
          if (err) {
            console.log("errot while fetching restaurant details")
          } else {
            console.log("Restaurant deatisld: ", result);
            message = "Section Added Successfully!!";
          }
        });
        return message;
      }
    },
    addItem:{
      type: RestaurantDetailsType,
      args: {
        email: { type: GraphQLString },
        restaurant_name: { type: GraphQLString },
        section_id:{type:GraphQLString},
        name:{ type: GraphQLString },
        description:{ type: GraphQLString },
        price:{ type: GraphQLString },
        cuisine:{ type: GraphQLString },
      },
      async resolve(parent,args){
        let item = {
          "name": args.name,
          "description": args.description,
          "price": args.price,
          "cuisine": args.cuisine,
      }
      var query = { 'name': args.restaurant_name, 'email': args.email, 'sections._id': args.section_id },
      update = { $push: {'sections.$.items': item}}
      Restaurants.update(query, update, function (error, result) {
          if (error) {
              console.log(error);
              throw new Error("error adding items in sections")
          } else {
            console.log("Restaurant deatisld: ", result);
            message = "Section Added Successfully!!";
          }
      });
      }
    },
    updateUse: {
      type: UserDetailsType,
      args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
      },
      async resolve(parent, args) {
        console.log(args);
        await  Users.findOneAndUpdate({'email':email,'user_type':type},
        {$set : {'firstName':first,'lastName':lastName}},function(err,result){
          if(err){
           res.status(400).send({
               "output" : false,
               "message" : err })
          }else{
           res.status(200).send({
               "output" : true,
               "message" :"Name Updated!!!!!" })
          }
      });
      }
    }
  })
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
