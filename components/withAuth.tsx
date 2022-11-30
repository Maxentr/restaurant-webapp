"use client"

import { useRouter } from "next/navigation"
import React, { ComponentType, useEffect, useState } from "react"
import { useAuth } from "hooks/contexts/useAuth"
import { verifyAccessToken } from "services/auth.service"

const withAuth = <P extends object>(
  WrappedComponent: ComponentType<P>,
): React.FC<P> => {
  // eslint-disable-next-line react/display-name
  return (props: unknown) => {
    const { getAccessToken, clearAccessToken } = useAuth()
    const router = useRouter()
    const [verified, setVerified] = useState(false)

    useEffect(() => {
      const verifyToken = async () => {
        const accessToken = getAccessToken()
        if (!accessToken) {
          router.replace("/login")
        } else {
          // we call the api that verifies the token.
          const response = await verifyAccessToken(accessToken)
          if ("data" in response) {
            // if token was verified we set the state.
            if (response.data) setVerified(response.data)
            else {
              clearAccessToken()
              router.replace("/login")
            }
          }
        }
      }
      verifyToken()
    }, [clearAccessToken, router])

    if (verified) {
      return <WrappedComponent {...(props as P)} />
    } else {
      return null
    }
  }
}

export default withAuth
