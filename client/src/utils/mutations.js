// Import packages
import { gql } from "@apollo/client";

// Login Mutation for front-end functionality and export it
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

// Add User Mutation for front-end functionality and export it
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

// Post Review Mutation for front-end functionality and export it
export const POST_REVIEW = gql`
  mutation postReview(
    $artist: String!
    $location: String!
    $reviewText: String!
  ) {
    postReview(artist: $artist, location: $location, reviewText: $reviewText) {
      _id
      reviewText
      createdAt
      location
      username
      artist
      commentCount
      comments {
        _id
      }
    }
  }
`;

// this one doesn't feel right (unused) and export it
export const REMOVE_REVIEW = gql`
  mutation removeReview($reviewId: ID!) {
    removeReview(id: $id) {
      _id
    }
  }
`;

// Add comment to Review Mutation for for front-end functionality and export it
export const ADD_COMMENT = gql`
  mutation addComment($reviewId: ID!, $commentBody: String!) {
    addComment(reviewId: $reviewId, commentBody: $commentBody) {
      _id
      commentCount
      comments {
        _id
        commentBody
        createdAt
        username
      }
    }
  }
`;

// Add Bandmate to logged in users Bandmate Count Mutation for front-end functionality and export it
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

// Remove Bandmate to logged in users Bandmate Count Mutation for front-end functionality and export it
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
