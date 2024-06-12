import { api } from '@/lib/axios'

export interface AuthenticateUserBody {
  email: string
  password: string
}

export async function authenticateUser({
  email,
  password,
}: AuthenticateUserBody) {
  await api.post('/auth/login', { email, password })
}
