const { Thought, reactionSchema } = require('../models');
const { User } = require('../models/user');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find({}).select('-__v');
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({_id: req.params.thoughtId}).select('-__v');
            
            !thought
                ? res.status(404).json({message: 'No thought is associated with this Id'})
                : res.json(thought);
            } catch (err) {
                res.status(500).json(err);
            }
    },
    async createThought(req, res) {
        try {
            const { thoughtText, userName, userId } = req.body;

            const thought = await Thought.create({ thoughtText, userName });

            const user = await User.findByIdAndUpdate(
                userId,
                { $push: { thoughts: thought._id } },
                { new: true }
            );

            res.json({ thought, user });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },
    async updateThought (req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                {
                    thoughtText: req.body.thoughtText
                },
                { new: true }
            );
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteThought (req, res) {
        try {
            const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
            res.json(thought);
        } catch (err) {
            res.status(404).json({ message: 'No associated thought with this Id'})
        }
    },
    async createReaction(req, res) {
        try {
            const { reactionBody, userName } = req.body;
            const { thoughtId } = req.params;

            const reaction = {
                reactionBody,
                userName,
            };

            const updatedThought = await Thought.findByIdAndUpdate(
                thoughtId,
                { $push: { reactions: reaction } },
                { new: true }
            );

            res.json(updatedThought);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    async deleteReaction(req, res) {
        try {
            const { thoughtId, reactionId } = req.params;

            const updatedThought = await Thought.findByIdAndUpdate(
                thoughtId,
                { $pull: { reactions: { reactionId } } },
                { new: true }
            );

            res.json(updatedThought);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },
};

