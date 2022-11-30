import { getDishes } from "services/dish.service"
import { getIngredients } from "services/ingredient.service"
import DishesManagement from "./Dishes"

const Page = async () => {
  const response = await getDishes()
  const ingredients = await getIngredients()
  if ("data" in response && "data" in ingredients)
    return (
      <DishesManagement
        dishesResponse={response.data}
        ingredients={ingredients.data}
      />
    )
}

export default Page
