/* eslint-disable @typescript-eslint/no-namespace */
import type { VSId } from '@void-snippets/core'
import type { User } from '../user/user.types'
import type { OfficeDepartment } from '../office-department-module/officeDepartment.types'
import type { Slot } from '../slot-module/slot.types'
import type { Birth } from '../birth-module/birth.types'
import type { Marriage } from '../marriage-module/marriage.types'
import type { Death } from '../death-module/death.types'
import type { Response } from '../apiLayer.type'

export namespace Application {
    export type Id = VSId<string, 'Application'>

    export enum EStatus {
        PENDING = 'pending',
        ACCEPTED = 'accepted',
        REJECTED = 'rejected',
    }
    export enum EService {
        BIRTH = 'birth',
        MARRIAGE = 'marriage',
        DEATH = 'death',
    }

    export interface Base {
        _id: Id
        userId: User.Id //ref of user
        applicationNumber: string
        clerkId: User.Id //ref of user
        officeDepartmentId: OfficeDepartment.Id //ref of officedepartment
        slotId: Slot.Id //ref of slot
        serviceId: Birth.Id | Marriage.Id | Death.Id //ref of service
        serviceType: EService //enum
        status: EStatus.PENDING //enum
        remark: string
        createdAt: string
        updatedAt: string
    }

    export type Detail = Omit<
        Base,
        'userId' | 'clerkId' | 'slotId' | 'serviceId' | 'officedepartmentId'
    > & {
        userId: User.Detail
        clerkId: User.Detail
        slotId: Slot.Detail
        officeDepartmentId: OfficeDepartment.Detail
        serviceId: Birth.Detail | Marriage.Detail | Death.Detail
    }

    export type List = Detail[]

    export namespace Apis {
        export interface Create {
            userId: User.Id
            applicationNumber: string
            clerkId: User.Id
            officeDepartmentId: OfficeDepartment.Id
            slotId: Slot.Id
            serviceId: Birth.Id | Marriage.Id | Death.Id
            serviceType: EService
            status: EStatus.PENDING
            // remark: string;
        }

        //clerk will update this data on each application.
        export interface Update {
            serviceId: Birth.Id | Marriage.Id | Death.Id
            status?: EStatus
            remark?: string
        }
        export type CreateResponse = Response.Normal<Detail>
        export type UpdateResponse = Response.Normal<Detail>
        export type GetResponse = Response.Normal<Detail>
        export type ListResponse = Response.Paginated<Detail>
    }
}
