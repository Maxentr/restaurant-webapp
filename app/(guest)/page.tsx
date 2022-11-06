import { getMenus } from "../../services/menu.service"
import HomePage from "./HomePage"

const Page = async () => {
  const menus = await getMenus()

  return <HomePage menus={menus} />
}

export default Page
