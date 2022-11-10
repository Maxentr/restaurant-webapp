export type ApiError = {
  name?: string
  issues?: string[]
  message?: string
  statusCode?: number
}

export type ApiResponse<T> = Promise<{ error: ApiError } | { data: T }>
