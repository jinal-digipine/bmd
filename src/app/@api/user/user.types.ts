/* eslint-disable @typescript-eslint/no-namespace */
import type { VSId } from '@void-snippets/core'
import type { Aadhar } from '../aadhar/aadhar.types'
import type { Role } from '../roles/role.types'
import type { Response } from '../apiLayer.type'
import { Office } from '../office-module/office.types'
import { Department } from '../department-module/department.types'
import { OfficeDepartment } from '../office-department-module/officeDepartment.types'

export namespace User {
    export type Id = VSId<string, 'User'>

    export enum EStatus {
        ACTIVE = 'active',
        PENDING = 'pending',
        BLOCKED = 'blocked',
    }
    export interface Base {
        _id: Id
        roleId: Role.Id //ref of roles
        aadharId: Aadhar.Id //ref of aadhar
        officeDepartmentId: OfficeDepartment.Id //ref of officeDepartment
        employeeId: string | null
        email: string
        password: string
        status: EStatus | null //enum
        lastLoginAt: Date | null
        lastAssignedAt: Date | null
        //doc
        aadharCard: string | null
        signature: string | null
        govEmployeeIdCard: string | null
        createdAt: string
        updatedAt: string
    }

    export type Detail = Omit<
        Base,
        'roleId' | 'aadharId' | 'officeDepartmentId'
    > & {
        roleId: Role.Base
        aadharId: Aadhar.Base
        officeDepartmentId: OfficeDepartment.Detail
    }
    export type List = Detail[]

    export namespace Apis {
        export interface Create {
            roleId: Role.Id //ref of roles
            aadharId: Aadhar.Id //ref of aadhar
            //feild for clerk only so optional
            officeDepartmentId: OfficeDepartment.Id
            employeeId: string | null
            email: string
            password: string

            //doc
            aadharCard: string | null
            signature: string | null
            govEmployeeIdCard: string | null
        }

        export interface Update {
            status?: EStatus
            password?: string
        }
        export type CreateResponse = Response.Normal<Detail>
        export type UpdateResponse = Response.Normal<Detail>
        export type GetResponse = Response.Normal<Detail>
        export type DeleteResponse = Response.Normal<null>
        export type ListResponse = Response.Paginated<Detail>
    }
}
