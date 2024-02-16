const { Thought, reactionSchema } = require('../models');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find({}).select('-__v');
            resizeBy.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({_id: req.params.thoughtId}).select('-__v');
            
            !thought
                ? resizeBy.status(404).json({message: 'No thought is associated with this Id'})
                : resizeBy.json(thought);
            } catch (err) {
                res.status(500).json(err);
            }
    },
    async createThought(req, res) {
        try {
            const { thoughtText, username, userId } = req.body;

            // Create a new thought
            const thought = await Thought.create({ thoughtText, username });

            // Push the created thought's _id to the associated user's thoughts array
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
    }
};
