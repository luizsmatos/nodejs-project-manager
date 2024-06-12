import request from 'supertest'
import { faker } from '@faker-js/faker'
import { createAndAuthenticateUser } from '#/utils/create-and-authenticate-user'
import { app } from '../app'

describe('List User Projects Controller (e2e)', () => {
  it('should return 200 on success', async () => {
    const { accessToken } = await createAndAuthenticateUser(app)

    await request(app)
      .post('/projects')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: faker.lorem.word(5),
        description: faker.lorem.paragraph(),
      })

    await request(app)
      .post('/projects')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: faker.lorem.word(5),
        description: faker.lorem.paragraph(),
      })

    const response = await request(app)
      .get('/projects')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.projects).toHaveLength(2)
  })
})
