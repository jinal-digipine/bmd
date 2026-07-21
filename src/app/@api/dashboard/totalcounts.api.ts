import api from '../api'
import { TotalCount } from './total.types'

export const TotalCountsApis = {
    async list(): Promise<TotalCount.Apis.ListResponse> {
        const response =
            await api.get<TotalCount.Apis.ListResponse>('/dashboard')
        return response.data
    },
}
