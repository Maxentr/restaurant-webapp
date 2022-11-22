import { ObjectId } from "../../types/common.type"
import { Menu } from "../../types/menu.type"

const useMenu = () => {
  const getMenuChoices = (menu: Menu, choicesId: ObjectId[]) => {
    const dish = menu.dishes.find((dish) => choicesId.includes(dish.dish._id))
    const aside = menu.asides.find((aside) =>
      choicesId.includes(aside.aside._id),
    )
    const drink = menu.drinks.find((drink) =>
      choicesId.includes(drink.drink._id),
    )

    return { dish, aside, drink }
  }

  return { getMenuChoices }
}

export default useMenu
