const {User} = require('../models');
const {db} = require('../models/User');

const userController = {

    // get all users
    getAllUsers(req, res) {
        User.find({})
        .populate({
            path: 'thoughts', 
            select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err); 
            res.status(400).json(err);
        });  
    }, 

    // get user by id 
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate({
            path: 'thoughts', 
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this ID' }); 
                return; 
            }
            res.json(dbUserData); 
        })
        .catch(err => {
            console.log(err); 
            res.status(400).json(err); 
        });
    },

    // create user
    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err)); 
    }, 

    // update user by id 
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, {new: true, runValidators: true })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this ID' }); 
                return; 
            }
            res.json(dbUserData); 
        })
        .catch(err => res.status(400).json(err)); 
    }, 

    // delete user 
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this ID' }); 
                return; 
            }
            res.json(dbUserData); 
        })
        .catch(err => res.status(400).json(err)); 
    }, 

    // add friend to user
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId }, 
            { $push: { friends: req.params.friendId } }, 
            { new: true, runValidators: true }
        )
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this ID' }); 
                return; 
            }
            res.json(dbUserData); 
        })
        .catch(err => res.status(400).json(err)); 
    }, 

    // remove friend from user 
    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId }, 
            { $pull: { friends: req.params.friendId }}, 
            { new: true }
        )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err)); 
    }
}; 

module.exports = userController;