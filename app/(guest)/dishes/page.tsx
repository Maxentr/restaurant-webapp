import { getDishes } from "services/dish.service"
import DishesPage from "./DishesPage"

const Page = async () => {
  const response = await getDishes()
  if ("data" in response) return <DishesPage dishes={response.data} />
}

export default Page
