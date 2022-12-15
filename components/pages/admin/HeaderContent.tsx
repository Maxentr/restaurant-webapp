"use client"

import React from "react"
import { useAuth } from "hooks/contexts/useAuth"
import Link from "next/link"
import { ArrowRightOnRectangleIcon } from "@heroicons/react/20/solid"
import { useRouter } from "next/navigation"


const HeaderContent = () => {
  const router = useRouter()
  const { logout } = useAuth()

  const handleDisconnection = () => {
    logout()
    router.push("/login")
  }

  return (
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
}

export default HeaderContent
