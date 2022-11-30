"use client"

import React, { useEffect, useState } from "react"
import Card, { CardType } from "components/ui/Card"
import { useCart } from "hooks/contexts/useCart"
import { useToast } from "hooks/contexts/useToast"
import { Dish } from "types/dish.type"

type DishesProps = {
  dishes: Dish[]
}

const DishesPage = ({ dishes }: DishesProps) => {
  const { addToCart } = useCart()
  const { addToast } = useToast()
  const [cards, setCards] = useState<CardType[]>([])

  useEffect(() => {
    setCards(
      dishes.map((dish) => ({
        id: dish._id,
        title: dish.name,
        description: dish.description || "pas de description",
        image: dish.image,
      })),
    )
  }, [])

  const handleCardClick = (id: string) => {
    const dish = dishes.find((dish) => dish._id === id)

    if (dish) {
      addToCart({
        dish: dish._id,
        type: "DISH",
        totalPrice: dish.price,
        quantity: 1,
      })
      addToast({
        title: "Plat ajouté au panier",
        message: "Le plat a bien été ajouté au panier",
        type: "success",
      })
    }
  }

  return (
    <>
      <div className="flex flex-row flex-wrap justify-center gap-x-6 gap-y-8">
        {cards.map((card, index) => {
          return (
            <Card
              key={index + JSON.stringify(card)}
              {...card}
              buttonLabel="Commander"
              onButtonClick={handleCardClick}
            />
          )
        })}
      </div>
    </>
  )
}

export default DishesPage
