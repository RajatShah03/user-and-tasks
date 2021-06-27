const express = require('express')
const { getAllUsers } = require('../../controllers/users/getAllUsers')
const { getUser } = require('../../controllers/users/getUser')
const { createUser } = require('../../controllers/users/createUser')
const { deleteUser } = require('../../controllers/users/deleteUser')
const authenticate = require('../../auth/jwt-authorizer')

const router = express.Router()

router.get('/', authenticate, getAllUsers)

router.get('/:id', authenticate, getUser)

router.post('/', createUser)

router.delete('/:id', authenticate, deleteUser)

module.exports = router