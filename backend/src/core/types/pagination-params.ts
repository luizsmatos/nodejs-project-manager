export interface PaginationParams {
  page: number
}

export interface PaginationResponse<T> {
  data: T[]
  meta: {
    page: number
    perPage: number
    totalCount: number
  }
}
