const router = require('express').Router(); 

const {
    getAllUsers, 
    getUserById, 
    createUser,
    updateUser,
    deleteUser, 
    addFriend,
    removeFriend
} = require('../../controllers/user-controller'); 

// GET and POST users
router
.route('/')
.get(getAllUsers)
.post(createUser); 

// GET PUT and DELETE single user by id
router
.route('/:id')
.get(getUserById)
.put(updateUser)
.delete(deleteUser); 

// POST and DELETE friends
router
.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(removeFriend); 

module.exports = router; 