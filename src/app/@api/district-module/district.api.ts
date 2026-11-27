import api from '../api'
import type { District } from './district.types'

export const DistrictApis = {
    async list(
        page: number = 1,
        limit: number = 5,
        search?: string,
    ): Promise<District.Apis.ListResponse> {
        const response = await api.get<District.Apis.ListResponse>(
            '/district/all',
            {
                params: { page, limit, search },
            },
        )
        return response.data
    },
    async get(id: District.Id): Promise<District.Apis.GetResponse> {
        const response = await api.get<District.Apis.GetResponse>(
            `/district/${id}`,
        )
        return response.data
    },
    async create(
        data: District.Apis.Create,
    ): Promise<District.Apis.CreateResponse> {
        const response = await api.post<District.Apis.CreateResponse>(
            '/district/create',
            data,
        )
        return response.data
    },
    async delete(id: District.Id): Promise<District.Apis.DeleteResponse> {
        const response = await api.delete<District.Apis.DeleteResponse>(
            `/district/${id}`,
        )
        return response.data
    },
}
