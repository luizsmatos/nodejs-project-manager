import request from 'supertest'
import { faker } from '@faker-js/faker'
import { createAndAuthenticateUser } from '#/utils/create-and-authenticate-user'
import { app } from '../app'

describe('Create Project Controller (e2e)', () => {
  it('should return 201 on success', async () => {
    const { accessToken } = await createAndAuthenticateUser(app)

    const response = await request(app)
      .post('/projects')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: faker.lorem.word(5),
        description: faker.lorem.paragraph(),
      })

    expect(response.statusCode).toEqual(201)
    expect(response.body.project).toEqual(
      expect.objectContaining({ id: expect.any(String) }),
    )
  })

  it('should return 401 if no token is provided', async () => {
    const response = await request(app)
      .post('/projects')
      .send({
        name: faker.lorem.word(5),
        description: faker.lorem.paragraph(),
      })

    expect(response.statusCode).toEqual(401)
    expect(response.body).toEqual(
      expect.objectContaining({ message: 'Unauthorized' }),
    )
  })
})
