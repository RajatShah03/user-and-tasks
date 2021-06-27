const request = require('supertest')
const app = require('../server')
const config = require('../config')
const { beforeTest, afterTest } = require('../db')
const testMocks = require('../mocks/test-objects')

const TASKFLOW = {
  title: 'Test task Flow',
  create: 'should create a new task',
  getAll: 'should get all the tasks',
  delete: 'should delete a task'
}

beforeTest()

describe(TASKFLOW.title, () => {
  
  it(TASKFLOW.create, async () => {
    await request(app)
      .post(config.endpoints.users)
      .send(testMocks.users.forTasks)
    const token = await request(app)
      .post(config.endpoints.auth)
      .send(testMocks.users.forTasks)

    const res = await request(app)
      .post(config.endpoints.tasks)
      .set({ Authorization: `Bearer ${token.body.accessToken}` })
      .send(testMocks.tasks)
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('_id')
    expect(res.body).toHaveProperty('title')

    const tasks = await request(app)
      .get(config.endpoints.tasks)
      .set({ Authorization: `Bearer ${token.body.accessToken}` })
      .send()
    expect(tasks.statusCode).toEqual(200)
    expect(Array.isArray(tasks.body)).toBeTruthy()
    expect(tasks.body[0]).toHaveProperty('_id')
    expect(tasks.body[0]).toHaveProperty('title')
    
    const del = await request(app)
      .delete(`${config.endpoints.tasks}/${tasks.body[0]._id}`)
      .set({ Authorization: `Bearer ${token.body.accessToken}` })
      .send()
    expect(del.statusCode).toEqual(200)
  })

})

afterTest()