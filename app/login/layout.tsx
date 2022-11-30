"use client"

import { HomeIcon } from "@heroicons/react/20/solid"
import Link from "next/link"
import { ReactNode } from "react"
import Header from "components/ui/Header"

type GuestLayoutProps = {
  children: ReactNode
}

const HeaderContent = (
  <>
    <Link
      href="/admin"
      className="flex flex-row gap-2 items-center cursor-pointer"
    >
      <h1 className="text-white font-medium text-xl">Restauration</h1>
    </Link>
    <Link href="/" className="flex flex-row gap-2 items-center cursor-pointer">
      <HomeIcon className="fill-white w-5 h-5" />
      <p className="text-white font-medium">
        Retourner à la page d&apos;accueil
      </p>
    </Link>
  </>
)

const GuestLayout = ({ children }: GuestLayoutProps) => {
  return <Header content={HeaderContent}>{children}</Header>
}

export default GuestLayout
