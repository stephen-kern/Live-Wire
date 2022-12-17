const {Schema, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const commentSchema = new Schema(
    {
        commentBody: {
            type: String,
            required: true,
            maxlength: 1250
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

module.exports = commentSchema;