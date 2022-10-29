import type { NextPage } from "next"
import { useEffect, useState } from "react"
import Card, { CardType } from "../components/ui/Card"
import MenuSlideOver from "../components/pages/Menus/MenuSlideOver"
import useModal from "../hooks/useModal"
import { getMenus } from "../services/menu.service"
import { Menu } from "../types/menu.type"
import GuestTemplate from "../layouts/GuestLayout"

const Home: NextPage = () => {
  const [menus, setMenus] = useState<Menu[]>([])
  const [cards, setCards] = useState<CardType[]>([])

  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null)

  useEffect(() => {
    const getAndSetMenus = async () => {
      const menus = await getMenus()
      console.log(menus)
      setMenus(menus)
      setCards(
        menus.map((menu) => ({
          id: menu._id,
          title: menu.name,
          description: menu.description || "pas de description",
          price: menu.price,
          image: menu.image,
        })),
      )
    }
    getAndSetMenus()
  }, [])

  const { isShowing, toggle } = useModal()

  const handleSlideOverOpening = (id: string) => {
    const menu = menus.find((menu) => menu._id === id)
    if (menu) {
      setSelectedMenu(menu)
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
      <MenuSlideOver
        toggle={toggle}
        isShowing={isShowing}
        menu={selectedMenu}
      />
    </GuestTemplate>
  )
}

export default Home
