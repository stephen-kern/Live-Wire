const { gql } = require("apollo-server-express");

// GQL data types and what they are corresponding with
const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    reviewCount: Int
    savedReview: [Review]
  }

  type Review {
    reviewId: String!
    band: String!
    venue: String!
    review: String    
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }

  input reviewInput {
    reviewId: String!
    band: String!
    venue: String!
    description: String    
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    savedReview(input: reviewInput): User
    removeReview(reviewId: String!): User
  }
`;

module.exports = typeDefs;