/* eslint-disable @typescript-eslint/no-namespace */
import type { VSId } from '@void-snippets/core'
import type { Office } from '../office-module/office.types'
import type { Department } from '../department-module/department.types'
import type { Response } from '../apiLayer.type'

export namespace OfficeDepartment {
    export type Id = VSId<string, 'OfficeDepartment'>

    export interface Base {
        _id: Id
        officeId: Office.Id //ref of office
        departmentId: Department.Id //ref of department
        createdAt: string
        updatedAt: string
    }

    export type Detail = Omit<Base, 'officeId' | 'departmentId'> & {
        officeId: Office.Detail
        departmentId: Department.Base
    }

    export type List = Detail[]

    export namespace Apis {
        export interface Create {
            officeId: string
            departmentId: string
        }
        export interface Update {
            officeId?: string
            departmentId?: string
        }

        export type CreateResponse = Response.Normal<Detail>
        export type UpdateResponse = Response.Normal<Detail>
        export type GetResponse = Response.Normal<Detail>
        export type DeleteResponse = Response.Normal<null>

        export type ListResponse = Response.Normal<Detail>
    }
}
