import { ShoppingCartIcon } from "@heroicons/react/20/solid"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import useDrink from "../../../hooks/services/useDrink"
import { Menu } from "../../../types/menu.type"
import SlideOver from "../../ui/SlideOver"
import Radio from "../../ui/Radio"
import { useCart } from "../../../hooks/contexts/useCart"
import { useToast } from "../../../hooks/contexts/useToast"

export type MenuSlideOverProps = {
  toggle: () => void
  isShowing: boolean
  menu: Menu | null
}

const MenuSlideOver = ({ toggle, isShowing, menu }: MenuSlideOverProps) => {
  const { addToCart } = useCart()
  const { addToast } = useToast()
  const { getDrinkSize } = useDrink()

  const [selectedDish, setSelectedDish] = useState<string>("")
  const [selectedAside, setSelectedAside] = useState<string>("")
  const [selectedDrink, setSelectedDrink] = useState<string>("")

  const [totalCost, setTotalCost] = useState(0)

  // Default values
  useEffect(() => {
    setSelectedAside(menu?.asides[0].aside._id || "")
    setSelectedDish(menu?.dishes[0].dish._id || "")
    setSelectedDrink(menu?.drinks[0].drink._id || "")
  }, [isShowing, menu?.asides, menu?.dishes, menu?.drinks])
  
  useEffect(() => {
    const dishExtraCost =
      menu?.dishes.filter(({ dish }) => dish._id === selectedDish)[0]
        ?.extraCost || 0
    const asideExtraCost =
      menu?.asides.filter(({ aside }) => aside._id === selectedAside)[0]
        ?.extraCost || 0
    const drinkExtraCost =
      menu?.drinks.filter(({ drink }) => drink._id === selectedDrink)[0]
        ?.extraCost || 0

    const totalCost = Number(
      (menu?.price || 0) +
        +(dishExtraCost + asideExtraCost + drinkExtraCost).toFixed(2),
    )
    setTotalCost(totalCost)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDish, selectedAside, selectedDrink])


  const addMenuToCart = () => {
    if (!selectedAside || !selectedDish || !selectedDrink) return
    if (menu) {
      addToCart({
        id: menu._id,
        type: "menu",
        totalPrice: totalCost,
        elementsId: [selectedDish, selectedAside, selectedDrink],
      })
      addToast({
        title: "Menu ajouté au panier",
        message: "Le menu a bien été ajouté au panier",
        type: "success",
      })
      toggle()
    }
  }

  return (
    <SlideOver title={menu?.name || ""} toggle={toggle} isShowing={isShowing}>
      <div className="flex flex-grow flex-col gap-4">
        <div className="relative w-full h-48 rounded-md overflow-hidden">
          <Image
            src={menu?.image || ""}
            alt={menu?.name}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <p>{menu?.description}</p>
        <div className="flex flex-col gap-2">
          <p className="font-medium underline">Choix possible :</p>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <p className="font-medium">Plats :</p>
              {menu?.dishes.map(({ dish, extraCost }, index) => (
                <div
                  key={JSON.stringify(dish)}
                  className="flex flex-col gap-2 w-full"
                >
                  <Radio
                    onSelected={(ids) => setSelectedDish(ids[0])}
                    returnValueOnSelected={[dish._id]}
                    selected={index === 0}
                    name={"dish"}
                    id={dish._id}
                    label={dish.name + (extraCost ? ` (+${extraCost} €)` : "")}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <p className="font-medium">Accompagnements :</p>
              {menu?.asides.map(({ aside, extraCost }, index) => (
                <div
                  key={JSON.stringify(aside)}
                  className="flex flex-col gap-2 w-full"
                >
                  <Radio
                    onSelected={(ids) => setSelectedAside(ids[0])}
                    returnValueOnSelected={[aside._id]}
                    selected={index === 0}
                    name={"aside"}
                    id={aside._id}
                    label={aside.name + (extraCost ? ` (+${extraCost} €)` : "")}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <p className="font-medium">Boissons :</p>
              {menu?.drinks.map(({ drink, size, extraCost }, index) => (
                <div
                  key={JSON.stringify(drink)}
                  className="flex flex-col gap-2 w-full"
                >
                  <Radio
                    onSelected={(ids) => setSelectedDrink(ids[0])}
                    returnValueOnSelected={[drink._id]}
                    selected={index === 0}
                    name={"drink"}
                    id={drink._id}
                    label={
                      drink.name +
                      " " +
                      (drink.size ? getDrinkSize(drink, size).name : "") +
                      (extraCost ? ` (+${extraCost} €)` : "")
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between items-center">
        <p className="font-medium">Prix : {totalCost.toFixed(2) + " €"}</p>
        <button
          onClick={addMenuToCart}
          className="bg-gray-900 active:bg-black text-white px-4 py-2 rounded-md flex items-center justify-center gap-2"
        >
          <ShoppingCartIcon className="fill-white w-4 h-4" />
          <p>Commander</p>
        </button>
      </div>
    </SlideOver>
  )
}

export default MenuSlideOver
