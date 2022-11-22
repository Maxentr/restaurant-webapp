import { Drink } from "../../types/drink.type"

const useDrink = () => {
  const getDrinkSize = (drink: Drink, sizeId: string) => {
    const result = drink.sizes.filter((size) => size._id === sizeId)
    return result[0]
  }

  return { getDrinkSize }
}

export default useDrink
