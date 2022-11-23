import { getIngredients } from "../../../services/ingredient.service"
import IngredientsManagement from "./Ingredients"

const Page = async () => {
  const response = await getIngredients()
  if ("data" in response)
    return <IngredientsManagement ingredients={response.data} />
}

export default Page
