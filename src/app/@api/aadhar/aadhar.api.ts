import api from '../api'
import type { Aadhar } from './aadhar.types'

export const AadharApis = {
    async list(): Promise<Aadhar.Apis.ListResponse> {
        const response = await api.get<Aadhar.Apis.ListResponse>('/aadhar/all')
        return response.data
    },

    async get(id: Aadhar.Id): Promise<Aadhar.Apis.GetResponse> {
        const response = await api.get<Aadhar.Apis.GetResponse>(`/aadhar/${id}`)
        return response.data
    },
}
