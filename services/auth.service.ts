import axios from "axios"
import { ApiResponse } from "../types/apiResponse.type"
import { AxiosErrorHandler } from "../utils/axiosHelper"

const API_ROUTE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth`

export const login = async (
  email: string,
  password: string,
): ApiResponse<{ accessToken: string }> => {
  try {
    const { data } = await axios.post(`${API_ROUTE_URL}/login`, {
      email,
      password,
    })
    return { data: data }
  } catch (e) {
    return AxiosErrorHandler(e)
  }
}

export const verifyAccessToken = async (
  accessToken: string,
): ApiResponse<boolean> => {
  try {
    const { data } = await axios.post(`${API_ROUTE_URL}/verify`, {
      accessToken,
    })
    return { data }
  } catch (e) {
    return AxiosErrorHandler(e)
  }
}

// Return a new access token
export const refreshToken = async (): ApiResponse<string> => {
  try {
    const { data } = await axios.get(`${API_ROUTE_URL}/refresh`)
    return { data }
  } catch (e) {
    return AxiosErrorHandler(e)
  }
}

export const logout = async (): Promise<void> => {
  await axios.get(`${API_ROUTE_URL}/logout`)
}
