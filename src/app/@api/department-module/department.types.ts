/* eslint-disable @typescript-eslint/no-namespace */
import type { VSId } from '@void-snippets/core'
import type { Response } from '../apiLayer.type'

export namespace Department {
    export type Id = VSId<string, 'Department'>

    export interface Base {
        _id: Id
        name: string
        createdAt: string
        updatedAt: string
    }

    export type Detail = Base

    export type List = Detail[]

    export namespace Apis {
        export type GetResponse = Response.Normal<Detail>

        export type ListResponse = Response.Paginated<Detail>
    }
}
