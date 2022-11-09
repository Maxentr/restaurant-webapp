import axios from "axios"

const API_ROUTE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth`

export const login = async (
  email: string,
  password: string,
): Promise<string> => {
  const response = await axios.post(`${API_ROUTE_URL}/login`, {
    email,
    password,
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
