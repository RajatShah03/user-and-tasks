// Entry point
const cors = require('cors')
const dotenv = require('dotenv')
const express = require('express')

const config = require('./config')

dotenv.config()

// Routers & controllers
const authorize = require('./auth/authorize')
const users = require('./routes/api/users')
const tasks = require('./routes/api/tasks')

// App
const app = express()

// Express middlewares
app.use(cors())
app.use(express.json())

// // DB connection
// const { connectDB } = require('./db')
// connectDB()

// API endpoints
// open apis
app.post(config.endpoints.auth, authorize)
// protected apis
app.use(config.endpoints.users, users)
app.use(config.endpoints.tasks, tasks)

// Error handling
const errorHandler = require('./error/error-handler')
app.use(errorHandler)

module.exports = app