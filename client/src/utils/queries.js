import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      reviewCount
      postReview {
        _id
        createdAt
        reviewText
        username
      }
      bandmates {
        _id
        username
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      reviewCount
      postReview {
        _id
        createdAt
        reviewText
        username
        comments {
          _id
          commentBody
          username
          createdAt
        }
      }
      bandmates
    }
  }
`;
// still need QUERY_REVIEW
export const QUERY_REVIEW = gql`
  query review($id: ID!) {
    review(_id: $id) {
      _id
      reviewText
      createdAt
      username
      location
      artist
      comments {
        _id
        createdAt
        username
        commentBody
      }
    }
  }
`;

// QUERY_COMMENT
export const QUERY_COMMENT = gql`
  query comment($id: ID!) {
    comment(_id: $id) {
      _id
      reviewText
      createdAt
      username
      reviewCount
      comments {
        _id
        createdAt
        username
        commentBody
      }
    }
  }
`;
