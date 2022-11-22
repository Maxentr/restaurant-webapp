import { ShoppingCartIcon } from "@heroicons/react/20/solid"
import Link from "next/link"
import React from "react"

const GuestHeader = (
  <>
    <Link href="/" className="flex flex-row gap-2 items-center cursor-pointer">
      <h1 className="text-white font-medium text-xl">Restauration</h1>
    </Link>
    <Link
      href="/cart"
      className="flex flex-row gap-2 items-center cursor-pointer"
    >
      <ShoppingCartIcon className="fill-white w-4 h-4" />
      <p className="text-white font-medium">Panier</p>
    </Link>
  </>
)

export default GuestHeader
