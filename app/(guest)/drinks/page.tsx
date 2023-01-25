import { getDrinks } from "services/drink.service"
import Drinks from "./DrinksPage"

const DrinksPage = async () => {
  const response = await getDrinks()
  if ("data" in response) return <Drinks drinks={response.data} />
}

export default DrinksPage
