const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  // query for user data
  Query: {
    me: async (parent, args, context) => {
      // check if user exists
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );
        return userData;
      }
      throw new AuthenticationError("Not logged in");
    },
  },
  // mutations of user data for web functionality, including: login, addUser, saveReview and RemoveReview
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    saveReview: async (parent, { input }, context) => {
      if (context.user) {
        const addSavedReview = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedReview: input } },
          { new: true }
        );
        return addSavedReview;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removeReview: async (parent, { reviewId }, context) => {
      if (context.user) {
        const updatedSavedReview = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedReview: { reviewId: reviewId } } },
          { new: true }
        );
        return updatedSavedReview;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;