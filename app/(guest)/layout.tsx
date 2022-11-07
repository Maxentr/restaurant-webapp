"use client"

import { ShoppingCartIcon } from "@heroicons/react/20/solid"
import { ReactNode } from "react"
import Navbar from "../../components/ui/Navbar"
import { useCart } from "../../hooks/contexts/useCart"
import { useToast } from "../../hooks/contexts/useToast"

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
  const { addToast } = useToast()
  const { total, cart } = useCart()

  const handleShoppingCart = () => {
    addToast({
      title: "Montant du panier",
      message: `${total} €`,
      type: "info",
      duration: 8000,
    })

    cart.map((item, index) => {
      addToast({
        title: "Item: " + index,
        message: `${JSON.stringify(item)}`,
        type: "info",
        duration: 8000,
      })
    })
  }

  return (
    <div className="w-full h-full bg-gray-50">
      <nav className="sticky top-0 h-16 flex flex-grow flex-row items-center justify-between bg-gray-900 px-4">
        <h1 className="text-white font-medium text-xl">Restauration</h1>
        <div
          onClick={handleShoppingCart}
          className="flex flex-row gap-2 items-center cursor-pointer"
        >
          <ShoppingCartIcon className="fill-white w-4 h-4" />
          <p className="text-white font-medium">Panier</p>
        </div>
      </nav>
      <div className="w-full flex flex-col gap-8 bg-gray-50">
        <Navbar routes={routes} />
        {children}
      </div>
    </div>
  )
}

export default GuestLayout
