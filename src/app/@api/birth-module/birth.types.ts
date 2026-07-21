/* eslint-disable @typescript-eslint/no-namespace */
import type { VSId } from '@void-snippets/core'
import type { Aadhar } from '../aadhar/aadhar.types'
import type { Response } from '../apiLayer.type'
import { OfficeDepartment } from '../office-department-module/officeDepartment.types'
import { Slot } from '../slot-module/slot.types'

export namespace Birth {
    export type Id = VSId<string, 'Birth'>

    export enum EGender {
        MALE = 'male',
        FEMALE = 'female',
        OTHER = 'other',
    }

    export interface Base {
        _id: Id
        babyName: string
        birthDateandTime: string
        officeDepartmentId: OfficeDepartment.Id // ref of officedepartment
        birthPlace: string
        babyGender: EGender //enum
        babyWeight: number
        fatherAadharId: Aadhar.Id //ref of aadhar
        motherAadharId: Aadhar.Id //ref of aadhar
        slotId: Slot.Id //ref of slot
        //docs
        fatherAadharCard: string
        motherAadharCard: string
        marriageCertificate: string
        birthHospitalReport: string
        rationCard: string
        createdAt: string
        updatedAt: string
    }

    export type Detail = Omit<
        Base,
        'fatherAadharId' | 'motherAadharId' | 'officeDepartmentId' | 'slotId'
    > & {
        fatherAadharId: Aadhar.Base
        motherAadharId: Aadhar.Base
        officeDepartmentId: OfficeDepartment.Detail
        slotId: Slot.Detail
    }

    export type List = Detail[]

    export namespace Apis {
        export type CreatePayload = FormData

        export interface Update {
            babyName?: string
            birthDateandTime?: string
            babyWeight?: number
            babyGender?: string
            birthPlace?: string
        }
        export type CreateResponse = Response.Normal<Detail>
        export type UpdateResponse = Response.Normal<Detail>
        export type GetResponse = Response.Normal<Detail>
        export type ListResponse = Response.Normal<Detail>
    }
}
