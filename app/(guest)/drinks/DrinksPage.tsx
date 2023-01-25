"use client"

import { useEffect, useState } from "react"
import DrinkSlideOver from "components/pages/Drinks/DrinkSlideOver"
import Card, { CardType } from "components/ui/Card"
import useModal from "hooks/useModal"
import { Drink } from "types/drink.type"

type DrinksProps = {
  drinks: Drink[]
}

const DrinksPage = ({ drinks }: DrinksProps) => {
  const [cards, setCards] = useState<CardType[]>([])

  const [selectedDrink, setSelectedDrink] = useState<Drink | null>(null)

  useEffect(() => {
    setCards(
      drinks.map((drink) => ({
        id: drink._id,
        title: drink.name,
        description: drink.description || "pas de description",
        image: drink.image,
      })),
    )
  }, [])

  const { isShowing, toggle } = useModal()

  const handleSlideOverOpening = (id: string) => {
    const drink = drinks.find((drink) => drink._id === id)
    if (drink) {
      setSelectedDrink(drink)
      toggle()
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
              buttonLabel="Voir les options"
              imageOptions={{
                contain: true,
              }}
              onButtonClick={handleSlideOverOpening}
            />
          )
        })}
      </div>
      <DrinkSlideOver
        isShowing={isShowing}
        toggle={toggle}
        drink={selectedDrink}
      />
    </>
  )
}

export default DrinksPage
