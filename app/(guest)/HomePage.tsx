"use client"

import { useEffect, useState } from "react"
import Card, { CardType } from "components/ui/Card"
import MenuSlideOver from "components/pages/Menus/MenuSlideOver"
import useModal from "hooks/useModal"
import { Menu } from "types/menu.type"

type HomeProps = {
  menus: Menu[]
}

const Home = ({ menus }: HomeProps) => {
  const { isShowing, toggle } = useModal()

  const [cards, setCards] = useState<CardType[]>([])

  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null)

  useEffect(() => {
    setCards(
      menus.map((menu) => ({
        id: menu._id,
        title: menu.name,
        description: menu.description || "pas de description",
        price: menu.price,
        image: menu.image,
      })),
    )
  }, [])

  const handleSlideOverOpening = (id: string) => {
    const menu = menus.find((menu) => menu._id === id)
    if (menu) {
      setSelectedMenu(menu)
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
              onButtonClick={handleSlideOverOpening}
            />
          )
        })}
      </div>
      <MenuSlideOver
        toggle={toggle}
        isShowing={isShowing}
        menu={selectedMenu}
      />
    </>
  )
}

export default Home
