const { Schema, ObjectId } = require('mongoose')


const reactionSchema = new Schema (
{
    reactionId: {
        type: Schema.Types.ObjectId,
        default: ObjectId,
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280,
    },
    userName: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

reactionSchema.virtual('formattedCreatedAt').get(function () {
    return this.createdAt.toLocaleString();
});

module.exports = { reactionSchema };