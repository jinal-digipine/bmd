import api from '../api'
import type { User } from './user.types'

export const UserListApis = {
    async list(
        page: number = 1,
        limit: number = 5,
        search?: string,
    ): Promise<User.Apis.ListResponse> {
        const response = await api.get<User.Apis.ListResponse>('/user/all', {
            params: { page, limit, search },
        })
        return response.data
    },
}
