import axios from "axios"
import { ApiResponse } from "../types/apiResponse.type"

const API_ROUTE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth`

export const login = async (
  email: string,
  password: string,
): ApiResponse<{ accessToken: string }> => {
  try {
    const response = await axios.post(`${API_ROUTE_URL}/login`, {
      email,
      password,
    })
    return { data: response.data }
  } catch (e) {
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
}

export const verifyAccessToken = async (
  accessToken: string,
): Promise<boolean> => {
  const response = await axios.post(`${API_ROUTE_URL}/verify`, {
    accessToken,
  })
  return response.data
}

// Return a new access token
export const refreshToken = async (): Promise<string> => {
  const response = await axios.get(`${API_ROUTE_URL}/refresh`)
  return response.data
}

export const logout = async (): Promise<void> => {
  await axios.get(`${API_ROUTE_URL}/logout`)
}
