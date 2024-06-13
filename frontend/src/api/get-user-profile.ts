import { api } from '@/lib/axios'

interface GetUserProfileResponse {
  user: {
    id: string
    name: string
    email: string
  }
}

export async function getUserProfile() {
  const response = await api.get<GetUserProfileResponse>('/users/me')

  return response.data.user
}
