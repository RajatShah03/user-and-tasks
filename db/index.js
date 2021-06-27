const mongoose = require('mongoose')

const connectDB = () => {
  mongoose.connect(
      process.env.MONGO_DB_URI,
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => console.log('DB connection established'))
    .catch(e => console.error(`DB connection failed Error: ${e}`))
}

const disconnectDB = () => {
  mongoose.connection.close()
    .then(() => console.log('DB connection terminated'))
    .catch(e => console.error(`DB termination failed Error: ${e}`))
}

const beforeTest = () => {
  beforeAll(async () => {
    await mongoose.connect(
      process.env.MONGO_DB_URI_TEST,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      }  
    )
  })
}

const afterTest = () => {
  afterAll(async () => {
    await mongoose.connection.db.dropDatabase()
    await mongoose.connection.close()
  })
}

module.exports = { connectDB, disconnectDB, beforeTest, afterTest }