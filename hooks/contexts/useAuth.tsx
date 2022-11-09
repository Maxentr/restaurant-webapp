"use client"

import React, { createContext, useContext, useState } from "react"
import { User } from "../../types/user.types"
import {
  logout as requestLogout,
  refreshToken,
} from "../../services/auth.service"
import jwt_decode from "jwt-decode"

type AuthContextInterface = {
  connectedUser: User | null
  accessToken: string | null
  refreshConnectedUser: () => Promise<void>
  // eslint-disable-next-line no-unused-vars
  newConnectedUser: (user: User, token: string) => void
  logout: () => Promise<void>
}

const AuthContext = createContext({} as AuthContextInterface)

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [connectedUser, setUser] = useState<User | null>(null)
  const [accessToken, setAccessToken] = useState<string | null>(null)

  const newConnectedUser = (user: User, token: string) => {
    setUser(user)
    setAccessToken(token)
  }

  const refreshConnectedUser = async () => {
    const accessToken = await refreshToken()
    setAccessToken(accessToken)
    const decoded: User = jwt_decode(accessToken)
    setUser(decoded)
  }

  const logout = async () => {
    await requestLogout()
    setUser(null)
    setAccessToken(null)
  }

  return (
    <AuthContext.Provider
      value={{
        connectedUser,
        accessToken,
        newConnectedUser,
        refreshConnectedUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
export default AuthProvider
