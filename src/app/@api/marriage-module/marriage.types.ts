/* eslint-disable @typescript-eslint/no-namespace */
import type { VSId } from '@void-snippets/core'
import type { Aadhar } from '../aadhar/aadhar.types'
import type { Response } from '../apiLayer.type'
import { OfficeDepartment } from '../office-department-module/officeDepartment.types'
import { Slot } from '../slot-module/slot.types'

export namespace Marriage {
    export type Id = VSId<string, 'Marriage'>

    export interface Base {
        _id: Id
        brideAadharId: Aadhar.Id //ref of aadhar
        groomAadharId: Aadhar.Id //ref
        witnessAadharId: Aadhar.Id //ref
        brahmanAadharId: Aadhar.Id //ref
        brideFatherName: string
        brideMotherName: string
        groomFatherName: string
        groomMotherName: string
        witnessRelation: string
        marriageDate: Date //~~~~~~~
        marriagePlace: string
        officeDepartmentId: OfficeDepartment.Id //ref from officedepartment
        slotId: Slot.Id // ref of slot
        //docs
        brideAadharCard: string
        groomAadharCard: string
        witnessAadharCard: string
        brahmanAadharCard: string
        brideRationCard: string
        groomRationCard: string
        bridePhoto: string
        groomPhoto: string
        invitationCard: string
        createdAt: string
        updatedAt: string
    }

    export type Detail = Omit<
        Base,
        | 'groomAadharId'
        | 'brideAadharId'
        | 'brahmanAadharId'
        | 'witnessAadharId'
        | 'officeDepartmentId'
        | 'slotId'
    > & {
        groomAadharId: Aadhar.Base
        brideAadharId: Aadhar.Base
        brahmanAadharId: Aadhar.Base
        witnessAadharId: Aadhar.Base
        officeDepartmentId: OfficeDepartment.Detail
        slotId: Slot.Detail
    }

    export type List = Detail[]

    export namespace Apis {
        export type CreatePayload = FormData

        export interface UpdatePayload {
            marriageDate?: string
            marriagePlace?: string
            brideMotherName?: string
            brideFatherName?: string
            groomMotherName?: string
            groomFatherName?: string
        }
        export type CreateResponse = Response.Normal<Detail>
        export type UpdateResponse = Response.Normal<Detail>
        export type GetResponse = Response.Normal<Detail>
        export type ListResponse = Response.Normal<Detail>
    }
}
