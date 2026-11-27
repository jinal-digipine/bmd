import api from '../api'
import type { Birth } from './birth.types'

export const BirthApis = {
    async list(): Promise<Birth.Apis.ListResponse> {
        const response = await api.get<Birth.Apis.ListResponse>('/birth/all')
        return response.data
    },
    async get(id: Birth.Id): Promise<Birth.Apis.GetResponse> {
        const response = await api.get<Birth.Apis.GetResponse>(`/birth/${id}`)
        return response.data
    },
    async create(
        data: Birth.Apis.CreatePayload,
    ): Promise<Birth.Apis.CreateResponse> {
        const response = await api.post<Birth.Apis.CreateResponse>(
            '/birth/create',
            data,
        )
        return response.data
    },
    async update(
        id: Birth.Id,
        data: Birth.Apis.Update,
    ): Promise<Birth.Apis.UpdateResponse> {
        const response = await api.patch<Birth.Apis.UpdateResponse>(
            `/birth/${id}`,
            data,
        )
        return response.data
    },
}
