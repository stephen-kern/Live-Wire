<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> a9549e2abfff5ec8784c285886deefa8af032f19
import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_REVIEW = gql`
  mutation addReview($input: reviewInput!) {
    addReview(input: $input) {
      reviewText
      createdAt
      username
      location
      artist
      reactions{
        _id
        reactionBody
        username
        createdAt
     }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;
<<<<<<< HEAD
=======
// ADD_REVIEW
// ADD_COMMENT
// ADD_BANDMATE
// ADD_USER
// LOGIN_USER
>>>>>>> b316c868a15fa9bf95d352a4dd07f4e90360179f
=======
>>>>>>> a9549e2abfff5ec8784c285886deefa8af032f19
