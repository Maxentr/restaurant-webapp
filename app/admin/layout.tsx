"use client"

import React from "react"
import Header from "components/ui/Header"
import Navbar from "components/ui/Navbar"
import withAuth from "components/withAuth"
import HeaderContent from "../../components/pages/admin/HeaderContent"

const routes = [
  {
    path: "",
    name: "Dashboard",
  },
  {
    path: "menus",
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
  {
    path: "ingredients",
    name: "Ingrédients",
  },
]

type AdminLayoutProps = {
  children: React.ReactNode
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <Header content={<HeaderContent />}>
      <Navbar baseRoute="admin" routes={routes} />
      {children}
    </Header>
  )
}

export default withAuth(AdminLayout)
