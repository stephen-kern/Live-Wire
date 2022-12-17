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
        comments {
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

export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      email
      bandmateCount
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
      reviews {
        _id
        createdAt
        reviewText
        artist
        location
        commentCount
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

export const QUERY_REVIEWS = gql`
  query reviews($username: String) {
    reviews(username: $username) {
      _id
      reviewText
      createdAt
      location
      artist
      username
      comments {
        _id
        createdAt
        username
        commentBody
      }
    }
  }
`;


