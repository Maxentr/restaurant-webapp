import { ShoppingCartIcon } from "@heroicons/react/20/solid"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import { Drink } from "types/drink.type"
import SlideOver from "components/ui/SlideOver"
import Radio from "components/ui/Radio"
import { useCart } from "hooks/contexts/useCart"

export type DrinkSlideOverProps = {
  toggle: () => void
  isShowing: boolean
  drink: Drink | null
}

const DrinkSlideOver = ({ toggle, isShowing, drink }: DrinkSlideOverProps) => {
  const { addToCart } = useCart()

  const [selectedSize, setSelectedSize] = useState("")
  const [totalCost, setTotalCost] = useState(0)

  // Default values
  useEffect(() => {
    setSelectedSize(drink?.sizes[0]._id || "")
  }, [isShowing, drink?.sizes])

  useEffect(() => {
    const price =
      drink?.sizes.filter((size) => size._id === selectedSize)[0]?.price || 0
    setTotalCost(price)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSize])

  const addDrinkToCart = () => {
    if (!selectedSize) return
    if (drink) {
      addToCart({
        drink: drink._id,
        type: "DRINK",
        totalPrice: totalCost,
        quantity: 1,
        sizeId: selectedSize,
      })
      toggle()
    }
  }

  const SlideOverFooter = (
    <div className="flex flex-row justify-between items-center">
      <p className="font-medium">Prix : {totalCost.toFixed(2) + " €"}</p>
      <button
        onClick={addDrinkToCart}
        className="bg-gray-900 active:bg-black text-white px-4 py-2 rounded-md flex items-center justify-center gap-2"
      >
        <ShoppingCartIcon className="fill-white w-4 h-4" />
        <p>Commander</p>
      </button>
    </div>
  )

  return (
    <SlideOver
      title={drink?.name || ""}
      toggle={toggle}
      isShowing={isShowing}
      footer={SlideOverFooter}
    >
      <div className="flex flex-grow flex-col gap-4">
        <div className="relative w-full h-48 rounded-md overflow-hidden">
          <Image
            src={drink?.image || ""}
            alt={drink?.name || ""}
            fill
            className="object-contain"
            sizes="100%"
          />
        </div>
        <p>{drink?.description}</p>
        <div className="flex flex-col gap-2">
          <p className="font-medium underline">Choix possible :</p>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <p className="font-medium">Boissons :</p>
              {drink?.sizes.map((size) => (
                <div
                  key={JSON.stringify(size)}
                  className="flex flex-col gap-2 w-full"
                >
                  <Radio
                    onSelected={(ids) => setSelectedSize(ids[0])}
                    returnValueOnSelected={[size._id]}
                    selected={selectedSize === size._id}
                    name={"drink"}
                    id={size._id}
                    label={`${drink.name} (${size.name})`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SlideOver>
  )
}

export default DrinkSlideOver
