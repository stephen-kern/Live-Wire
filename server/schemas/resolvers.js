// Import Auth Error from Apollo
const { AuthenticationError } = require("apollo-server-express");
// Import Models
const { User, Review } = require("../models");
// Import sign token function from our utilities
const { signToken } = require("../utils/auth");

const resolvers = {
  // query for user data
  Query: {
    // Query Me (logged in user) through GraphQl
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
    // Query All Users through GraphQl
    users: async () => {
      return User.find()
        .select("-__v -password")
        .populate("reviews")
        .populate("bandmates");
    },
    // Query individual User through GraphQl
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select("-__v -password")
        .populate("reviews")
        .populate("bandmates");
    },
    // Query all reviews through GraphQl
    reviews: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Review.find(params).sort({ createdAt: -1 });
    },
    // Query individual reviews through GraphQl
    review: async (parent, { _id }) => {
      return Review.findOne({ _id });
    },
  },
  // mutations of user data for web functionality, including: login, addUser, saveReview and RemoveReview
  Mutation: {
    // login Mutation through GraphQl
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
    // mutation for adding users to database through GraphQl
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    // Can add reviews to the database through GraphQl
    postReview: async (parent, args, context) => {
      if (context.user) {
        const review = await Review.create({
          ...args,
          username: context.user.username,
        });
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { reviews: review._id } },
          { new: true }
        );

        return review;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    // Can remove reviews from the database through GraphQl (Not used in MVP)
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
    // Users can add comments to individual reviews through GraphQl
    addComment: async (parent, { reviewId, commentBody }, context) => {
      if (context.user) {
        const updatedReview = await Review.findOneAndUpdate(
          { _id: reviewId },
          {
            $push: {
              comments: { commentBody, username: context.user.username },
            },
          },
          { new: true, runValidators: true }
        );

        return updatedReview;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    // Add Bandmates to users bandmateList through GraphQl
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
