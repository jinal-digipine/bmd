/* eslint-disable @typescript-eslint/no-namespace */
import type { VSId } from '@void-snippets/core'
import type { Response } from '../apiLayer.type'

export namespace Role {
    export type Id = VSId<string, 'Role'>

    export enum ERole {
        ADMIN = 'admin',
        CLERK = 'clerk',
        USER = 'user',
    }

    export interface Base {
        _id: Id
        name: ERole //enum
        createdAt: string
        updatedAt: string
    }
    export type Detail = Base

    export type List = Detail[]

    export namespace Apis {
        export interface Create {
            name: string
        }
        export interface Update {
            name?: string
        }
        export type CreateResponse = Response.Normal<Detail>
        export type GetResponse = Response.Normal<Detail>
        export type ListResponse = Response.Normal<Detail>
    }
}
