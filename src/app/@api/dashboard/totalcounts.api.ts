import api from '../api'
import { TotalCount } from './total.types'

export const TotalCountsApis = {
    async list(): Promise<TotalCount.Apis.ListResponse> {
        const response =
            await api.get<TotalCount.Apis.ListResponse>('/dashboard')
        return response.data
    },

    async getMonthlyCount(
        year: number = new Date().getFullYear(),
    ): Promise<TotalCount.Apis.MonthlyApplicationResponse> {
        const res = await api.get<TotalCount.Apis.MonthlyApplicationResponse>(
            `/application/monthly-trend?year=${year}`,
        )
        return res.data
    },
}
