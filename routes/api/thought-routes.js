const router = require('express').Router(); 

const {
    getAllThoughts, 
    getThoughtById, 
    createThought,
    updateThought,
    deleteThought, 
    createReaction,
    deleteReaction
} = require('../../controllers/thought-controller'); 

// GET and POST thoughts
router
.route('/')
.get(getAllThoughts)
.post(createThought); 

// GET PUT and DELETE thought by id
router
.route('/:id')
.get(getThoughtById)
.put(updateThought)
.delete(deleteThought); 

// POST and DELETE reactions 
router
.route('/:thoughtId/reactions')
.post(createReaction)
.delete(deleteReaction); 


module.exports = router;