import { getDishes } from "services/dish.service"
import { getDrinks } from "services/drink.service"
import { getMenu, getMenus } from "services/menu.service"
import EditMenu from "./EditMenu"

type Props = {
  params: { id: string }
}

const Page = async ({ params }: Props) => {
  const { id } = params

  const menu = await getMenu(id)
  const dishes = await getDishes()
  const drinks = await getDrinks()

  if ("data" in menu && "data" in dishes && "data" in drinks)
    return (
      <EditMenu menu={menu.data} dishes={dishes.data} drinks={drinks.data} />
    )
}

export async function generateStaticParams() {
  const menus = await getMenus()

  if ("data" in menus)
    return menus.data.map((menu) => ({
      id: menu._id,
    }))
}

export default Page
