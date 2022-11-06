import { getDrinks } from "../../../services/drink.service"
import Drinks from "./DrinksPage"

const DrinksPage = async () => {
  const drinks = await getDrinks()

  return <Drinks drinks={drinks} />
}

export default DrinksPage
