const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
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
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false
    }
);

reviewSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
})

const Review = model('Review', reviewSchema);

module.exports = Review;