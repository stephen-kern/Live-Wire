const { gql } = require("apollo-server-express");

// GQL data types and what they are corresponding with
const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    reviewCount: Int
    reviews: [Review]
    bandmates: [User]
  }

  type Review {
    _id: ID
    artist: String!
    location: String!
    reviewText: String!
    createdAt: String
    commentCount: Int
    comment: [Comment]
  }

  type Comment {
    _id: ID
    commentBody: String
    createdAt: String
    username: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    reviews: [Review]
    review(_id: ID): Review
    comment: Comment
  }

  input reviewInput {
    reviewId: String!
    reviewText: String!
    artist: String!
    location: String!
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    postReview(artist: String!, location: String!, reviewText: String!): Review
    removeReview(reviewId: String!): User
    addComment(reviewId: ID!, commentBody: String!): Review
    addBandmate(bandmateId: ID!): User
  }
`;

module.exports = typeDefs;
