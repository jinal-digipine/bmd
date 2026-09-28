/* eslint-disable @typescript-eslint/no-namespace */
import type { VSId } from '@void-snippets/core'
import type { Response } from '../apiLayer.type'

export namespace Aadhar {
    export type Id = VSId<string, 'Aadhar'>

    export enum EGender {
        MALE = 'male',
        FEMALE = 'female',
        OTHER = 'other',
    }

    export interface Base {
        _id: Id
        aadharNumber: string
        firstName: string
        middleName: string
        lastName: string
        email: string
        contact: string
        dob: string
        gender: EGender
        photo: string
        address: string
        street: string
        city: string
        taluka: string
        district: string
        state: string
        pinCode: string
        createdAt: string
        updatedAt: string
    }

    export type Detail = Base

    export type List = Base[]
    export namespace Apis {
        //read only
        export type GetResponse = Response.Normal<Detail>
        export type ListResponse = Response.Normal<List>
    }
}
