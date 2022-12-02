import { getMenus } from "services/menu.service"
import { getDishes } from "services/dish.service"
import { getDrinks } from "services/drink.service"
import MenusManagement from "./Menus"

const Page = async () => {
  const menus = await getMenus()
  const dishes = await getDishes()
  const drinks = await getDrinks()

  if ("data" in menus && "data" in dishes && "data" in drinks)
    return (
      <MenusManagement
        menus={menus.data}
        dishes={dishes.data}
        drinks={drinks.data}
      />
    )
}

export default Page
