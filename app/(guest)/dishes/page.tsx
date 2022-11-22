import { getDishes } from "../../../services/dish.service"
import DishesPage from "./DishesPage"

const Page = async () => {
  const dishes = await getDishes()

  return <DishesPage dishes={dishes} />
}

export default Page
