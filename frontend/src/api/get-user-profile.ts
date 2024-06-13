import { api } from '@/lib/axios'

import { UserDTO } from './dtos/user-dto'

interface GetUserProfileResponse {
  user: UserDTO
}

export async function getUserProfile() {
  const response = await api.get<GetUserProfileResponse>('/users/me')

  return response.data.user
}
