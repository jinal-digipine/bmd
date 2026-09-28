/* eslint-disable @typescript-eslint/no-namespace */
import type { VSId } from '@void-snippets/core'
import type { District } from '../district-module/district.types'
import type { Response } from '../apiLayer.type'

export namespace Office {
    export type Id = VSId<string, 'Office'>

    export interface Base {
        _id: Id
        name: string
        districtId: District.Id //ref of district
        createdAt: string
        updatedAt: string
    }

    export type Detail = Omit<Base, 'districtId'> & {
        districtId: District.Detail
    }

    export type List = Detail[]

    export namespace Apis {
        export interface Create {
            name: string
            districtId: string
        }

        export type CreateResponse = Response.Normal<Detail>
        export type GetResponse = Response.Normal<Detail>
        export type DeleteResponse = Response.Normal<null>
        export type ListResponse = Response.Paginated<Detail>
    }
}
