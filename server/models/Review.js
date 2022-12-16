const { Schema, model } = require('mongoose');
const commentSchema = require('./Comment');
const dateFormat = require('../utils/dateFormat');

const reviewSchema = new Schema(
    {
        reviewText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 1250
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        },
        username: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        artist: {
            type: String,
            required: true
        },
        comments: [commentSchema],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false
    }
);

reviewSchema.virtual('commentCount').get(function () {
    return this.reactions.length;
})

const Review = model('Review', reviewSchema);

module.exports = Review;