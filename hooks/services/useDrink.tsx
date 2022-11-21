import { useEffect, useState } from "react"
import { Drink, DrinkStockSize } from "../../types/drink.type"
import { getDrink } from "../../services/drink.service"

const useDrink = (drinkId?: string, sizeId?: string) => {
  const [drink, setDrink] = useState<Drink>()
  const [size, setSize] = useState<DrinkStockSize>()

  useEffect(() => {
    const getAndSetDrink = async (drinkId: string) => {
      const data = await getDrink(drinkId)
      setDrink(data)
    }
    if (drinkId) getAndSetDrink(drinkId)
  }, [drinkId])

  const getDrinkSize = (drink: Drink, sizeId: string) => {
    const result = drink.sizes.filter((size) => size._id === sizeId)
    return result[0]
  }

  useEffect(() => {
    if (drink && sizeId) {
      setSize(getDrinkSize(drink, sizeId))
    }
  }, [drink, sizeId])

  return { drink, size, getDrinkSize }
}

export default useDrink
