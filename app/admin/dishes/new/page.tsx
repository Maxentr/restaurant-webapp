import { getIngredients } from "services/ingredient.service"
import NewDish from "./NewDish"

const Page = async () => {
  const ingredients = await getIngredients()
  if ("data" in ingredients) return <NewDish ingredients={ingredients.data} />
}

export default Page
