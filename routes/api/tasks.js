const express = require('express')
const { getAllTasks } = require('../../controllers/tasks/getAllTasks')
const { createTask } = require('../../controllers/tasks/createTask')
const { deleteTask } = require('../../controllers/tasks/deleteTask')
const authenticate = require('../../auth/jwt-authorizer')

const router = express.Router()

router.get('/', authenticate, getAllTasks)

router.post('/', authenticate, createTask)

router.delete('/:id', authenticate, deleteTask)

module.exports = router