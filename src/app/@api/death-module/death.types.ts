/* eslint-disable @typescript-eslint/no-namespace */
import type { VSId } from '@void-snippets/core'
import type { Aadhar } from '../aadhar/aadhar.types'
import type { Response } from '../apiLayer.type'
import { OfficeDepartment } from '../office-department-module/officeDepartment.types'
import { Slot } from '../slot-module/slot.types'

export namespace Death {
    export type Id = VSId<string, 'Death'>

    export enum EDeathType {
        NATURAL_DEATH = 'naturaldeath',
        UNNATURAL_DEATH = 'unnaturaldeath',
    }
    export interface Base {
        _id: Id
        deceasedAadharId: Aadhar.Id //ref of aadhar
        applicantAadharId: Aadhar.Id //ref of aadhar
        placeOfDeath: string
        deathDateandTime: string
        deceasedFatherName: string
        deceasedMotherName: string
        deathType: EDeathType //enum
        officeDepartmentId: OfficeDepartment.Id // ref of office department
        slotId: Slot.Id // ref of slot
        //doc
        deceasedAadharCard: string
        applicantAadharCard: string
        deceasedRationCard: string
        deceasedPhoto: string
        deceasedMedicalCertificate: string
        pmReport: string
        fir: string
        createdAt: string
        updatedAt: string
    }

    export type Detail = Omit<
        Base,
        'deceasedAadharId' | 'spouseAadharId' | 'officeDepartmentId' | 'slotId'
    > & {
        deceasedAadharId: Aadhar.Base
        applicantAadharId: Aadhar.Base
        officeDepartmentId: OfficeDepartment.Detail
        slotId: Slot.Detail
    }

    export type List = Detail[]

    export namespace Apis {
        export type CreatePayload = FormData

        export interface UpdatePayload {
            placeOfDeath?: string
            deathDateandTime?: string
            deathType?: EDeathType
            deceasedMotherName?: string
            deceasedFatherName?: string
        }
        export type CreateResponse = Response.Normal<Detail>
        export type UpdateResponse = Response.Normal<Detail>
        export type GetResponse = Response.Normal<Detail>
        export type ListResponse = Response.Normal<Detail>
    }
}
