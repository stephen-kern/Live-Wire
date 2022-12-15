import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      reviewCount
      reviews {
        _id
        createdAt
        artist
        location
        reviewText
        commentCount
        comment {
          _id
          createdAt
          commentBody
          username
        }
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
        artist
        location
        username
        comments {
          _id
          commentBody
          username
          createdAt
        }
      }
      bandmates {
        _id
        username
      }
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

