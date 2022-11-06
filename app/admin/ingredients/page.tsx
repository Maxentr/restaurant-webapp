import IngredientsManagement from "./Ingredients"

async function getIngredients() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/ingredients`)
  const ingredients = await res.json()
  return ingredients
}

const Page = async () => {
  const ingredients = await getIngredients()

  return <IngredientsManagement ingredients={ingredients} />
}

export default Page
