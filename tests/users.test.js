const request = require('supertest')
const app = require('../server')
const config = require('../config')
const { beforeTest, afterTest } = require('../db')
const testMocks = require('../mocks/test-objects')

const USERFLOW = {
  title: 'Test User Flow',
  create: 'should create a new user',
  get: 'should get a user by id',
  getAll: 'should get all the users',
  delete: 'should delete a user'
}

beforeTest()

describe(USERFLOW.title, () => {
  
  it(USERFLOW.create, async () => {
    const res = await request(app)
      .post(config.endpoints.users)
      .send(testMocks.users.forUsers)
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('_id')
    expect(res.body).toHaveProperty('email')

    const token = await request(app)
      .post(config.endpoints.auth)
      .send(testMocks.users.forUsers)
    
    const user = await request(app)
      .get(`${config.endpoints.users}/${res.body._id}`)
      .set({ Authorization: `Bearer ${token.body.accessToken}` })
      .send()
    expect(user.statusCode).toBe(200)
    expect(user.body).toHaveProperty('_id')

    const users = await request(app)
      .get(config.endpoints.users)
      .set({ Authorization: `Bearer ${token.body.accessToken}` })
      .send()
    expect(users.statusCode).toBe(200)
    expect(Array.isArray(users.body)).toBeTruthy()
    expect(users.body[0]).toHaveProperty('_id')

    const del = await request(app)
      .delete(`${config.endpoints.users}/${users.body[0]._id}`)
      .set({ Authorization: `Bearer ${token.body.accessToken}` })
      .send()
    expect(del.statusCode).toEqual(200)
  })

})

afterTest()