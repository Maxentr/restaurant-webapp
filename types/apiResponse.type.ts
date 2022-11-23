export type ApiError = {
  name?: string
  issues?: string[]
  message?: string
  statusCode?: number
}

export type ApiErrorObject = {
  error: ApiError
}

export type ApiResponse<T> = Promise<{ error: ApiError } | { data: T }>
