// Import packages/functionality
const { Schema, Types } = require("mongoose");
// Import date formatting functionality from utilities
const dateFormat = require("../utils/dateFormat");

// Create Review Schema/Model
const commentSchema = new Schema(
  {
    commentBody: {
      type: String,
      required: true,
      maxlength: 1250,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

// Export Comment Schema
module.exports = commentSchema;
