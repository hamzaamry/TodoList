const express = require('express')
const router = express.Router()

const {
    getAllTodo,
    postCreateTodo,
    putUpdateTodo,
    deleteTodo,
} = require("../controllers/todo")


//Get all todo
router.get('/all' , getAllTodo ) 


//Post a new todo
router.post('/' , postCreateTodo) 


//delete a todo
router.delete('/:id' , deleteTodo)


//update a todo
router.put('/:id' , putUpdateTodo)

module.exports = router

