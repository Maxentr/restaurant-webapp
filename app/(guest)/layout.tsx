"use client"

import { ReactNode } from "react"
import GuestHeader from "../../components/pages/GuestHeader"
import Header from "../../components/ui/Header"
import Navbar from "../../components/ui/Navbar"

const routes = [
  {
    path: "",
    name: "Menus",
  },
  {
    path: "dishes",
    name: "Plats",
  },
  {
    path: "drinks",
    name: "Boissons",
  },
]

type GuestLayoutProps = {
  children: ReactNode
}

const GuestLayout = ({ children }: GuestLayoutProps) => {
  return (
    <Header content={GuestHeader}>
      <>
        <Navbar routes={routes} />
        {children}
      </>
    </Header>
  )
}

export default GuestLayout
