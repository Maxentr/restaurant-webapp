"use client"

import { ReactNode } from "react"
import GuestHeader from "components/pages/GuestHeader"
import Header from "components/ui/Header"

type GuestLayoutProps = {
  children: ReactNode
}

const GuestLayout = ({ children }: GuestLayoutProps) => {
  return (
    <Header content={GuestHeader}>
      {children}
    </Header>
  )
}

export default GuestLayout
