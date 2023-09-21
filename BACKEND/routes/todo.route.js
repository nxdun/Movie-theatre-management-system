const express = require('express')
const router = express.Router()
const ToDo = require('../models/ToDo')
const auth = require('../middleware/auth')

// @url           POST /todo/addtodo
// @description   add todo item
// @access-mode   private 
router.post('/addtodo', auth, async (req, res) => {
  try {
    const {message} = req.body
    const todo = {
      userID: req.user._id,
      message: message,
      complete: false,
      date: new Date()
    }
    const newTodo = new ToDo(todo)
    await newTodo.save()
    res.status(200).send({status: 'ToDo added', todo: newTodo})
  } catch (error) {
    res.status(500).send(error.message)
    console.log(error.message)
  }
})

// @url           GET /todo/gettodos
// @description   get incomplete todo items
// @access-mode   private
router.get('/gettodos', auth, async (req, res) => {
  try {
    const todos = await ToDo.find({userID: req.user._id})
    res.status(200).send({status: 'Fetched todos', todo: todos})
  } catch (error) {
    res.status(500).send(error.message)
    console.log(error.message)
  }
})

// @url           GET /todo/getcompletetodos
// @description   get completed todo items
// @access-mode   private
router.get('/getcompletetodos', auth, async (req, res) => {
  try {
    const todos = await ToDo.find({userID: req.user._id, complete: true})
    res.status(200).send({status: 'Fetched completed todos', todo: todos})
  } catch (error) {
    res.status(500).send(error.message)
    console.log(error.message)
  }
})

// @url           PUT /todo/markcomplete/:id
// @description   mark todo items as completed one
// @access-mode   private
router.put('/markcomplete', auth, async(req, res) => {
  try {
    const { itemID, complete } = req.body
    const todoItem = await ToDo.findByIdAndUpdate(itemID, {complete: complete})
    res.status(200).send({status: 'complete todo', item: todoItem})
  } catch (error) {
    res.status(500).send(error.message)
    console.log(error.message)
  }
})

// @url           PUT /todo/updatetodo/:id
// @description   update todo item
// @access-mode   private
router.put('/updatetodo/:id', auth, async(req, res) => {
  const todoID = req.params.id
  try {
    const {message} = req.body
    const todoItem = await ToDo.findOneAndUpdate({_id: todoID, message: message})
    res.status(200).send({status: 'Todo Updated', updatedTodo: todoItem})
  } catch (error) {
    res.status(500).send(error.message)
    console.log(error.message)
  }
})

// @url           DELETE /todo/updatetodo/:id
// @description   update todo item
// @access-mode   private
router.delete('/deletetodo/:id', auth, async(req, res) => {
  const todoID = req.params.id
  try {
      const deleteTodoItem = await ToDo.findByIdAndDelete(todoID)
      res.status(200).send({status: 'Todo Deleted', deletedTodo: deleteTodoItem})
  } catch (error) {
    res.status(500).send(error.message)
    console.log(error.message)
  }
})

// @url           DELETE /todo/deleteall
// @description   delete all todos
// @access-mode   private
router.delete('/deleteall', auth, async (req, res) => {
  try {
    await ToDo.deleteMany({userID: req.user.id})
    res.status(200).send({status: 'All ToDos deleted'})
  } catch (error) {
    res.status(500).send(error.message)
    console.log(error.message)
  }
})

module.exports = router