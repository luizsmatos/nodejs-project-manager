import { Express } from 'express'
import request from 'supertest'
import { prisma } from '@/infra/database/prisma/prisma'

export async function createAndAuthenticateUser(app: Express) {
  await request(app).post('/api/auth/register').send({
    name: 'Edgar Washington',
    email: 'nedzesa@sip.cr',
    password: '123456',
  })

  const response = await request(app).post('/api/auth/login').send({
    email: 'nedzesa@sip.cr',
    password: '123456',
  })

  const cookies = response.headers['set-cookie']
  const user = await prisma.user.findFirst()

  return { cookies, user }
}
