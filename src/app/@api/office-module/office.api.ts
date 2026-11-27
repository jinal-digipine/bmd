import api from '../api'
import type { Office } from './office.types'

export const OfficeApis = {
    async list(
        page: number = 1,
        limit: number = 5,
        search?: string,
    ): Promise<Office.Apis.ListResponse> {
        const response = await api.get<Office.Apis.ListResponse>(
            '/office/all',
            {
                params: { page, limit, search },
            },
        )
        return response.data
    },

    async get(id: Office.Id): Promise<Office.Apis.GetResponse> {
        const response = await api.get<Office.Apis.GetResponse>(`/office/${id}`)
        return response.data
    },
    async create(
        data: Office.Apis.Create,
    ): Promise<Office.Apis.CreateResponse> {
        const response = await api.post<Office.Apis.CreateResponse>(
            '/office/create',
            data,
        )
        return response.data
    },
    async delete(id: Office.Id): Promise<Office.Apis.DeleteResponse> {
        const response = await api.delete<Office.Apis.DeleteResponse>(
            `/office/${id}`,
        )

        return response.data
    },
}
