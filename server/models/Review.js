// Import packages/functionality
const { Schema, model } = require("mongoose");
// Import other schema/model
const commentSchema = require("./Comment");
// Import date formatting functionality from utilities
const dateFormat = require("../utils/dateFormat");

// Create review Schema/Model
const reviewSchema = new Schema(
  {
    reviewText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 1250,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    location: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    comments: [commentSchema],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);

// Create comment Count virtual rule based on how many comments a review has
reviewSchema.virtual("commentCount").get(function () {
  return this.comments.length;
});

// Set Review model Name and the schema
const Review = model("Review", reviewSchema);

// Export Reviews
module.exports = Review;
