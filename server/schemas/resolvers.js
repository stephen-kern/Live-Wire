const { AuthenticationError } = require("apollo-server-express");
const { User, Review } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  // query for user data
  Query: {
    me: async (parent, args, context) => {
      // check if user exists
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("reviews")
          .populate("bandmates");
        return userData;
      }
      throw new AuthenticationError("Not logged in");
    },
    users: async () => {
      return User.find()
        .select("-__v -password")
        .populate("reviews")
        .populate("bandmates");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
      .select('-__v -password')
      .populate('reviews')
      .populate('bandmates')
    },
    reviews: async () => {
      return Review.find().sort({ createdAt: -1 });
    },
    review: async (parent, { _id }) => {
      return Review.findOne({ _id });
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
    postReview: async (parent, args, context) => {
      if (context.user) {
        const review = await Review.create({ ...args, user: context.user._id });
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { reviews: review._id } },
          { new: true }
        );

        return review;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removeReview: async (parent, { reviewId }, context) => {
      if (context.user) {
        const updatedPostReview = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { postReview: { reviewId: reviewId } } },
          { new: true }
        );
        return updatedPostReview;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    addComment: async (parent, { reviewId, commentBody }, context) => {
      if (context.user) {
        const updatedReview = await Review.findOneAndUpdate(
          { _id: reviewId },
          {
            $push: {
              comment: { commentBody, username: context.user.username },
            },
          },
          { new: true, runValidators: true }
        );

        return updatedReview;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    addBandmate: async (parent, { bandmateId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { bandmates: bandmateId } },
          { new: true }
        ).populate("bandmates");

        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
