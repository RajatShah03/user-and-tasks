const request = require('supertest')
const app = require('../server')
const config = require('../config')
const { beforeTest, afterTest } = require('../db')
const testMocks = require('../mocks/test-objects')

const AUTHFLOW = {
  title: 'Test Auth Flow',
  authenticate: 'should authenticate a user'
}

beforeTest()

describe(AUTHFLOW.title, () => {

  it(AUTHFLOW.authenticate, async () => {
    await request(app)
      .post(config.endpoints.users)
      .send(testMocks.users.forAuth)
    const res = await request(app)
      .post(config.endpoints.auth)
      .send(testMocks.users.forAuth)
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('accessToken')
  })

})

afterTest()