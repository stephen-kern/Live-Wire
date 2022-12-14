const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const reviewSchema = new Schema(
    {
        reviewText: {
            type: String,
            required: true,
            max_length: 280
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        username: {
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