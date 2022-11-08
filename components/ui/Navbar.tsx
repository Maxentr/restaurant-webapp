"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export type NavbarProps = {
  baseRoute?: string
  routes: {
    path: string
    name: string
  }[]
}

const Navbar = ({ baseRoute, routes }: NavbarProps) => {
  const pathname = usePathname()

  return (
    <div className="w-full flex flex-row gap-4 justify-center mt-10">
      {routes.map(({ path, name }) => {
        let route =
          (baseRoute ? `/${baseRoute}` : "") + (path ? `/${path}` : "")
        if (!route) route = "/"

        return (
          <div
            key={path + name}
            className={pathname == route ? "border-b border-gray-900" : ""}
          >
            <Link href={route}>{name}</Link>
          </div>
        )
      })}
    </div>
  )
}

export default Navbar
