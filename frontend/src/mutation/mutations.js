import { gql } from 'apollo-boost';

// Creating a new user through sign up
const newUserMutation = gql`
  mutation addUser($firstName: String, $lastName: String, $email: String, $password: String, 
    $user_type: String,$restaurant_name:String) {
      addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password,
       user_type: $user_type,restaurant_name:$restaurant_name) {
      firstName
      lastName
      email
      user_type
      phone
      restaurant_name
      zipcode
       }
      }
`;

// Updating user profile Name
const updateUserName = gql`
  mutation updateName( $email: String, $firstName: String, $lastName: String,$user_type: String)
     {  updateName( email: $email,firstName : $firstName, lastName : $lastName,user_type: $user_type
    ) {
      email
      firstName
      lastName
    }
  }
`;

// Updating user profile Email
const updateUserEmail = gql`
  mutation updateEmail( $email: String, $user_type: String)
     {  updateUserEmail( email: $email,user_type: $user_type
    ) {
      email
    }
  }
`;

//Add Section
const addSec = gql`
  mutation addSection( $email: String, $restaurant_name: String,$section_name:String)
     {  addSection( email: $email,restaurant_name: $restaurant_name,section_name:$section_name
    ) {
      email
      message
    }
  }
`;

//Add Item
const addItemToSection = gql`
  mutation addItem( $email: String, $restaurant_name: String,$section_id:String,$name:String,
    $description:String,$price:String,$cuisine:String)
     {  addItem( email: $email,restaurant_name: $restaurant_name,section_id:$section_id,name:$name,
      description:$description,price:$price,cuisine:$cuisine)
    ) {
      email
      message
    }
  }
`;





export { newUserMutation,updateUserName,updateUserEmail,addItemToSection,addSec };
