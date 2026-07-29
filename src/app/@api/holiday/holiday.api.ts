import api from '../api'
import { Holiday } from './holiday.types'

export const HolidayApis = {
    async list(
        page: number = 1,
        limit: number = 5,
        search?: string,
    ): Promise<Holiday.Apis.ListResponse> {
        const response = await api.get<Holiday.Apis.ListResponse>(
            '/holiday/all',
            {
                params: { page, limit, search },
            },
        )
        return response.data
    },
    async get(id: Holiday.Id): Promise<Holiday.Apis.GetResponse> {
        const response = await api.get<Holiday.Apis.GetResponse>(
            `/holiday/${id}`,
        )
        return response.data
    },
    async create(
        data: Holiday.Apis.Create,
    ): Promise<Holiday.Apis.CreateResponse> {
        const response = await api.post<Holiday.Apis.CreateResponse>(
            '/holiday/create',
            data,
        )
        return response.data
    },
    async delete(id: Holiday.Id): Promise<Holiday.Apis.DeleteResponse> {
        const response = await api.delete<Holiday.Apis.DeleteResponse>(
            `/holiday/${id}`,
        )
        return response.data
    },
}
