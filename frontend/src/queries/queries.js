// import { gql } from 'apollo-boost';
import gql from "graphql-tag";

// Login an existing user
export const getLoginQuery = gql`
  query login($email: String, $password: String,  $user_type : String) {
    login(email: $email, password: $password, user_type : $user_type) {
      email,
      user_type
    }
  }
`;

// Show profile
export const getProfileQuery = gql`
  query profile($email: String,$user_type : String) {
    profile(email: $email,user_type :  $user_type) {
      email,
      firstName,
      lastName
    }
  }
`;

// Show profile owner
export const getProfileOwnerQuery = gql`
  query profileOwner($email: String) {
    profileOwner(email: $email) {
      firstName
      lastName
      email
    }
  }
`;


// Show List of items
export const getListItems = gql`
  query getListItems($email: String) {
    getListItems(email: $email) {
      firstName
      lastName
      email
    }
  }
`;