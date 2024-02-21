const { User } = require('../models');

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
    async addFriend(req, res) {
        try {
            const user = await User.findById(req.params.userId); 
            if (!user) {
                return res.status(404).json({ message: 'No user associated with this ID' });
            }
    
            const friendId = req.params.friendId; 
            const friend = await User.findById(friendId);
            if (!friend) {
                return res.status(404).json({ message: 'No friend associated with this ID' });
            }

            user.friends.push(friend);
    
            await user.save();
    
            res.json(user);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },
    async deleteFriend(req, res) {
        try {
            const user = await User.findById(req.params.userId);
            if (!user) {
                return res.status(404).json({ message: 'No user associated with this ID' });
            }

            const friendId = req.params.friendId; 
            const friendIndex = user.friends.indexOf(friendId);

            if (friendIndex === -1) {
                return res.status(404).json({ message: 'Friend not found in the user\'s friend list' });
            }

            user.friends.splice(friendIndex, 1);

            await user.save();

            res.json(user);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
};
