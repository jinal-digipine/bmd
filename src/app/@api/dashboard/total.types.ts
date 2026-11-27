/* eslint-disable @typescript-eslint/no-namespace */
export namespace TotalCount {
    export interface Base {
        totalUsers: number
        totalClerks: number
        totalStates: number
        totalDistricts: number
        totalOffices: number
        totalDepartments: number
        totalApplications: number
        approvedApplications: number
        pendingApplications: number
        rejectedApplications: number
    }

    export interface MonthlyVal {
        month: string
        count: number
    }

    export namespace Apis {
        export type ListResponse = Base
        export type MonthlyApplicationResponse = MonthlyVal[]
    }
}
