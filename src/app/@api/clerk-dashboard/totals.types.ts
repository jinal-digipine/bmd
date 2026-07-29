/* eslint-disable @typescript-eslint/no-namespace */

export namespace TotalCount {
    export interface Base {
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
