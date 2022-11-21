"use client"

import { ArrowRightOnRectangleIcon } from "@heroicons/react/20/solid"
import { useRouter } from "next/navigation"
import React from "react"
import Navbar from "../../components/ui/Navbar"
import withAuth from "../../components/withAuth"
import { useAuth } from "../../hooks/contexts/useAuth"

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

  return (
    <div className="absolute inset-0">
      <div className="w-full h-full bg-gray-50">
        <nav className="sticky top-0 h-16 flex flex-grow flex-row items-center justify-between bg-gray-900 px-4">
          <h1 className="text-white font-medium text-xl">Administration</h1>
          <div
            onClick={handleDisconnection}
            className="flex flex-row gap-2 items-center cursor-pointer"
          >
            <ArrowRightOnRectangleIcon className="fill-white w-5 h-5" />
            <p className="text-white font-medium whitespace-nowrap">Se déconnecter</p>
          </div>
        </nav>
        <div className="w-full flex flex-col gap-8 bg-gray-50">
          <Navbar baseRoute="admin" routes={routes} />
          {children}
        </div>
      </div>
    </div>
  )
}

export default withAuth(AdminLayout)
