<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> a9549e2abfff5ec8784c285886deefa8af032f19
import { gql } from '@apollo/client';
=======
import { gql } from "@apollo/client";
>>>>>>> 3c1c746d752d0df201ec0f4fa1b6d933caccc100

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const POST_REVIEW = gql`
  mutation postReview($input: reviewInput!) {
    postReview(input: $input) {
      reviewText
      createdAt
      username
      location
      artist
      commentCount
      comment {
        _id
      }
    }
  }
`;
<<<<<<< HEAD
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
=======

// this one doesn't feel right
export const REMOVE_REVIEW = gql`
  mutation removeReview($reviewId: ID!) {
    removeReview(id: $id) {
        _id
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($reviewId: ID!, $commentBody: String!) {
    addComment(reviewId: $reviewId, commentBody: $commentBody) {
      _id
      commentCount
      comment {
        _id
        commentBody
        createdAt
        username
      }
    }
  }
`;

export const ADD_BANDMATE = gql`
  mutation addBandmate($id: ID!) {
    addBandmate(bandmateId: $id) {
        _id
        username
        bandmateCount
        bandmates {
            _id
            username
        }
    }
  }
`;

export const REMOVE_BANDMATE = gql`
  mutation removeBandmate($id: ID!) {
    removeBandmate(id: $id) {
        _id
        username
        bandmates {
            _id
            username
        }
    }
  }
`;


>>>>>>> 3c1c746d752d0df201ec0f4fa1b6d933caccc100
