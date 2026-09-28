/* eslint-disable @typescript-eslint/no-namespace */
interface TPagination {
    page: number
    limit: number
    total: number
}

export namespace Response {
    export interface Normal<T> {
        error: boolean
        message: string
        data: T
    }

    export interface Paginated<T> {
        message: string
        data: T[]
        pagination: TPagination
    }
}
