import { getMenus } from "services/menu.service"
import HomePage from "./HomePage"

const Page = async () => {
  const response = await getMenus()
  if ("data" in response) return <HomePage menus={response.data} />
}

export default Page
