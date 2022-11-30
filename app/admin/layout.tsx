"use client"

import { ArrowRightOnRectangleIcon } from "@heroicons/react/20/solid"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React from "react"
import Header from "components/ui/Header"
import Navbar from "components/ui/Navbar"
import withAuth from "components/withAuth"
import { useAuth } from "hooks/contexts/useAuth"

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
  const router = useRouter()
  const { logout } = useAuth()

  const handleDisconnection = () => {
    logout()
    router.push("/login")
  }

  const HeaderContent = (
    <>
      <Link
        href="/admin"
        className="flex flex-row gap-2 items-center cursor-pointer"
      >
        <h1 className="text-white font-medium text-xl">Restauration</h1>
      </Link>
      <div
        onClick={handleDisconnection}
        className="flex flex-row gap-2 items-center cursor-pointer"
      >
        <ArrowRightOnRectangleIcon className="fill-white w-5 h-5" />
        <p className="text-white font-medium whitespace-nowrap">
          Se déconnecter
        </p>
      </div>
    </>
  )

  return (
    <Header content={HeaderContent}>
      <Navbar baseRoute="admin" routes={routes} />
      {children}
    </Header>
  )
}

export default withAuth(AdminLayout)
