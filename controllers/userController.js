const { User } = require('../../models');

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find({}).select('-__v');
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId }).select('-__v');

            !user
                ? res.status(404).json({ message: 'No user is associated with that ID' })
                : res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createUser(req, res) {
        try {
            const user = await User.create({
                username: req.body.username,
                email: req.body.email,
            });
            res.json(user);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },

    async updateUser(req, res) {
        try {
            const user = await User.findByIdAndUpdate(
                req.params.userId,
                {
                    username: req.body.username,
                    email: req.body.email,
                },
                { new: true }
            );
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteUser(req, res) {
        try {
            const user = await User.findByIdAndDelete(req.params.userId);
            res.json(user);
        } catch (err) {
            res.status(404).json({ message: 'No user associated with this ID' });
        }
    },
};
