import { api } from '@/lib/axios'

import { UserDTO } from './dtos/user-dto'

interface GetUserByIdParams {
  userId: string
}

interface GetUserByIdResponse {
  user: UserDTO
}

export async function getUserById({ userId }: GetUserByIdParams) {
  const response = await api.get<GetUserByIdResponse>(`/users/${userId}`)

  return response.data.user
}
