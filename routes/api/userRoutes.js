const { User } = require('../../models');

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find({})
                .select('-__v');
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .select('-__v');

            !user
                ? res.status(404).json({ message: 'No user is associated with that ID' })
                : res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createUser(req, res) {
        try {
            const user = User.create(
                {
                    "username": req.body,
                    "email": req.body,
                }
            );
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
};