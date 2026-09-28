/* eslint-disable @typescript-eslint/no-namespace */
import type { VSId } from '@void-snippets/core'
import type { OfficeDepartment } from '../office-department-module/officeDepartment.types'
import type { Response } from '../apiLayer.type'

export namespace Slot {
    export type Id = VSId<string, 'Slot'>

    export interface Base {
        _id: Id
        officeDepartmentId: OfficeDepartment.Id //ref of officedepartment
        slotDate: Date
        startTime: string
        endTime: string
        maxCapacity: number
        bookedCount: number
        isAvailable: boolean
        createdAt: string
        updatedAt: string
    }
    export type Detail = Omit<Base, 'officeDepartmentId'> & {
        officeDepartmentId: OfficeDepartment.Detail
    }

    export type List = Detail[]

    //maybe its not needed
    export namespace Apis {
        export type GetDatePayload = {
            officedepartmentId?: string
            officeId?: string
            departmentId?: string
        }
        export type GetDatesResponse = Response.Normal<string[]>

        export type GetTimeSlotsPayload = {
            officedepartmentId?: string
            officeId: string
            departmentId: string
            slotDate: Date
        }

        export type GetTimeSlotsResponse = Response.Normal<Base[]>

        export type ListResponse = Response.Paginated<Detail>
    }
}
