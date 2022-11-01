import React from "react"
import Navbar from "../components/ui/Navbar"

const routes = [
  {
    path: "/admin",
    name: "Dashboard",
  },
  {
    path: "/admin/menus",
    name: "Menus",
  },
  {
    path: "/admin/dishes",
    name: "Plats",
  },
  {
    path: "/admin/drinks",
    name: "Boissons",
  },
  {
    path: "/admin/ingredients",
    name: "Ingrédients",
  },
]

type AdminLayoutProps = {
  children: React.ReactNode
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="w-full h-full bg-gray-50">
      <nav className="sticky top-0 h-16 flex flex-grow flex-row items-center justify-between bg-gray-900 px-4">
        <h1 className="text-white font-medium text-xl">Administration</h1>
      </nav>
      <div className="w-full flex flex-col gap-8 bg-gray-50">
        <Navbar routes={routes} />
        {children}
      </div>
    </div>
  )
}

export default AdminLayout
