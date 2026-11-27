import api from '../api'
import type { OfficeDepartment } from './officeDepartment.types'

export const OfficeDepartmentApis = {
    async list(): Promise<OfficeDepartment.Apis.ListResponse> {
        const response = await api.get<OfficeDepartment.Apis.ListResponse>(
            '/office-department/all',
        )
        return response.data
    },
    async get(
        id: OfficeDepartment.Id,
    ): Promise<OfficeDepartment.Apis.GetResponse> {
        const response = await api.get<OfficeDepartment.Apis.GetResponse>(
            `/office-department/${id}`,
        )
        return response.data
    },

    async create(
        data: OfficeDepartment.Apis.Create,
    ): Promise<OfficeDepartment.Apis.CreateResponse> {
        const response = await api.post<OfficeDepartment.Apis.CreateResponse>(
            '/office-department/create',
            data,
        )
        return response.data
    },

    async update(
        id: OfficeDepartment.Id,
        data: OfficeDepartment.Apis.Update,
    ): Promise<OfficeDepartment.Apis.UpdateResponse> {
        const response = await api.patch<OfficeDepartment.Apis.UpdateResponse>(
            `/office-department/${id}`,
            data,
        )
        return response.data
    },

    async delete(
        id: OfficeDepartment.Id,
    ): Promise<OfficeDepartment.Apis.DeleteResponse> {
        const response = await api.delete<OfficeDepartment.Apis.DeleteResponse>(
            `/office-department/${id}`,
        )
        return response.data
    },
}
