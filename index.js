const server = require('./server')
const config = require('./config')

// DB connection
const { connectDB } = require('./db')
connectDB()

// Server
const PORT = process.env.NODE_PORT || config.fallbackPORT

server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
})