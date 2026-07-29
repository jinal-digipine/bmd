import api from '../api'
import type { Role } from './role.types'

export const RoleApis = {
    async list(): Promise<Role.Apis.ListResponse> {
        const response = await api.get<Role.Apis.ListResponse>('/role/all')
        return response.data
    },
    async get(id: Role.Id): Promise<Role.Apis.GetResponse> {
        const response = await api.get<Role.Apis.GetResponse>(`/role/${id}`)
        return response.data
    },
    async create(data: Role.Apis.Create): Promise<Role.Apis.CreateResponse> {
        const response = await api.post<Role.Apis.CreateResponse>(
            '/role/create',
            data,
        )

        return response.data
    },
}
