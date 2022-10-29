import type { NextPage } from "next"
import { useEffect, useState } from "react"
import Card, { CardType } from "../components/ui/Card"
import useModal from "../hooks/useModal"
import { getDrinks } from "../services/drink.service"
import { Drink } from "../types/drink.type"
import GuestTemplate from "../layouts/GuestLayout"
import DrinkSlideOver from "../components/pages/Drinks/DrinkSlideOver"

const Home: NextPage = () => {
  const [drinks, setDrinks] = useState<Drink[]>([])
  const [cards, setCards] = useState<CardType[]>([])

  const [selectedDrink, setSelectedDrink] = useState<Drink | null>(null)

  useEffect(() => {
    const getAndSetDrinks = async () => {
      const drinks = await getDrinks()
      console.log(drinks)
      setDrinks(drinks)
      setCards(
        drinks.map((drink) => ({
          id: drink._id,
          title: drink.name,
          description: drink.description || "pas de description",
          image: drink.image,
        })),
      )
    }
    getAndSetDrinks()
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
    <GuestTemplate>
      <div className="flex flex-row flex-wrap justify-center gap-x-6 gap-y-8">
        {cards.map((card, index) => {
          return (
            <Card
              key={index + JSON.stringify(card)}
              {...card}
              buttonLabel="Commander"
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
    </GuestTemplate>
  )
}

export default Home
