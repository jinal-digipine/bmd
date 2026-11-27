/* eslint-disable @typescript-eslint/no-namespace */
import type { VSId } from '@void-snippets/core'
import type { State } from '../state-module/state.types'
import { Response } from '../apiLayer.type'

export namespace District {
    export type Id = VSId<string, 'District'>

    export interface Base {
        _id: Id
        name: string
        stateId: State.Id //ref of state
        createdAt: string
        updatedAt: string
    }
    export type Detail = Omit<Base, 'stateId'> & {
        stateId: State.Base
    }

    export type List = Detail[]

    export namespace Apis {
        export interface Create {
            name: string
            stateId: string
        }
        export interface Update {
            name?: string
            stateId?: string
        }
        export type CreateResponse = Response.Normal<Detail>
        export type GetResponse = Response.Normal<Detail>
        export type DeleteResponse = Response.Normal<null>
        export type ListResponse = Response.Paginated<Detail>
    }
}
