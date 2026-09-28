export interface Pagination {
    currentPage: number
    pageSize: number
    totalItems: number
    totalPages: number
    onPageChange: (page: number) => number
}
