import { getDish, getDishes } from "services/dish.service"
import { getIngredients } from "services/ingredient.service"
import EditDish from "./EditDish"

type Props = {
  params: { id: string }
}

const Page = async ({ params }: Props) => {
  const { id } = params

  const dish = await getDish(id)
  const ingredients = await getIngredients()
  if ("data" in dish && "data" in ingredients)
    return <EditDish dish={dish.data} ingredients={ingredients.data} />
}

export async function generateStaticParams() {
  const dishes = await getDishes()

  if ("data" in dishes)
    return dishes.data.map((dish) => ({
      id: dish._id,
    }))
}

export default Page
