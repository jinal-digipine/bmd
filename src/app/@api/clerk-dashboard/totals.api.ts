import api from '../api'
import { User } from '../user/user.types'
import { TotalCount } from './totals.types'

export const TotalApis = {
    async list(id: User.Id): Promise<TotalCount.Apis.ListResponse> {
        const response = await api.get<TotalCount.Apis.ListResponse>(
            `/dashboard/clerk-dashboard?clerkId=${id}`,
        )
        return response.data
    },

    async getMonthlyCount(
        id: User.Id,
        year = new Date().getFullYear(),
    ): Promise<TotalCount.Apis.MonthlyApplicationResponse> {
        const res = await api.get<TotalCount.Apis.MonthlyApplicationResponse>(
            `/application/monthly-trend?clerkId=${id}&year=${year}`,
        )
        return res.data
    },
}
