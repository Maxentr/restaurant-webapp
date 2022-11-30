"use client"

import React, { createContext, useContext, useState } from "react"
import { User } from "types/user.types"
import { logout as requestLogout, refreshToken } from "services/auth.service"
import jwt_decode from "jwt-decode"

type AuthContextInterface = {
  connectedUser: User | null
  getAccessToken: () => string | null
  refreshConnectedUser: () => Promise<void>
  // eslint-disable-next-line no-unused-vars
  newAcessToken: (token: string) => void
  clearAccessToken: () => void
  logout: () => Promise<void>
}

const AuthContext = createContext({} as AuthContextInterface)

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [connectedUser, setUser] = useState<User | null>(null)

  const getAccessToken = () => {
    const accessToken = localStorage.getItem("accessToken")
    return accessToken
  }

  const decodeAndSetUser = (token: string) => {
    const decodedToken = jwt_decode(token) as User
    setUser(decodedToken)
  }

  const newAcessToken = (accessToken: string) => {
    localStorage.setItem("accessToken", accessToken)
    decodeAndSetUser(accessToken)
  }

  const refreshConnectedUser = async () => {
    const response = await refreshToken()
    if ("data" in response) {
      localStorage.setItem("accessToken", response.data)
      decodeAndSetUser(response.data)
    }
  }

  const clearAccessToken = () => {
    localStorage.removeItem("accessToken")
  }

  const logout = async () => {
    await requestLogout()
    setUser(null)
    localStorage.removeItem("accessToken")
  }

  return (
    <AuthContext.Provider
      value={{
        connectedUser,
        getAccessToken,
        newAcessToken,
        refreshConnectedUser,
        clearAccessToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
export default AuthProvider
