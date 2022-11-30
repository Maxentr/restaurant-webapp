import { getDish, getDishes } from "services/dish.service"
import { getIngredients } from "services/ingredient.service"
import ManageDish from "./EditDish"

const Page = async ({ params }: any) => {
  const { id } = params

  const dish = await getDish(id)
  const ingredients = await getIngredients()
  if ("data" in dish && "data" in ingredients)
    return <ManageDish dish={dish.data} ingredients={ingredients.data} />
}

export async function generateStaticParams() {
  const dishes = await getDishes()

  if ("data" in dishes)
    return dishes.data.map((dish) => ({
      id: dish._id,
    }))
}

export default Page
