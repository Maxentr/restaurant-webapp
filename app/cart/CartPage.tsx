"use client"

import { ShoppingCartIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { useCart } from "../../hooks/contexts/useCart"
import useDrink from "../../hooks/services/useDrink"
import useMenu from "../../hooks/services/useMenu"
import { getDish } from "../../services/dish.service"
import { getDrink } from "../../services/drink.service"
import { getMenu } from "../../services/menu.service"
import { Dish } from "../../types/dish.type"
import { Drink } from "../../types/drink.type"
import { Menu } from "../../types/menu.type"
import { OrderItemTypeString } from "../../types/order.type"

type CartItemsInformations = (Menu | Dish | Drink | undefined) & {
  quantity: number
  price: number
  type: OrderItemTypeString
}

const CartPage = () => {
  const { cartItems, total } = useCart()
  const { getMenuChoices } = useMenu()
  const { getDrinkSize } = useDrink()

  const [itemsInformations, setItemsInformations] = useState<
    CartItemsInformations[]
  >([])

  useEffect(() => {
    const getItemsInformations = async () => {
      setItemsInformations([])

      const itemsInformations: CartItemsInformations[] = await Promise.all(
        cartItems.map(async (item) => {
          let response

          // For menus
          if (item.type === "MENU") {
            // Get menu
            response = await getMenu(item.menu)
            // Get choices
            const { dish, aside, drink } = getMenuChoices(
              response,
              item.choicesId,
            )
            // Get drink size
            const drinkSize = drink
              ? getDrinkSize(drink?.drink, drink.size)
              : { name: "" }

            // Set description
            response.description = `${dish?.dish.name} + ${aside?.aside.name} + ${drink?.drink.name} (${drinkSize.name})`
          } else if (item.type === "DISH") {
            // For dishes
            response = await getDish(item.dish)
          } else if (item.type === "DRINK") {
            // For Drinks
            response = await getDrink(item.drink)
            const drinkSize = getDrinkSize(response, item.sizeId)
            response.name = `${response.name} (${drinkSize.name})`
          }

          return {
            ...response,
            quantity: item.quantity,
            price: item.totalPrice,
            type: item.type,
          } as CartItemsInformations
        }),
      )
      setItemsInformations(itemsInformations)
    }
    getItemsInformations()
  }, [])

  const EmptyCart = () => (
    <div className="h-full w-full flex flex-col gap-2 items-center justify-center">
      <ShoppingCartIcon className="w-16 h-16 fill-black" />
      <h1 className="text-2xl font-medium">
        Vous n&apos;avez rien dans votre panier !
      </h1>
      <Link
        href="/"
        className="bg-gray-900 active:bg-black text-white px-2 py-2 rounded mt-4"
      >
        Voir les menus
      </Link>
    </div>
  )

  return (
    <div className="absolute top-16 left-0 right-0 bottom-0 flex flex-col w-full h-[calc(100%-64px)] bg-gray-50">
      {itemsInformations.length > 0 ? (
        <div className="p-4">
          <h1 className="text-2xl font-medium my-4">Panier</h1>{" "}
          <div className="flex flex-col gap-4">
            {itemsInformations.map((item) => {
              if (!item) return ""
              return (
                <div
                  key={item._id}
                  className="flex flex-row w-full h-32 justify-between pl-4 pr-6 py-4 rounded-lg shadow bg-white"
                >
                  <div className="flex flex-row gap-4">
                    {item.image && (
                      <div className="relative w-36">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className={
                            "h-screen w-fit rounded-md " +
                            (item.type === "DRINK"
                              ? "object-contain"
                              : "object-cover")
                          }
                          sizes="100%"
                        />
                      </div>
                    )}
                    <div className="flex flex-col justify-center gap-2">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm">{item.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-end gap-2">
                    <p>{item.price} €</p>
                    <p className="text-sm whitespace-nowrap">
                      Quantité : {item.quantity}
                    </p>
                  </div>
                </div>
              )
            })}
            <div className="mt-2 flex flex-col items-end gap-2">
              <p className="font-medium">Total : {total} €</p>
              <button className="bg-gray-900 active:bg-black text-white px-4 py-2 rounded">
                Valider le panier
              </button>
            </div>
          </div>
        </div>
      ) : (
        <EmptyCart />
      )}
    </div>
  )
}

export default CartPage
