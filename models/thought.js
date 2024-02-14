const { Schema, model } = require('mongoose');
const { reactionSchema } = require('./reaction'); 

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    userName: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema], 
});

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

thoughtSchema.virtual('formattedCreatedAt').get(function() {
    return this.createdAt.toLocaleString();
});

const Thought = model('Thought', thoughtSchema);

module.exports = { Thought };