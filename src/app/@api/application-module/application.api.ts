import api from '../api'
import type { Application } from './application.types'

export const ApplicationApis = {
    async list(
        page?: number,
        limit?: number,
        search?: string,
        status?: string,
    ): Promise<Application.Apis.ListResponse> {
        const response = await api.get<Application.Apis.ListResponse>(
            '/application/all',
            {
                params: { page, limit, search, status },
            },
        )
        return response.data
    },

    async get(id: Application.Id): Promise<Application.Apis.GetResponse> {
        const response = await api.get<Application.Apis.GetResponse>(
            `/application/${id}`,
        )
        return response.data
    },
    async create(
        data: Application.Apis.Create,
    ): Promise<Application.Apis.CreateResponse> {
        const response = await api.post<Application.Apis.CreateResponse>(
            '/application/create',
            data,
        )
        return response.data
    },
    async update(
        id: Application.Id,
        data: Application.Apis.Update,
    ): Promise<Application.Apis.UpdateResponse> {
        const response = await api.patch<Application.Apis.UpdateResponse>(
            `/application/${id}`,
            data,
        )
        return response.data
    },
}
