import axios, { AxiosRequestConfig } from "axios"
import { ApiErrorObject } from "types/apiResponse.type"
axios.defaults.withCredentials = true

export const AxiosAuthConfig: AxiosRequestConfig | undefined =
  typeof window !== "undefined"
    ? {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        withCredentials: true,
      }
    : undefined

export const AxiosErrorHandler = (e: unknown): ApiErrorObject => {
  if (axios.isAxiosError(e)) {
    return {
      error: {
        name: e.response?.data.name,
        issues: e.response?.data.issues,
        message: e.response?.data.message || e.response?.statusText,
        statusCode: e.response?.status,
      },
    }
  } else {
    return {
      error: {
        message: "Something went wrong",
      },
    }
  }
}
