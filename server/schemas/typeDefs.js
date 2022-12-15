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
    artist: String!
    location: String!
    reviewText: String
    createdAt: String 
    reactionCount: Int
    reactions: [Reaction]
  }

  type Reaction {
    _id: ID
    reactionBody: String
    createdAt: String
    username: String
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
    artist: String!
    location: String!
    description: String    
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    postReview(input: reviewInput): User
    removeReview(reviewId: String!): User
    addComment(reviewId: ID!, commentBody: String!): Thought
    addBandmate(bandmateId: ID!): User
  }
`;

module.exports = typeDefs;